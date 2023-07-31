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
  padding-top: 10px;
  padding-left: 10px;
`;


const AnomalyDetection = ({result}) => {

  return (
    <Container>
      <Title><h4>AnomalyDetection</h4></Title>
      <iframe src="http://3.36.169.149:5601/app/dashboards#/view/92eaae60-2b6c-11ee-a0f2-110032b8cf20?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-24h%2Fh,to:now))&_a=()&hide-filter-bar=true" height="100%" width="100%"></iframe>
    </Container>
  );
};

export default AnomalyDetection;