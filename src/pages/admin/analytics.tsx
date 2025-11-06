"use client";

import RootLayout from "@/src/app/layout"
import NeumorphicFlat from "@/src/app/components/Backend/Neumorphic/flat"
import NeumorphicPressed from "@/src/app/components/Backend/Neumorphic/pressed"
import BackendMenu from "@/src/app/components/Backend/menu";
import Grid from "@/src/app/components/Backend/Helpers/goldengrid"
import BackendHeader from "@/src/app/components/Backend/header";
import BackendFooter from "@/src/app/components/Backend/footer";
import { Suspense, useEffect, useState } from "react";

import { Chart, LinearScale, CategoryScale, BarController, BarElement, LineController, LineElement, PointElement, Title, Tooltip, Legend, DoughnutController } from 'chart.js';
import { ArcElement } from "chart.js/auto";

// Register the necessary components, including LinearScale
Chart.register(
    LinearScale,
    CategoryScale, // If you're also using category scales
    BarController, // If you're using bar charts
    BarElement,    // If you're using bar charts
    LineController, // If you're using line charts
    LineElement,    // If you're using line charts
    PointElement,   // If you're using line charts
    Title,          // If you use titles
    Tooltip,        // If you use tooltips
    Legend,          // If you use legends
    DoughnutController,
    ArcElement
)

Chart.defaults.color = "#1432FF"


export default function Page() {
    const [analyticsData, setAnalyticsData]: any = useState({});
    const [charts, setCharts]: any = useState({});

    useEffect(() => {
        // Fetch analytics data from the API
        const UNQ_Data = fetch('/api/analytics?UNQ=true')
            .then(data => data.json())
            .then((uncleanData: any) => {
                let labels: any = getLast7Dates();
                let data: any = [0, 0, 0, 0, 0, 0, 0];
                let max: any = 0

                uncleanData.message.rows.map(((element: any, index: number) => {
                    labels[6 - index] = dateParse(element.dimensionValues[0].value)
                    let value = element.metricValues[0].value;
                    data[6 - index] = value;
                    if (value > max) max = value;
                }))

                const UNQ_canvas: any = document.getElementById("UQV_week");
                const UNQ_Chart = new Chart(UNQ_canvas, {
                    type: 'line',
                    data: {
                        labels,
                        datasets: [{
                            label: 'Unique Visitors over the past week',
                            data,
                            borderWidth: 3,
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: Math.ceil(max * 1.25) 
                            }
                        }
                    }
                })
                setCharts({ ...charts, "UNQ_Chart": UNQ_Chart });
            })

        const Cities_Data = fetch('/api/analytics')
            .then(data => data.json())
            .then((uncleanData: any) => {
                const cities_canvas: any = document.getElementById("cities_overall");
                const Cities_Chart = new Chart(cities_canvas, {
                    type: 'doughnut',
                    data: {
                        labels: ["Provo, UT", "Chapell Hill, NC", "Houston, TX"],
                        datasets: [{
                            label: 'Most Popular Cities',
                            data: ["43", "67", "84"],
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                            ],
                            hoverOffset: 4
                        }]
                    }
                })
                setCharts({ ...charts, "Cities_Chart": Cities_Chart });
            })
    }, [])


    return (
        <div className="bg-adminGray h-screen flex flex-col">
            <BackendHeader title="Analytics Dashboard" />
            <main className="grow h-full">
                <Grid className="h-full">
                    <BackendMenu className="col-start-1 col-end-3" active="Analytics" />
                    <NeumorphicFlat className="px-4 mx-4 col-start-4 col-end-11 overflow-scroll">
                        <Suspense fallback={<div>loading data...</div>}>
                            <div className="h-0 scroll" >
                                <h4 className="text-2xl">Unique Visitors in the past week</h4>
                                <canvas height="725" width="725" className="p-8 w-auto" id="UQV_week" />
                                <br />
                                <h4 className="text-2xl">Most popular cities</h4>
                                <canvas height="725" width="725" className="p-8 w-auto" id="cities_overall" />
                            </div>
                        </Suspense>
                    </NeumorphicFlat>
                </Grid>
            </main>
            <BackendFooter />
        </div>
    );
};

Page.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    )
}

function analyticsParser() {
    return null;
}

function dateParse(data: any) {
    const str = `${data}`;
    return `${str.slice(4, 6)}/${str.slice(6, 8)}`
}

const getLast7Dates = () => {
    const today = new Date();
    const dates: string[] = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        dates.push(`${mm}/${dd}`);
    }
    return dates;
}