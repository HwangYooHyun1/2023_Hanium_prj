import React from 'react';
import './SplashStyle.css';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const WelcomeText = styled.div`
  font-weight: 700;
  font-size: 75px;
  color: white;
  padding-bottom: 30px;
  font-family: 'Advent Pro', sans-serif;
`;

const StartButton = styled(Button)`
  width: 200px;
  height: 45px;
  font-weight: bold; 
  position: relative; 
  top: -25px;
  display: flex;
  align-items: center; 
  
  && {
    font-weight: bold;
  }
`;

const Splash = (props) => {
  const navigate = useNavigate();

  // 클릭 이벤트 핸들러 함수
  const handleStartClick = () => {
    // navigate 함수를 호출하여 페이지 이동
    navigate('/main');
  };

  return (
    <div>
      <div className='Background'>
        <div className='logo'>
          <img src='/image/modetec_logo3.png' alt="Logo" />
        </div>
        <div className="guide">
          <button onClick={handleStartClick} style={{ border: "none", background: "none", padding: 0, cursor: "pointer" }}>
            <img src="/image/splash1.png" /></button>
          <button onClick={handleStartClick} style={{ border: "none", background: "none", padding: 0, cursor: "pointer" }}>
            <img src="/image/splash2.png" /></button>
          <button onClick={handleStartClick} style={{ border: "none", background: "none", padding: 0, cursor: "pointer" }}>
            <img src="/image/splash3.png" /></button>
        </div>
        <StartButton color='error'
          size="large"
          onClick={handleStartClick}
          sx={{
            fontSize: '23px', // 원하는 크기로 조절
            padding: '20px 40px', // 원하는 패딩 크기로 조절
          }} >START <PlayCircleOutlineIcon /></StartButton>
        <div className='welcome'>
          <WelcomeText>WELCOME TO MODETEC</WelcomeText>
          <h5 style={{ textAlign: "center", color: 'white' }}>Modetec offers a variety of services as follows.<br />
            Start monitoring your server by running our service.</h5>
        </div>
      </div>
    </div>
  );
}

export default Splash;
