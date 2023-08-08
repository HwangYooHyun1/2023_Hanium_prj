import React from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
  height: 100vh; 
  width: 100vw;
  padding-left:10px;
`;

const Title = Styled.div`
  padding-top: 60px;
  padding-left: 10px;
`;
export const ResourceInfo = () => {
    return (
        <Container>
            <Title><h5>서버 상세 정보 모니터</h5></Title>
            <iframe src="http://3.36.169.149:5601/app/dashboards#/view/ea7564a0-2b89-11ee-a0f2-110032b8cf20?embed=true&_g=()&hide-filter-bar=true" height="100%" width="100%"></iframe>
        </Container>
    )
}

export default ResourceInfo;