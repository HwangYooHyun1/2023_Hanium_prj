import React from 'react'
import styled from 'styled-components'

const Screen = styled.img`   
  width: 1650px;
  height: 800px;
  padding-top: 10px;
  padding-right: 10px;

`;

const Title = styled.div`
  display: fixed;
  padding-top: 60px;
`;


const WebScanning = (props) => {
  return (
    <div>
      <Title>
        <h5>웹 취약점 스캐닝</h5>
      </Title>
      <Screen src='/image/웹취약점스캐닝.png'></Screen>
    </div>
  )
}

export default WebScanning