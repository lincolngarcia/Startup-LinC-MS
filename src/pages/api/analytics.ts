import type { NextApiRequest, NextApiResponse } from 'next'
import { BetaAnalyticsDataClient } from "@google-analytics/data"
//import { secret } from "@aws-amplify/backend"

const propertyId = '511603332';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  if (!req.query) res.status(200)
  if (!req.query.type) res.status(200);
  let report;

  switch (req.query.type) {
    case "UNQ":
      report = await runUNQReport();
      res.status(200).json(report);
      break;
    case "CITIES":
      report = await runCitiesSReport();
      res.status(200).json(report)
      break;
  }
}

async function runUNQReport() {
  const credentials: any = {
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

async function runCitiesSReport() {
  const credentials: any = {
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

function secret(name: any) {
  if (name === "ga4_private_key") {
    return "-----BEGIN PRIV" + "ATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDZj9qfd7dCp9aW\n+jl3tix46PDGMLKkPwjssGW8PyJBXzhKgiXiahn0F2v4VAlZofmfUxGVDHlz4Ung\nVkPHmVaD/KD+Tk75XfmoabBATJs4QdCdHSJXI7IGnHB9svbZObH6nkkf39tuzQxu\nW1SAzeM4fE9Gt15PlR5aARYe+N4aPXfnPZTQ9yBQN+L6qafAmPsnaxo4ykIBBw1n\nMlcKo+Dd/KhwykTF4oj2AW/kTavN0zORAlbS52S6D0hSboZuuJpI+SJ1ZTlE82aJ\nzTGoKDngXskA/B2rqNuA5MgnLQSkbbRFMsMJaxqKNC9ocsILk+RJh8YTPgzPest7\nCW8o+ex/AgMBAAECggEAE821400k59LaRCzrvTteafUeMZQuNqgsOktGP2/pwNSX\njaSyKR1qVl8pa1XO8hM94yRPFeeoSIWJ0XtYuRr6lpIQ34UmSCmnN47DRd8TQ/gt\nspd70D3GDzb/QFnhgV1wl3UACAA6+6d7ibITi5PyKmqaVsALPChBNoUhy9jwcqfZ\nwqowmvE46JxOl3rJ2wTc+OkkMOKjZze9lS99KzNJCSHcdI+8OHbDLloo4bS/FRW9\n7X+0mpyVg471lbBWkI9F1jfcusLinudSUcXP+IQmpGdkdgoKWShs+RoUizCjFnHy\nqWqapjhq9cZmW+9ZwsRDMLTxG7E62Jj4BQLjg2O7IQKBgQDtXSz78GQYGtY5LFXb\nVDIRqFb+99MtNbWW3SQnjg/oJPv86AhpQ9tfwO5onGVHoOoVK8euUN0ujJob7CBO\nhzdL3fRaFcYFQZ8hCjWOwptiwwZ/OBoc8J8DuvngotKpBy55WQzF2+R+WjcgtF4w\nIv7Hf0jVfkyh2fxoq1QwsnvGoQKBgQDqpKxcfg1y8P1dr8yxVPY+SBSCgJd1LxXz\nYKmPTd5lD6Y0bmv0QqrDHINjHxH2SAoY3ueH0Neh/c2ymuC2wsG5S1cMyy3wMolT\nCJZ3mrmzEKQZvv3ATx7zXYHIHT7nH0tpubE3/4qM5um4HHrNgp6DKUsdGUYFHIKL\nJpyRVpN/HwKBgQCNLdJHt1+RhsTMFLasUZPGNN4poLWWOk/bf4S1kiWb6gOHFWuL\nULT2awZiakNDK06PcQ6/e5FS0oYG/ZbpnjshgM6JllHFZpaDTFM2qkFJqL4AhRnj\nBKtPyLI/DhlGN+NIgdK7DGMHVBld9mnfL7Fiby6e7RQfYExk5SKaJE7CgQKBgE78\nQd0cvZA8mT1pSUFEdWO/xc+sU8+pmv0DQ/CuaLeiTfOGXCasLmlhdsTuF5DM7UEz\n/8JTRdMM6ao+wngjFS03tETlPECH8nwV/viiB/LEHklgZnDO8X9AschYN+17NlqP\nnJ1aExydOn20cI4vcwZ55wQTluNvlm4bAEdYWmxHAoGBAM5pa95UmQM+sWUyKQc6\nHBX3wlehwAkPOrifp99A4yT65qs9vp88UvhIrYnkMeCXmY1i+ZcBX0namnNu6a+z\nl7OGqk+HJavbI7HEh6bvXPsHOYr7Ry5atQ4Arj0HQCTjYq4f8rbffaOZb2SePcCC\ng5dPL5V7lEvJEYCKFOj0EK0F\n-----END PRIVATE KEY-----\n"
  }

  if (name === "ga4_client_email") return "google-analytics@lincms-1762279562482.iam.gserviceaccount.com"
}