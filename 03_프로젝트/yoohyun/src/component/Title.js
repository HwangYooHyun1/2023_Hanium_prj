import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Design = styled.div`
  background-color: rgb(0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  padding: 15px;
  color: white;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 이미지를 가로 축을 기준으로 왼쪽에 배치합니다. */
`;

const Logo = styled.img`
  height: 48px;
  width: 200px; 
  padding-right: 10px;
`;

const Button = styled.button`
  border: none;
  background-color: black;
  height: 50px;
  width: 200px; 
`;
const Title = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/login');
  };

  return (
    <Design>
      <Button onClick={handleLogoClick} >
        <Logo src="/image/modetec_logo.png" alt="로고"></Logo>
      </Button>
    </Design >
  );
};

export default Title;