import React, { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

const ChartComponents = ({chartData}) => {

    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if(!chartRef.current) return;

        if(chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");
        chartInstanceRef.current = new Chart(ctx, {
            type: "line",
            data: {
                // labels: Array(chartData.length).fill(''), 
                labels: chartData.map((_, index) => `Day ${index+1}`),
                datasets: [
                    {
                        label: 'Price (USD)',
                        data: chartData,
                        borderColor: "blue",
                        borderWidth: 2,
                        tension: 0.3,
                        pointRadius: 0,
                        // lineTension: 0.3,
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { 
                    x: { 
                        // title: { 
                        //     display: false, 
                            
                        // },
                        display: false,
                    }, 
                    y:{
                        // title: { 
                        //     display: false,
                             
                        // }, 
                        // ticks: {
                        //     callback: (value)=> `$${value.toFixed(2)}`,
                        // },
                        display: false,
                    }, 
                },
                plugins: { 
                    legend: { 
                        display: false 
                    }, 
                    tooltip: { 
                        enabled: false
                    },
                },
            },
        });
        return () => {
            chartInstanceRef.current?.destroy();
        };
    },[chartData]);

  return <canvas ref={chartRef} style={{ width: '100%', height: '100px' }}/>;
};

export default ChartComponents
