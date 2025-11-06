import type { NextApiRequest, NextApiResponse } from 'next'
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = '511603332';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  console.log(req.query)
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
  const credentials = {
    "private_key": process.env.REACT_APP_GA4_PRIVATE_KEY,
    "client_email": process.env.REACT_APP_GA4_CLIENT_EMAIL,
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
  const credentials = {
    "private_key": process.env.REACT_APP_GA4_PRIVATE_KEY,
    "client_email": process.env.REACT_APP_GA4_CLIENT_EMAIL,
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