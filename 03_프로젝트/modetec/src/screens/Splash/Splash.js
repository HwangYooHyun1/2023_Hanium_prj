import React, { useState } from 'react';
import './SplashStyle.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const WelcomeText = styled.div`
  font-weight: 700;
  font-size: 75px;
  color: white;
  padding-bottom: 30px;
  font-family: 'Advent Pro', sans-serif;
`;

const StartButton = styled(Button)`
  width: 250px;
  height: 50px;
  font-weight: bold; 
  position: relative; 
  display: flex;
  align-items: center; 
  border: 2px solid transparent;
  && {
    font-weight: bold;
  }
`;


const Login = (props) => {
  const navigate = useNavigate();
  const handleStartClick = () => {
    // navigate 함수를 호출하여 페이지 이동
    navigate('/main');
  };

  return (
    <div>
      <div className='Background'>
        <div className='logo'>
          <img src='/image/modetec_logo3.png' alt="Logo" />
          <div className='welcome'>
            <WelcomeText>WELCOME TO MODETEC</WelcomeText>
            <h4 style={{ textAlign: "center", color: 'white' }}>
              Our service offers a monitoring system for server metrics and access logs,<br />
              powered by ML to detect anomalies and send alerts.<br />
              Additionally, it aids in identifying security vulnerabilities through web scanning and monitors server status.<br /></h4>
            <h4 style={{ fontWeight: 'bold', color: 'white' }}>Get started with MODETEC below !</h4>

            <StartButton color='error'
              size="large"
              variant="contained"
              onClick={handleStartClick}
              sx={{
                fontSize: '25px',
                margin: '30px',
              }} >START <KeyboardArrowRightIcon fontSize="large" /></StartButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
