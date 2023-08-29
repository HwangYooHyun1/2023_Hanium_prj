import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

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

const App = () => {

    useEffect(() => {
        const eventSource = new EventSource('http://52.79.201.187:8080/anomaly/subscribe');
        eventSource.onopen = () => {
            console.log('SSE connection opened.');
        };

        eventSource.onerror = () => {
            console.error('SSE connection failed.');
        };

        eventSource.onmessage = event => {
            console.log('Received message:', event.data);
            const eventData = JSON.parse(event.data);
            const { detector, score } = eventData;

            const scoreColor = getScoreColor(score);
            const message = `An abnormality has been detected\ndetector: ${detector}\nscore: ${score}`;
            toast(message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeButton: false,
                style: { backgroundColor: scoreColor },
            });
        };
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div className="App">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default App;
