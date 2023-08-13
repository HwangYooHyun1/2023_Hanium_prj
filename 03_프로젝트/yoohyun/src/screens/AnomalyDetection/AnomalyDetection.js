import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styled from "styled-components";
import MetricItem from './MetricItem';
import AccessItem from './AccessItem';
import './Style.css'

const Title = Styled.div`
  display: fixed;
  padding-top: 60px;
  padding-left: 260px;
`;

const TableList = Styled.div`
  background-color: rgb(248, 250, 253);
  height: 50vh; 
  display: flex;
  padding-left: 260px;
  justify-content: center;
  overflow: auto;
`;
const TableHead = Styled.thead`
  th {
    background-color: #ffffff;
    font-size:1.1rem;
    position: sticky;
    z-index: 998;
    top:0;
    padding: 10px;
    padding-left: 50px;
    border-bottom: 1px inset #ccc;
  }
`;
const TableBody = Styled.tbody`
  padding-top: 40px;
  padding-bottom:100px;
  background-color: rgb(248, 250, 253);
`;


const AnomalyDetection = (props) => {
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCombinedData = async () => {
      try {
        const metricResponse = await axios.get('http://52.79.201.187:8080/metricanomaly');
        const accessResponse = await axios.get('http://52.79.201.187:8080/loganomalies');

        const metricData = metricResponse.data.info.metricResponseData.map(item => ({ ...item, type: 'metric' }));
        const accessData = accessResponse.data.info.logResponseData.map(item => ({ ...item, type: 'access' }));

        // 두 데이터를 합치기 위해 concat 사용
        const combinedData = metricData.concat(accessData);

        // 시간순으로 정렬
        combinedData.sort((a, b) => b.time - a.time);

        setCombinedData(combinedData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchCombinedData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='AnomaylDetection'>
      <div className='Container'>
        <Title>
          <h4>Anomaly Detection</h4>
        </Title>
        <div className='Frame'>
        <iframe src="http://3.36.169.149:5601/app/dashboards#/view/9084b240-379e-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-24h%2Fh%2Cto%3Anow))&hide-filter-bar=true" height="100%" width="100%"></iframe>
        </div>
        <TableList>
          <table stickyheader>
            <TableHead>
              <tr>
                <th>Timestamp</th>
                <th>Detector</th>
                <th>Source IP</th>
                <th>Score</th>
                <th> </th>
              </tr>
            </TableHead>
            <TableBody>
              {combinedData.map((dataItem, index) => (
                <React.Fragment key={index}>
                  {dataItem.type === 'metric' ? (

                    <MetricItem result={dataItem} />
                  ) : (
                    <AccessItem result={dataItem} />
                  )
                  }
                </React.Fragment>
              ))}
            </TableBody>
          </table>
        </TableList>
      </div>
    </div>
  );
};

export default AnomalyDetection;
