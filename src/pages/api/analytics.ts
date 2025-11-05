import type { NextApiRequest, NextApiResponse } from 'next'
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = '511603332';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  //res.status(200).json({ message: 'Hello from Next.js!' })
    const report = await runReport();

    console.log(report);

    res.status(200).json({ message: report});
}

async function runReport() {  
  const credentials = {
  "private_key": process.env.ga4_private_key,
  "client_email": process.env.ga4_client_email,
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

  console.log('Report result:', response);

  if (!response.rows) return {"error": "No data found"};
  response.rows.forEach(row => {
    if (!row.dimensionValues) return {"error": "No data found"};
    if (!row.metricValues) return {"error": "No data found"};
    console.log(row.dimensionValues[0], row.metricValues[0]);
  });
  
  return response;
}