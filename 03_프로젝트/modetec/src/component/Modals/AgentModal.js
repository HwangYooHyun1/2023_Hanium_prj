import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

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
  const [projectList, setProjectList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchProjectList() {
      try {
        const response = await axios.get("http://52.79.201.187:8080/projects");

        if (response.status === 200) {
          const responseData = response.data;
          console.log('프로젝트명 서버 응답 데이터:', responseData);

          if (responseData.returnCode === 'SUCCESS') {
            const projects = responseData.info.filter(project => project !== '');
            setProjectList(projects);
          } else {
            console.error('프로젝트 목록 가져오기 실패');
          }
        } else {
          console.error('GET 요청 실패');
        }
      } catch (error) {
        console.error('GET 요청 오류:', error);
      }
    }

    fetchProjectList();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedProject || !ip || !name) {
      setErrorMessage('값을 입력하세요!');
      return;
    }
  
    const requestData = {
      ip,
      projectName: selectedProject,
      agentName: name,
      description,
    };
  
    try {
      const response = await axios.post("http://52.79.201.187:8080/projects/new", requestData);
  
      if (response.status === 200) {
        const responseData = response.data;
        console.log('등록 서버 응답 데이터:', responseData);

        
  
        if (responseData.returnCode === 'SUCCESS') {
          // 등록이 성공했을 때 한글로 알림을 표시합니다.
          window.alert(`프로젝트 : '${selectedProject}'\n에이전트 : '${name}'\n등록이 완료되었습니다!`);
          console.log('프로젝트 등록 성공');
        } else {
          console.error('프로젝트 등록 실패');
        }
      } else {
        console.error('POST 요청 실패');
      }
    } catch (error) {
      console.error('POST 요청 오류:', error);
    }
  
    close();
  };
  const handleCloseModal = () => {
    close();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <CloseButton onClick={handleCloseModal} /> {/* 닫기 버튼 */}
      <AgentTitle>Register Agent</AgentTitle>
      <InputWrapper>
        <CustomTextField
          select
          label="프로젝트 선택"
          value={selectedProject}
          onChange={handleProjectChange}
        >
          <MenuItem value="">프로젝트를 선택하세요</MenuItem>
          {projectList.map((project, index) => (
            <MenuItem key={index} value={project}>
              {project}
            </MenuItem>
          ))}
        </CustomTextField>
      </InputWrapper>

      <InputWrapper>
        <CustomTextField
          type="text"
          value={ip}
          onChange={handleIPChange}
          label="IP 주소를 '-'를 사용하여 입력하세요"
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
      <p style={{ color: 'red' }}>{errorMessage}</p>
      <CustomButton type="submit">등록</CustomButton>
    </FormContainer>
  );
};

export default AgentModal;
