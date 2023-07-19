import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 5px;
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color: yellow;
  border: none;
  color: #000;
  cursor: pointer;
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

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>에이전트 등록</h2>
      {/* Project Selection Dropdown */}
      <InputWrapper>
        <Label>프로젝트 선택:</Label>
        <Select value={selectedProject} onChange={handleProjectChange}>
          <option value="">프로젝트를 선택하세요</option>
          <option value="project1">프로젝트 1</option>
          <option value="project2">프로젝트 2</option>
          <option value="project3">프로젝트 3</option>
          {/* Add more options for other projects as needed */}
        </Select>
      </InputWrapper>
      <InputWrapper>
        <Label>IP:</Label>
        <Input type="text" value={ip} onChange={handleIPChange} />
      </InputWrapper>
      <InputWrapper>
        <Label>이름:</Label>
        <Input type="text" value={name} onChange={handleNameChange} />
      </InputWrapper>
      <InputWrapper>
        <Label>설명:</Label>
        <Input type="text" value={description} onChange={handleDescriptionChange} />
      </InputWrapper>
      <SubmitButton type="submit">등록</SubmitButton>
    </FormContainer>
  );
};

export default AgentModal;
