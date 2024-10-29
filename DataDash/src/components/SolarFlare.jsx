import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const SolarFlare = () => {
    const [marsWeather, setMarsWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMarsWeather = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.nasa.gov/insight_weather/?api_key=9XT66j6cBVXViFihlwILSrsofTXsmjOlMsEV0hXm&feedtype=json&ver=1.0`);
                const data = await response.json();
                setMarsWeather(data);
            } catch (error) {
                console.error("Error fetching Mars weather data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMarsWeather();
    }, []);

    if (!marsWeather) return <p className="solar-flare-info">Loading data...</p>;

    const solKeys = marsWeather.sol_keys;
    const temps = solKeys.map(sol => marsWeather[sol].AT?.av || null); 

    const chartData = {
        labels: solKeys.map(sol => `Sol ${sol}`),
        datasets: [
            {
                label: 'Average Temperature (°C)',
                data: temps,
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Mars Average Temperature Over Recent Sols' },
        },
        scales: {
            y: {
                title: { display: true, text: 'Temperature (°C)' },
                beginAtZero: false,
            },
        },
    };

    return (
        <div className='outer'>
            <div className="solar-flare-container">
                <h2>Mars Weather</h2>
                <div className="chart-wrapper">
                    <Line data={chartData} options={options} />
                </div>
                <p className="solar-flare-info">Data provided by NASA</p>
            </div>
        </div>
    );
};

export default SolarFlare;
