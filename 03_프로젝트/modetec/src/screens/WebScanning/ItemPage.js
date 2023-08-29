import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'

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

const Table = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Vulnerability</th>
                    <th>Description</th>
                    <th>Purpose</th>
                    <th>Security Threat</th>
                    <th>Purpose</th>
                    <th>Status</th>

                    {/* 추가적인 항목들의 헤더도 추가 가능 */}
                </tr>
            </thead>
            <tbody>
                {Array.isArray(data) ? (
                    // data가 배열인 경우
                    data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.vulnerability}</td>
                            <td>{item.description}</td>
                            <td>{item.purpose}</td>
                            <td>{item.security_threat}</td>
                            <td>{item.content}</td>
                            <td>{item.status}</td>
                            {/* 추가적인 항목들도 여기에 추가 */}
                        </tr>
                    ))
                ) : (
                    // data가 배열이 아닌 경우 (객체 등)
                    <tr>
                        <td>{data}</td>
                        {/* 추가적인 항목들도 여기에 추가 */}
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export const ItemPage = ({ selectedItem }) => {
    const [responseData, setResponseData] = useState(() => {
        // 세션 스토리지에서 데이터 가져오기
        const storedData = sessionStorage.getItem(selectedItem);
        return storedData ? JSON.parse(storedData) : [];
    });
    const convertIP = (ip) => {
        const ipMap = {
            'ip-172-31-12-240': '43.201.117.55',
            'ip-172-31-15-63': '43.201.100.180',
        };
        return ipMap[ip];
    };

    useEffect(() => {
        // selectedItem이 변경될 때마다 responseData를 초기화
        setResponseData([]);
    }, [selectedItem]);

    const handleSendData = () => {
        console.log('Sending data...'); // 추가된 로그
        const convertedIP = convertIP(selectedItem);
        console.log('Converted IP:', convertedIP);

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
                console.log('Response from server:', data);
                setResponseData(data); // 받은 데이터를 상태로 저장
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });

    };

    return (
        <Container>
            <h4>{selectedItem}</h4>
            <button onClick={handleSendData}>Scanning Start</button>
            <Table data={responseData} />
        </Container>
    )
}

export default ItemPage;