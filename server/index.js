const PageDB = require("./database/pages.ts")
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const path = require("path")

const authCookieName = 'lincms_token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('../dist'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Middleware to verify that the user is authorized to call an endpoint
async function verifyAuth(req, res, next) {
  const user = await findUser('lincms_token', req.cookies[authCookieName]);
  console.log("user exists")
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

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
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
    delete user.token;
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
      "private_key": secret("ga4_private_key"),
      "client_email": secret("ga4_client_email")
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
      "private_key": secret("ga4_private_key"),
      "client_email": secret("ga4_client_email")
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
apiRouter.get("/pages", (req, res) => {
  if (!req.query || !req.query.location) return res.json({"error": "no location query"});
  if (req.query.location == "_lincms_all") res.json(PageDB)
  else if (PageDB[req.query.location]) return res.json(PageDB[req.query.location])
  else return json({"error": "page not found"})
})

apiRouter.post("/pages", (req, res) => {
  if (!req.body) res.status(401).end()
  const page = req.body.title
  if (!page) res.status(401).end()

  PageDB[req.body.path] = req.body
  res.status(200).end()
})

// Install the middleware
app.get('/admin/*', verifyAuth, (_req, res) => {
  res.json({ "private": "information" })
});


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
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});