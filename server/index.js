require('dotenv').config({ path: `${__dirname}/.env` });
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const path = require("path")
const http = require("http");
const app = express();
const { BetaAnalyticsDataClient } = require("@google-analytics/data")
const { MongoClient, ServerApiVersion } = require('mongodb');
const WebSocket = require('ws');

const authCookieName = 'lincms_token';
const propertyId = '511603332';

async function DB_command(fn) {
  // Init Mongo DB
  const mongodbURI = `mongodb+srv://lincolngarciadevelopment_db_user:${process.env.MONGO_DB_PASS}@cluster0.lrunut2.mongodb.net/?appName=Cluster0`;
  const client = new MongoClient(mongodbURI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  })

  let result;
  try {
    const connection = await client.connect()
    result = await fn(connection)
  } catch (err) {
    console.log(err)
    result = { "status": "failure" }
  } finally {
    await client.close()
    return result
  }
}

// The service port. In production the front-end code is statically hosted by the service on ort.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static(path.join(__dirname, '../dist')));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Middleware to verify that the user is authorized to call an endpoint
async function verifyAuth(req, res, next) {
  const user = await findUser('lincms_token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.redirect(301, "/login")
  }
};

// CreateAuth a new user
apiRouter.post('/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.lincms_token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.lincms_token = uuid.v4();
      setAuthCookie(res, user.lincms_token);
      DB_command(async (client) => {
        await client.db("startup").collection("users").replaceOne({ email: user.email }, user, { upsert: true })
      })
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.lincms_token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Install the analytics query
apiRouter.get("/analytics", verifyAuth, async (req, res) => {
  if (!req.query) res.status(200)
  if (!req.query.type) res.status(200);
  let report;

  switch (req.query.type) {
    case "UNQ":
      report = await runUNQReport();
      res.status(200).json(report);
      break;
    case "CITIES":
      report = await runCitiesReport();
      res.status(200).json(report)
      break;
  }

  async function runUNQReport() {
    const credentials = {
      "private_key": process.env.GA4_PRIVATE_KEY,
      "client_email": process.env.GA4_CLIENT_EMAIL
    }

    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials,
    });
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: "date"
        }
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });

    if (!response.rows) return { "error": "No data found" };
    response.rows.forEach(row => {
      if (!row.dimensionValues) return { "error": "No data found" };
      if (!row.metricValues) return { "error": "No data found" };
      console.log(row.dimensionValues[0], row.metricValues[0]);
    });

    return response;
  }

  async function runCitiesReport() {
    const credentials = {
      "private_key": process.env.GA4_PRIVATE_KEY,
      "client_email": process.env.GA4_CLIENT_EMAIL
    }

    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials,
    });
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: "city"
        }
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });

    if (!response.rows) return { "error": "No data found" };
    response.rows.forEach(row => {
      if (!row.dimensionValues) return { "error": "No data found" };
      if (!row.metricValues) return { "error": "No data found" };
      console.log(row.dimensionValues[0], row.metricValues[0]);
    });

    return response;
  }
})

// Install the DB
apiRouter.get("/pages", async (req, res) => {
  if (!req.query || !req.query.location) return res.json({ "error": "no location query" });
  let result;
  if (req.query.location == "_lincms_all") {
    result = await DB_command(async (client) => {
      const allPages = await client.db("startup").collection("pages").find().project({ path: 1, title: 1 }).toArray()
      return allPages
    })
  } else {
    result = await DB_command(async (client) => {
      const page = await client.db("startup").collection("pages").findOne({ "path": encodeURIComponent(req.query.location) })
      return page
    })
  }
  if (result !== null) return res.json(result);
  else return res.json({ "error": "page not found" })
})

apiRouter.post("/pages", async (req, res) => {
  if (!req.body) res.status(401).end()
  const page = req.body.title
  if (!page) res.status(401).end()

  const result = await DB_command(async (client) => {
    const newPage = { ...req.body }
    delete newPage._id
    return await client.db("startup").collection("pages").replaceOne({ path: newPage.path }, newPage, { upsert: true })
  })
  console.log("DB Result:", result)
  if (!result.modifiedCount && !result.upsertedCount) res.status(404).end()

  res.status(200).end()
})

apiRouter.delete("/pages", async (req, res) => {
  if (!req.query || !req.query.location) return res.status(401).json({ "error": "no location query" });
  const page = req.query.location
  if (!page) res.status(401).end()

  const result = await DB_command(async (client) => {
    console.log("Deleting page:", encodeURIComponent(page))
    return await client.db("startup").collection("pages").deleteOne({ path: encodeURIComponent(page) })
  })
  console.log("DB Result:", result)
  if (!result.deletedCount) res.status(404).end()

  res.status(200).end()
})

// Set /admin/preview as a free page
app.get('/admin/preview', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})

// Install the middleware
app.get('/admin*', verifyAuth, (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get("/login", async (req, res, next) => {
  const user = await findUser('lincms_token', req.cookies[authCookieName]);
  if (user) res.redirect("/admin/dashboard")
  else next();
})

// Serve the default path
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Helpers
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    lincms_token: uuid.v4(),
  };

  await DB_command(async (client) => {
    await client.db("startup").collection("users").insertOne(user)
  })

  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  const result = await DB_command(async (client) => {
    return await client.db("startup").collection("users").findOne({ [field]: value })
  })
  return result
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: false, //process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: "lax", //process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  });
}

function setDeep(obj, path, prop, value) {
  console.log("Setting deep", path, "to", value, "on", obj);
  let node = obj;
  for (const idx of path) {
    if (!node.children || !node.children[idx]) {
      console.warn("Invalid path while updating pagedata", path);
      return;
    }
    node = node.children[idx];
  }

  if (node.props) {
    node.props = node.props || {};
    node.props[prop] = value;
  } else if (node.content || node.content === "") {
    node.content = value
  } else {
    node[prop] = value
  }
  return obj;
}

const server = http.createServer(app);
const wss = new WebSocket.Server({ server }); // IMPORTANT
const activePages = {};
const bouncedRequests = {};

wss.on("connection", async (ws, request) => {
  switch (request.url) {
    case "/live-page-connection":
      ws.path = null;
      console.log("WS connection established:", request.url);

      ws.on("message", (messageStr) => {
        const message = JSON.parse(messageStr.toString());
        switch (message.type) {
          case "page-update":
            // Update the in-memory page data
            activePages[ws.path] = setDeep(activePages[ws.path], message.path, message.prop, message.value);
            console.log(activePages[ws.path])

            // Broadcast to all connections viewing the same page
            wss.clients.forEach(client => {
              if (client !== ws && client.readyState === WebSocket.OPEN && client.path === ws.path) {
                console.log(message)
                client.send(messageStr.toString());
              }
            });

            // Debounce the database update to avoid excessive writes
            function createUpdateHandler() {
              // `activeRequest` will hold the ongoing fetch Promise (or null when idle)
              let activeRequest = null;
              // `nextData` holds the latest queued payload to send after the active request
              let nextData = null;
              // `nextScheduled` indicates whether there is a queued request pending
              let nextScheduled = false;

              async function sendRequest(data) {
                if (!ws.path) {
                  console.warn('sendRequest called but ws.path is not set');
                  return;
                }

                // Prefer the explicit `data` param (queued payload). Fall back to current in-memory page.
                const payload = data || activePages[ws.path];

                try {
                  activeRequest = fetch(`${request.headers.origin}/api/pages?location=${encodeURIComponent(ws.path)}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                  });

                  await activeRequest;
                } catch (err) {
                  console.error('Failed to save page update', err);
                } finally {
                  // Mark no active request
                  activeRequest = null;

                  // If a next request was queued while this one ran, send it now
                  if (nextScheduled) {
                    const dataToSend = nextData;
                    nextData = null;
                    nextScheduled = false;
                    // Fire-and-forget the next request; it will manage further queued requests itself
                    sendRequest(dataToSend);
                  }
                }
              }

              return function onInputChange(data) {
                // No active request — send immediately
                if (!activeRequest) {
                  sendRequest(data);
                  return;
                }

                // Active request but nothing queued yet — queue this payload
                if (!nextScheduled) {
                  nextData = data;
                  nextScheduled = true;
                  return;
                }

                // Active request and a queued request already exist — replace queued payload with newest
                nextData = data;
              };
            }

            bouncedRequests[ws.path] = bouncedRequests[ws.path] || createUpdateHandler();
            bouncedRequests[ws.path](activePages[ws.path]);

            break;

          case "page-change":
            ws.path = message.path;
            fetch(`${request.headers.origin}/api/pages?location=${encodeURIComponent(ws.path)}`)
              .then(data => data.json())
              .then(data => {
                ws.send(JSON.stringify({ type: "page-change", path: message.path, value: data }));
                activePages[ws.path] = data;
              })
            break;
        }
      });

      break;
    default:
      ws.close();
      return;
  }
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});