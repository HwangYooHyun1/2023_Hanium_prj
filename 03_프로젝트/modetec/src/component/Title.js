import styled from 'styled-components';
import { useUser } from './UserContext';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const Design = styled.div`
  background-color: rgb(0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  height: 34px;
  width: 100%;
  color: white;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 이미지를 가로 축을 기준으로 왼쪽에 배치합니다. */
`;

const Logo = styled.img`
  height: 33px;
  width: 140px; 
  margin-left: 10px;
`;

const Button = styled.button`
  border: none;
  background-color: black;
  height: 30px;
  width: 120px; 
  margin-bottom: 6px;
`;

const UserId = styled.div`
  position: fixed;
  right:0;
  padding-right:20px;
  
`;

const theme = createTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          boxSizing: 'content-box',
          padding: 4,
          fontSize: '1.3rem',
        },
      },
    },
  },
});


const Title = () => {
  const { userId, setUserId } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogoClick = () => {
    setUserId(null);
    navigate('/');
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://use.fontawesome.com/releases/v5.14.0/css/all.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    //userId 값이 변경될 때마다 Title 컴포넌트를 리렌더링
    setUserId(location.state?.userId);
  }, [location.state?.userId]);

  return (
    <Design>
      <Button onClick={handleLogoClick} >
        <Logo src="/image/modetec_logo.png" alt="로고"></Logo>
      </Button>
      <UserId>
        {userId && (
          <Box
            sx={{
              '& > :not(style)': {
                m: 1,
              },
            }}
          >
            <ThemeProvider theme={theme}>
              <Chip
                sx={{
                  backgroundColor: 'rgba(128, 128, 128, 0.5)', // 불투명한 회색 배경
                  color: 'white', // 텍스트 색상을 흰색으로 설정
                  fontSize: '0.95rem',
                }}
                icon={<AccountCircleIcon color="white" />} label={`user@ ${userId}`} />
            </ThemeProvider>
          </Box>
        )}
      </UserId>
    </Design >
  );
};

export default Title;