import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            const message = `An abnormality has been detected\ndetector: ${detector}\nscore: ${score}`;

            toast(message, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeButton: false,
                progressClassName: "custom-toast-progress",
                progressStyle: {
                    height: "5px",
                },
            });
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
            <ToastContainer theme="dark" />
        </div>
    );
};

export default Alert;
