import React from 'react'
import styled from 'styled-components';
import Spinner from '../assets/Dual Ball-1s-187px.gif'

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left:0;
  background: rgb(248, 250, 253);
  z-index: 998;
  padding-left:260px;
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
  height: 45px;
  width: 170px; 
`;

export const Loading = () => {
  return (
    <Background>
      <Logo src="/image/modetec_logo2.png" alt="로고"></Logo>
      <img src={Spinner} alt="로딩중" width="5%" />
    </Background>
  )
}

export default Loading;