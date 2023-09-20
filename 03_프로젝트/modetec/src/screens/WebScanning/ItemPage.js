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
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Tooltip from '@mui/material/Tooltip';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `0px`,
    "&:not(:last-child)": {
        borderBottom: 0
    },
    "&:before": {
        display: "none"
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
    backgroundColor: "rgb(255,255,245)"
    
}));

const Container = Styled.div`
    width:100%;
    height:100%;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background-color: white;
    overflow-y: hidden;
    position: absolute;
    
`;

export const ItemPage = ({ selectedItem }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [responseData, setResponseData] = useState([]);
    const [buttonText, setButtonText] = useState('Start Scanning');

    const convertIP = (ip) => {
        const ipMap = {
            'ip-172-31-12-240': '43.201.117.55',
            'ip-172-31-15-63': '43.201.100.180',
        };
        return ipMap[ip];
    };

    const handleSendData = () => {
        setLoading(true);
        const storedData = sessionStorage.getItem(selectedItem.nameValue);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setResponseData(parsedData.info);
            setLoading(false);
            setButtonText('Restart Scanning');
        } else {
            const convertedIP = convertIP(selectedItem.nameValue);
            console.log('Converted IP:', convertedIP);
            fetch('http://52.79.201.187:8080/vulnerabilities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: convertedIP
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Response Data:', data);
                    setResponseData(data);
                    sessionStorage.setItem(selectedItem.nameValue, JSON.stringify(data));
                })
                .catch(error => {
                    console.error('Error sending data:', error);
                })
                .finally(() => {
                    setLoading(false);
                    setButtonText('Restart Scanning');
                });
        }
    };



    useEffect(() => {
        setLoading(true);
        const storedData = sessionStorage.getItem(selectedItem.nameValue);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setResponseData(parsedData.info); // info 배열을 responseData로 설정
            setLoading(false);
        } else {
            handleSendData();
        }
    }, [selectedItem.nameValue]);


    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h5 style={{ fontWeight: 'bold', padding: '15px', margin: '0' }}>Scanning results of {selectedItem.name}({selectedItem.nameValue})</h5>
                <Tooltip title={<Typography style={{ fontSize: 16 }}>{buttonText}</Typography>} open={tooltipOpen} onClose={() => setTooltipOpen(false)} onOpen={() => setTooltipOpen(true)}>
                    <RestartAltIcon onClick={handleSendData} style={{ marginRight: '20px' }} sx={{ fontSize: 30 }} />
                </Tooltip>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <TableContainer component={Paper} style={{ height: '100%', overflow: 'auto' }}>
                    <Table style={{ marginTop: '16px', marginLeft: '30px', width: '95%' }}>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell style={{ width: '380px', paddingLeft: '40px', fontWeight: 'bold' }}>Vulnerability</TableCell>
                                <TableCell style={{ width: '650px', fontWeight: 'bold' }}>Content</TableCell>
                                <TableCell style={{ paddingRight: '200px', fontWeight: 'bold' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <Loading />
                            ) : responseData.length > 0 ? (
                                responseData.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <TableRow >
                                            <TableCell colSpan={4} style={{ border: 'none' }}>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls={`panel-content-${index}`}
                                                        id={`panel-header-${index}`}
                                                    >
                                                        <Typography >
                                                            <TableRow>
                                                                <TableCell style={{ width: '350px', fontWeight: 'bold' }}>{item.vulnerability}</TableCell>
                                                                <TableCell style={{ width: '650px', fontWeight: 'bold' }}>{item.content}</TableCell>
                                                                <TableCell style={{
                                                                    width: '200px',
                                                                    fontWeight: 'bold',
                                                                    backgroundColor: item.status === 'Risk'
                                                                        ? 'rgba(255, 30, 30, 0.8)'
                                                                        : item.status === 'Safe'
                                                                            ? 'rgba(80, 190, 80, 0.8)'
                                                                            : 'transparent'
                                                                }}>
                                                                    {item.status}
                                                                </TableCell>
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
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <p>No data available</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
            }
        </Container >
    );
};

export default ItemPage;