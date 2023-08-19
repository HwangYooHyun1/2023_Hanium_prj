import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScaaningItem from './ScanningItem';
import WebScanning from './WebScanning';


export const ScanningList = () => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "http://210.110.39.163:5000/vulnerabilties"
                )
                console.log("API response:", response.data);
                setResult(response.data.info.scanningResponseData);
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
        <div>
            {result.map((result) => (
                <WebScanning result={result} />
            ))}
        </div>
    )
}
