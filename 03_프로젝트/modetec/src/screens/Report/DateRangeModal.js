import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

// Styled components for modal styling
const ModalWrapper = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  margin-top: 40px;
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 8px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 16px;
  position: relative;
  margin-bottom: 12px;
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
`;

const RiskCheckbox = styled.div`
  display: flex;
  align-items: center;
`;

const Checkmark = styled.span`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: ${props => props.color};
`;

const LogoImage = styled.img`
  position: absolute;
  top: 10px;
  left: 15px;
  width: 150px;
`;


function DateRangeModal({ isOpen, onClose, onSubmit, selectedRiskLevels, onRiskLevelChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleRiskLevelChange = (event) => {
    const value = event.target.value;
    const updatedRiskLevels = selectedRiskLevels.includes(value)
      ? selectedRiskLevels.filter(level => level !== value)
      : [...selectedRiskLevels, value];

    onRiskLevelChange(updatedRiskLevels);
  };

  const handleSubmit = () => {
    onSubmit(startDate, endDate, selectedRiskLevels);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
      {/* 로고 이미지를 먼저 위치시킵니다. */}
      <LogoImage src="/image/modetec_logo2.png" alt="Logo" style={{ marginBottom: '20px' }} />
      <ModalTitle>날짜 범위 선택</ModalTitle>
      {/* DatePicker와 다른 내용들을 배치합니다. */}
      <div style={{ marginBottom: '10px', marginTop: '20px' }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <ModalTitle>보고서로 확인 할 이상탐지 수준 선택</ModalTitle>
       <CheckboxWrapper>
          <RiskCheckbox>
            <CheckboxInput
              type="checkbox"
              value="High"
              checked={selectedRiskLevels.includes("High")}
              onChange={handleRiskLevelChange}
            />
            <CheckboxLabel style={{ color: '#000000' }}>
              High
              <Checkmark color="#fe5050" />
            </CheckboxLabel>
          </RiskCheckbox>

          <RiskCheckbox>
            <CheckboxInput
              type="checkbox"
              value="Medium"
              checked={selectedRiskLevels.includes("Medium")}
              onChange={handleRiskLevelChange}
            />
            <CheckboxLabel style={{ color: "#000000" }}>
              Medium
              <Checkmark color="#fba740" />
            </CheckboxLabel>
          </RiskCheckbox>

          <RiskCheckbox>
            <CheckboxInput
              type="checkbox"
              value="Low"
              checked={selectedRiskLevels.includes("Low")}
              onChange={handleRiskLevelChange}
            />
            <CheckboxLabel style={{ color: '#000000' }}>
            Low
              <Checkmark color="#fddd00" />
            </CheckboxLabel>
          </RiskCheckbox>

          <RiskCheckbox>
            <CheckboxInput
              type="checkbox"
              value="Minimal"
              checked={selectedRiskLevels.includes("Minimal")}
              onChange={handleRiskLevelChange}
            />
            <CheckboxLabel style={{ color: '#000000' }}>
            Minimal
              <Checkmark color="#8bc8fb" />
            </CheckboxLabel>
          </RiskCheckbox>

        </CheckboxWrapper>
        <ModalButtonWrapper>
          <ModalButton onClick={handleSubmit}>확인</ModalButton>
          <ModalButton onClick={onClose}>취소</ModalButton>
        </ModalButtonWrapper>
      </ModalContent>
    </ModalWrapper>
  );
}

export default DateRangeModal;
