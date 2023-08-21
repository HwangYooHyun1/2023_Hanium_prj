import React, { useEffect } from 'react';

const App = () => {
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8080/swagger-ui/index.html#/ml-api/subscribe');

        eventSource.addEventListener('ANOMALY', event => {
            console.log('Received event:', event);
        });

        return () => {
            eventSource.close(); 
        };
    }, []);

    return (
        <div className="App">
            {/* 알림 내용을 UI에 표시하거나 처리할 수 있는 컴포넌트 추가 */}
        </div>
    );
};

export default App;
