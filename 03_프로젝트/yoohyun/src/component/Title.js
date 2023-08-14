import React from 'react';
import styled from 'styled-components';

const Design = styled.div`
  background-color: rgb(0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  padding: 15px;
  color: white;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 이미지를 가로 축을 기준으로 왼쪽에 배치합니다. */
`;

const Logo = styled.img`
  height: 50px;
  width: 200px; /* 이미지의 가로 크기를 조정합니다. */
  margin-right: 10px;
`;

const Title = () => {
  return (
    <Design>
      <Logo src="/image/modetec_logo.png" alt="로고" />
    </Design>
  );
};

export default Title;