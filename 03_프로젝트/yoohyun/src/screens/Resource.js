import React from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
  height: 100vh; 
  width: 100vw;
  padding-left:30px;
`;

const Title = Styled.div`
  padding-top: 10px;
  padding-left: 10px;
`;

const Resource = (props) => {
  return (
    <Container>
      <Title><h5>리소스 모니터</h5></Title>
      <iframe src="http://3.36.169.149:5601/app/dashboards#/view/50e3d320-2383-11ee-a0f2-110032b8cf20?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-24h%2Fh%2Cto%3Anow))&hide-filter-bar=true" height="100%" width="100%"></iframe>
 </Container>
  )
}

export default Resource