import React from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
  height: 100vh; 
  width: 100vw;
  padding-left:30px;
`;

const Title = Styled.div`
  padding-top: 60px;
  padding-left: 10px;
`;

const Report = () => {
  return (
    <Container>
        <Title>Report</Title>
    </Container>
  )
}

export default Report