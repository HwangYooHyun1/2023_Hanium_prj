import React from 'react'
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

export const ItemPage = ({ selectedItem }) => {
    const currentTime = new Date();

    const handleSendData = () => {
        fetch('http://210.110.39.163:5000/vulnerabilities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: selectedItem,
                currentTime: currentTime.toISOString(),
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from server:', data);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    };

    return (
        <Container>
            <h4>{selectedItem}</h4>
            <button onClick={handleSendData}>Scanning Start</button>
        </Container>
    )
}

export default ItemPage;