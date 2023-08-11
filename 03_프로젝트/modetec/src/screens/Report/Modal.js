import React from 'react';
import styled from 'styled-components';


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
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

const ModalTabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 80px;
`;

const ModalTab = styled.div`

  padding: 20px 10px;
  background: ${(props) => (props.isActive ? '#69c8af' : '#cccccc')};
  color: ${(props) => (props.isActive ? '#fff' : '#999999')};
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;

  &:hover {
    background: ${(props) => (props.isActive ? '#4b9584' : '#aaa')};
    color: #333;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

const GenerateReportButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  /* 아래 중앙에 위치하도록 */
  bottom: 20px; /* 원하는 여백을 설정해주세요 */
`;


const GenerateReportButton = styled.button`
  font-size: 16px;
  padding: 8px 60px;
  border: 1px solid;
  line-height: 1.5;
  background-color: #0063cc;
  color: #fff;
  cursor: pointer;
  border-color: #0063cc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  text-transform: none;
  &:hover {
    background-color: #0069d9;
    border-color: #0062cc;
    box-shadow: none;
  }
  &:active {
    box-shadow: none;
    background-color: #0062cc;
    border-color: #005cbf;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
`;

const ReportText = styled.p`
  font-size: 16px; /* 원하는 글꼴 크기로 조정하세요 */
  text-align: center;
  margin-top: 10px; /* 원하는 여백을 설정하세요 */
  color: #333; /* 원하는 글꼴 색상으로 조정하세요 */
`;

const LogoImage = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 150px;
`;


const Modal = ({ selectedTab, isGeneratingReports, handleTabChange_2, handleGenerateReports, handleCloseModal }) => {
  return (
    <ModalOverlay>
      <ModalContent>
      <LogoImage src="/image/modetec_logo2.png" alt="Logo" /> {/* 이미지를 모달 상단에 추가 */}

        <CloseButton onClick={handleCloseModal}>X</CloseButton>
        <ModalTabContainer>
          <ModalTab
            isActive={selectedTab === 'tab1'}
            onClick={() => handleTabChange_2('tab1')}
          >
            일간 서버 보고서
          </ModalTab>
          <ModalTab
            isActive={selectedTab === 'tab2'}
            onClick={() => handleTabChange_2('tab2')}
          >
            이상 탐지 보고서
          </ModalTab>
        </ModalTabContainer>


{isGeneratingReports ? (
  <ReportText>보고서 생성 중...</ReportText>
) : (
  <ReportText>보고서를 생성하려면 생성하기 버튼을 누르세요</ReportText>
)}

{(selectedTab === 'tab1' || selectedTab === 'tab2') && !isGeneratingReports && (
          <GenerateReportButtonWrapper>
            <GenerateReportButton onClick={handleGenerateReports}>
              생성하기
            </GenerateReportButton>
          </GenerateReportButtonWrapper>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
