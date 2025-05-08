import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { Line } from 'react-chartjs-2';
import { updateAssets } from "../assets/assetsSlice";
import ChartComponents from "./ChartComponents";
import './AssetTable.css';

const AssetTable = () => {
    const assets = useSelector((state)=> state.assets);
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(updateAssets());
        }, 1500);
        return () => clearInterval(interval);
    }, [dispatch]);
    // const renderChart = (chartData) => {
    //     return (
    //         <Line 
    //             data={{
    //                 labels: Array(chartData.length).fill(''),
    //                 datasets: [
    //                     {
    //                         data: chartData,
    //                         borderColor: 'blue',
    //                         borderWidth: 1,
    //                         tension: 0.4,
    //                         pointRadius: 0,
    //                         fill: false,
    //                     },
    //                 ],
    //             }}
    //             options={{
    //                 responsive: true,
    //                 maintainAspectRatio: false,
    //                 scales: {
    //                     x: { display: false },
    //                     y: { display: false },
    //                 },
    //                 plugins: {
    //                     legend: { display: false },
    //                     tooltip: { enabled: false },
    //                 },
    //             }}
    //             height={40}
    //         />
    //     );
    // };
    return (
        <table className="asset-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Change (1h)</th>
              <th>Change (24h)</th>
              <th>Change (7d)</th>
              <th>Market Cap</th>
              <th>Volume (24h)</th>
              <th>Circulating Supply</th>
              <th>Max Supply</th>
              <th>Chart (7d)</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>
                  <img src={asset.logo} alt={`Logo of ${asset.symbol}`} width={20} aria-label={`Logo of ${asset.name}`}/>
                </td>
                <td>{asset.name}</td>
                <td>{asset.symbol}</td>
                <td>${asset.price.toFixed(2)}</td>
                <td className={asset.percentChange1h >= 0 ? 'text-green' : 'text-red'}>
                  {asset.percentChange1h}%
                </td>
                <td className={asset.percentChange24h >= 0 ? 'text-green' : 'text-red'}>
                  {asset.percentChange24h}%
                </td>
                <td className={asset.percentChange7d >= 0 ? 'text-green' : 'text-red'}>
                  {asset.percentChange7d}%
                </td>
                <td>${(asset.marketCap / 1e9).toFixed(2)}B</td>
                <td>${(asset.volume24h / 1e9).toFixed(2)}B</td>
                <td>{asset.circulatingSupply.toLocaleString()}</td>
                <td>{asset.maxSupply ? asset.maxSupply.toLocaleString() : '∞'}</td>
                <td className="chart-cell">
                    <ChartComponents key={asset.id} chartData={asset.chart7d} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    )

};

export default AssetTable