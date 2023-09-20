import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MetricItem from './MetricItem';
import AccessItem from './AccessItem';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import './Style.css';


const TableList = Styled.div`
  height: 33vh; 
  display: flex;
  justify-content: center;
  overflow: auto;
`;

const TableHead = Styled.thead`
  th {
    font-size: 1rem;
    position: sticky;
    z-index: 998;
    top: 0;
    padding: 10px;
    padding-left: 50px;
    border-bottom: 1px inset #ccc;
  }
`;

const TableBody = Styled.tbody`
  padding-top: 40px;
  padding-bottom: 100px;
  background-color: white;
`;

const TableContainer = Styled.div`
  margin-left: 250px;
  margin-right: 15px;
  padding-bottom: 10px;
  padding-top: 10px;
  background-color : white;
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.2);
`;

const AnomalyDetection = (props) => {
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  useEffect(() => {
    const fetchCombinedData = async () => {
      try {
        console.log('Anomaly Detection Fetching data...');
        const metricResponse = await axios.get('http://52.79.201.187:8080/metricanomaly');
        const accessResponse = await axios.get('http://52.79.201.187:8080/loganomalies');

        const metricData = metricResponse.data.info.metricResponseData.map(item => ({ ...item, type: 'metric' }));
        const accessData = accessResponse.data.info.logResponseData.map(item => ({ ...item, type: 'access' }));
        const combinedData = metricData.concat(accessData).filter(item => item.score > 3);
        combinedData.sort((a, b) => b.time - a.time);


        setCombinedData(combinedData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchCombinedData();
    const interval = setInterval(fetchCombinedData, 5000);

    return () => {
      clearInterval(interval);
    };

  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = combinedData.slice(startIndex, endIndex);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='AnomalyDetection'>
      <div className='Container'>
        <div className='Title'>
          <h5 style={{ fontWeight: 'bold' }}>Anomaly Detection</h5>
          <Tooltip color="disabled" title={<Typography style={{ fontSize: 16 }}>Info Page</Typography>}>
            <InfoIcon style={{ marginBottom: '3px', marginLeft: '10px' }} sx={{ fontSize: 28 }} />
          </Tooltip>
        </div>
        <div className='Frame'>
          <iframe src="http://3.36.169.149:5601/app/dashboards#/view/9084b240-379e-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-24h%2Fh%2Cto%3Anow))&hide-filter-bar=true" height="100%" width="100%"></iframe>
        </div>
        <TableContainer>
          <TableList>
            <table stickyheader='true'>
              <TableHead>
                <tr>
                  <th style={{ paddingRight: '250px', paddingLeft: '5px' }}>Timestamp</th>
                  <th style={{ paddingRight: '350px', paddingLeft: '5px' }}>Detector</th>
                  <th style={{ paddingRight: '190px', paddingLeft: '5px' }}>Source IP | State code</th>
                  <th style={{ paddingLeft: '5px' }}>Score</th>
                  <th style={{ paddingRight: '0px' }}> </th>
                  <th style={{ paddingRight: '50px' }}> </th>
                </tr>
              </TableHead>
              <TableBody>
                {currentPageData.map((dataItem, index) => (
                  <React.Fragment key={index}>
                    {dataItem.type === 'metric' && dataItem.score >= 3 ? (
                      <MetricItem result={dataItem} />
                    ) : (
                      <AccessItem result={dataItem} />
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </table>
          </TableList>
          <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
            <Pagination
              count={Math.ceil(combinedData.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="rounded"
              shape="rounded"
            />
          </Stack>
        </TableContainer>
      </div>
    </div>
  );
};

export default AnomalyDetection;

