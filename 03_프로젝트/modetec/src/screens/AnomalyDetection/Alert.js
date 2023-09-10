import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AlertStyle.css'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const getScoreColor = (score) => {
    if (score >= 25 && score < 50) {
        return "#fddd00";
    } else if (score >= 50 && score < 75) {
        return "#fba740";
    } else if (score >= 75 && score <= 100) {
        return "#fe5050";
    } else {
        return "#8bc8fb";
    }
};

const Alert = () => {
    const [scoreColor, setScoreColor] = useState("#8bc8fb");
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const eventSource = new EventSource("http://52.79.201.187:8080/anomaly/subscribe");
    eventSource.onopen = () => {
        console.log('SSE connection opened.'); // 연결 성공 로그
    };
    eventSource.addEventListener("ANOMALY", event => {
        try {
            const eventData = JSON.parse(event.data);
            if (Array.isArray(eventData)) {
                // 빈 배열인 경우 아무 작업하지 않음
                return;
            }

            const { detector, score } = eventData;
            const scoreColor = getScoreColor(score);
            setScoreColor(scoreColor);

            const messageStyle = {
                whiteSpace: 'pre-line'
            };

            const message = (
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <WarningAmberIcon className="custom-toast-icon" />
                    <div>
                        <strong>An abnormality has been detected!</strong><br />
                        detector: {detector}<br />
                        score: {score}
                    </div>
                </div>
            );


            toast(message, {
                bodyStyle: messageStyle,
                position: "top-center",
                autoClose: 6000,
                hideProgressBar: false,
                closeButton: true,
                hideProgressBar: false,
                progressClassName: "custom-toast-progress",
                progressStyle: {
                    height: '5px',
                    backgroundColor: scoreColor
                }
            });
            console.log('New data received:', eventData);
        } catch (error) {
            console.error('Error parsing event data:', error);
        }
    });

    eventSource.onerror = () => {
        console.log('SSE Error:');
        eventSource.close();
    };

    return (
        <div className="App">
            <ToastContainer
                progressClassName="custom-toast-progress"
                style={{
                    width: '500px',
                    '--custom-toast-color': scoreColor
                }}
                theme="light"
                bodyClassName="custom-toast-body" />
        </div>
    );
};

export default Alert;
