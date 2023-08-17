import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

const UserId = styled.div`
  position: fixed;
  right:0;
  padding-right:30px;
`;
const Title = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(location.state?.userId);
  const handleLogoClick = () => {
    setUserId(null);
    navigate('/login');
  };

  useEffect(() => {
    // userId 값이 변경될 때마다 Title 컴포넌트를 리렌더링
    setUserId(location.state?.userId);
  }, [location.state?.userId]);

  return (
    <Design>
      <Button onClick={handleLogoClick} >
        <Logo src="/image/modetec_logo.png" alt="로고"></Logo>
      </Button>
      <UserId>{userId ? `user@ ${userId}` : ' '}</UserId>
    </Design >
  );
};

export default Title;