//axios로 api불러와서 스프링에서 데이터 받아오는거
import React from 'react';
import MetricList from './MetricList';
import AccessList from './AccessList';
import Styled from "styled-components"

const Container = Styled.div`
  height: 50vh; 
  width: 100vw;
  padding-left:30px;
`;

const Title = Styled.div`
  padding-top: 60px;
  padding-left: 10px;
`;


const AnomalyDetection = ({ result }) => {

  return (
    <div>
      <Title>
        <h4>AnomalyDetection</h4>
      </Title>
      
      <MetricList />

    </div>
  );
};

export default AnomalyDetection;

