import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
  min-width: 300px;
`;

const CustomTextField = styled(TextField)`
  width: 100%;
  min-width: 400px;
  margin-top: 8px;
`;


const ButtonWrapper = styled.div`

  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 25px;
  justify-content: space-around; /* 간격을 좀 더 적게 벌림 */
`;

const CustomButton = styled.button`
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

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;


const ModalContent = styled.div`
  max-height: 100%;
  overflow: auto;
`;

const AgentTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  text-align: center; /* 가로 기준 가운데 정렬 */
  `;

const ProjectModal = ({ close }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform project registration logic

    // Proceed to the next step
    close();
  };

  const handleClose = () => {
    close();
  };

  const handleCloseModal = () => {
    close(); // Call the close function to close the modal
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <ModalContent>
      <CloseButton onClick={handleCloseModal}>X</CloseButton>

      <AgentTitle>Register Project</AgentTitle>
        <InputWrapper>
          <CustomTextField
            type="text"
            value={projectName}
            onChange={handleProjectNameChange}
            label="프로젝트 이름"
            placeholder="프로젝트 이름을 입력하세요"
          />
        </InputWrapper>
        <InputWrapper>
          <CustomTextField
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
            label="프로젝트 설명을 입력하세요"
          multiline
          rows={4}
          />
        </InputWrapper>
      </ModalContent>
      <ButtonWrapper>
        <CustomButton type="submit">등록</CustomButton>
      </ButtonWrapper>
    </FormContainer>
  );
};

export default ProjectModal;
