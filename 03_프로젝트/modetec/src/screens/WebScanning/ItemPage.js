import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import Loading from '../../component/Loading';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Container = Styled.div`
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    position: fixed;
    top: 75px;
    bottom: 10px;
    right: 15px;
    left: 495px;
`;

export const ItemPage = ({ selectedItem }) => {
    const [loading, setLoading] = useState(true);
    const [responseData, setResponseData] = useState([]);

    const convertIP = (ip) => {
        const ipMap = {
            'ip-172-31-12-240': '43.201.117.55',
            'ip-172-31-15-63': '43.201.100.180',
        };
        return ipMap[ip];
    };

    const handleSendData = () => {
        setLoading(true);
        const convertedIP = convertIP(selectedItem.nameValue);
        fetch('http://210.110.39.163:8080/vulnerabilties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: convertedIP
            }),
        })
            .then(response => response.json())
            .then(data => {
                setResponseData(data);
                sessionStorage.setItem(selectedItem.nameValue, JSON.stringify(data));
            })
            .catch(error => {
                console.error('Error sending data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        const storedData = sessionStorage.getItem(selectedItem.nameValue);
        if (storedData) {
            setResponseData(JSON.parse(storedData));
            setLoading(false);
        } else {
            handleSendData();
        }
    }, [selectedItem.nameValue]);

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h5 style={{ padding: '15px', margin: '0' }}>Scanning results of {selectedItem.name}({selectedItem.nameValue})</h5>
                <button onClick={handleSendData} style={{ marginRight: '10px' }}>Scanning Start</button>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#f2f2f2' }}>
                                <TableCell style={{ width: '440px', paddingLeft: '40px', fontWeight: 'bold', fontSize: '16px' }}>Vulnerability</TableCell>
                                <TableCell style={{ width: '690px', fontWeight: 'bold', fontSize: '16px' }}>Content</TableCell>
                                <TableCell style={{ paddingRight: '200px', fontWeight: 'bold', fontSize: '16px' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {responseData.map((item, index) => (
                                <React.Fragment key={index}>
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls={`panel-content-${index}`}
                                                    id={`panel-header-${index}`}
                                                >
                                                    <Typography>
                                                        <TableRow>
                                                            <TableCell style={{ width: '400px', fontWeight: 'bold' }}>{item.vulnerability}</TableCell>
                                                            <TableCell style={{ width: '700px', fontWeight: 'bold' }}>{item.content}</TableCell>
                                                            <TableCell style={{ width: '200px', fontWeight: 'bold', backgroundColor: item.status === 'Risk' ? 'rgba(255, 30, 30, 0.8)' : 'rgba(80, 190, 80, 0.8)' }}>{item.status}</TableCell>
                                                        </TableRow>
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <TableHead>
                                                        <h5> </h5>
                                                        <Typography style={{ fontWeight: 'bold' }}>More Info about {item.vulnerability}</Typography>
                                                        <h5> </h5>
                                                        <TableRow>
                                                            <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
                                                            <TableCell style={{ fontWeight: 'bold' }}>Purpose</TableCell>
                                                            <TableCell style={{ fontWeight: 'bold' }}>Security Threat</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell style={{ width: '400px', fontWeight: 'bold' }}>{item.description}</TableCell>
                                                            <TableCell style={{ width: '500px', fontWeight: 'bold' }}>{item.purpose}</TableCell>
                                                            <TableCell style={{ width: '400px', fontWeight: 'bold' }}>{item.security_threat}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </AccordionDetails>
                                            </Accordion>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
            }
        </Container >
    );
};

export default ItemPage;
