import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
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

const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 5px;
  right: 5px;
  margin: 7px;
  background-color: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;


const AgentTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  `;

const AgentModal = ({ close }) => {
  const [ip, setIP] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const handleIPChange = (e) => {
    setIP(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform agent registration logic
    // ...

    // Close the modal
    close();
  };

  const handleCloseModal = () => {
    close(); // Call the close function to close the modal
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <CloseButton onClick={handleCloseModal} />
      <AgentTitle>Agent Project</AgentTitle>
      <InputWrapper>
        <CustomTextField
          select
          label="프로젝트 선택"
          value={selectedProject}
          onChange={handleProjectChange}
        >
          <MenuItem value="">프로젝트를 선택하세요</MenuItem>
          <MenuItem value="project1">프로젝트 1</MenuItem>
          <MenuItem value="project2">프로젝트 2</MenuItem>
          <MenuItem value="project3">프로젝트 3</MenuItem>
        </CustomTextField>
      </InputWrapper>
      <InputWrapper>
        <CustomTextField
          type="text"
          value={ip}
          onChange={handleIPChange}
          label="IP 주소를 입력하세요"
        />
      </InputWrapper>
      <InputWrapper>
        <CustomTextField
          type="text"
          value={name}
          onChange={handleNameChange}
          label="이름을 입력하세요"
        />
      </InputWrapper>
      <InputWrapper>
        <CustomTextField
          value={description}
          onChange={handleDescriptionChange}
          label="에이전트 설명을 입력하세요"
          multiline
          rows={4}
        />
      </InputWrapper>
      <CustomButton type="submit">등록</CustomButton>
    </FormContainer>
  );
};

export default AgentModal;
