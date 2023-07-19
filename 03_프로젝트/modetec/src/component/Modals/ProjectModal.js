import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  max-width: 500px;
  max-height: 400px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 5px;
  /* Increase the height of the textarea as needed */
  height: 150px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: yellow;
  border: none;
  color: #000;
  cursor: pointer;
  flex: 1;
  margin-right: 10px;
`;

const SubmitButton = styled(Button)`
  margin-right: 0;
`;

const ModalContent = styled.div`
  max-height: 100%;
  overflow: auto;
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

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>프로젝트 등록</h2>
      <ModalContent>
        <InputWrapper>
          <Label>프로젝트 이름:</Label>
          <Input type="text" value={projectName} onChange={handleProjectNameChange} />
        </InputWrapper>
        <InputWrapper>
          <Label>프로젝트 설명:</Label>
          {/* Use the TextArea component here */}
          <TextArea value={projectDescription} onChange={handleProjectDescriptionChange} />
        </InputWrapper>
      </ModalContent>
      <ButtonWrapper>
        <Button type="button" onClick={handleClose}>Close</Button>
        <SubmitButton type="submit">Next</SubmitButton>
      </ButtonWrapper>
    </FormContainer>
  );
};

export default ProjectModal;
