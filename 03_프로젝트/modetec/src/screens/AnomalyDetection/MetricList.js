import React, { useState, useEffect } from "react";
import axios from 'axios';
import MetricItem from './MetricItem';

const MetricList = () => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "http://52.79.201.187:8080/metricanomaly"
                )
                console.log("API response:", response.data);
                setResult(response.data.info.metricResponseData);
            } catch (e) {
                console.log("Error fetching data:", e);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    console.log("Result:", result);
    console.log("Loading:", loading);

    if (loading) {
        return <div><a>대기중...</a></div>
    }
    if (!result || result.length === 0) {
        return null;
    }

    return (
        <div className='results'>
            {result.map((result) => (
                <MetricItem result={result} />
            ))}
        </div>
    );
}


export default MetricList;