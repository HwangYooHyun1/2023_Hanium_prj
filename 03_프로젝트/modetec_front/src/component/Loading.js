import React from 'react'
import styled from 'styled-components';
import Spinner from '../assets/Dual Ball-1s-187px.gif'
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: rgba(248, 250, 253, 0.7); /* Semi-transparent background */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

export const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;

const Logo = styled.img`
  height: 60px;
  width: 185px; 
  margin-bottom: 10px;
`;

export const Loading = () => {
  return (
    <Background>
      <Logo src="/image/modetec_logo2.png" alt="로고"></Logo>
      <Stack sx={{ width: '200px', color: 'grey.500' }}>
        <LinearProgress color="inherit" />
      </Stack>
    </Background>
  )
}

export default Loading;