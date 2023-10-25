import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 60%;
  height: 80%;
  max-width: 30%;
  max-height: 70%;
  background-color: #fff;
  border-radius: 0.3rem;
  overflow: hidden;
  position: relative;
`;

const LogoImage = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 150px;
`;


const Modal = ({ open, onClose, children }) => {
  const [modalStyle, setModalStyle] = useState({});

  useEffect(() => {
    if (open) {
      const handleResize = () => {
        const width = window.innerWidth * 0.8; // 가로 80%
        const height = window.innerHeight * 0.8; // 세로 80%
        setModalStyle({ width: `${width}px`, height: `${height}px` });
      };

      handleResize(); // 초기 크기 설정

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [open]);



  return (
    <ModalContainer open={open}>
      <ModalContent style={modalStyle}>
        <LogoImage src="/image/modetec_logo2.png" alt="Logo" />

        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;