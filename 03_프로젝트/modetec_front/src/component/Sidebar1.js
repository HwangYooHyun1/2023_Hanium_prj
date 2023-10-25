import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Modal from './Modals/Modal';
import ProjectModal from './Modals/ProjectModal';
import AgentModal from './Modals/AgentModal';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Bar = styled.div`
  top: 200px;
  height: calc(100vh / 3);
  width: 240px;
  background-color: rgb(60, 60, 60);
  position: fixed;
  top: 30px;
  left: 0;
  z-index: 999;
`;
const ContentListContainer = styled.div`
  max-height: 200px; 
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px; 
  }

  /* 스크롤바의 색상 설정 */
  &::-webkit-scrollbar-thumb {
    background-color: #888; 
    border-radius: 4px; 
  }
`;
const Center = styled.div`
  height: 1;
  margin: 4%;
  padding-top: 10px;
  display: flex;
  flex-direction: row; /* 버튼들을 수평으로 배치하기 위해 row로 변경 */
  justify-content: center; /* 버튼들을 수평 방향으로 가운데 정렬 */
`;

const Title = styled.div`
  padding: 11px;
  font-size: 1.1rem;
  color: rgb(237, 237, 237);
`;

const Sidebar = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const navigate = useNavigate();
  const [contentList, setContentList] = useState([]);

  const openProjectModal = () => {
    setProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setProjectModalOpen(false);
  };

  const openAgentModal = () => {
    setAgentModalOpen(true);
  };

  const closeAgentModal = () => {
    setAgentModalOpen(false);
  };

  const handleNextStep = () => {
    closeProjectModal();
    openAgentModal();
  };

  return (
    <>
      <Bar>
        <Center>
          <Stack direction="row" spacing={0.6}>
            <Button variant="contained"
              className="btn btn-danger"
              onClick={openProjectModal}
              sx={{
                width: '110px',
                backgroundColor: 'rgb(210, 50, 50)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgb(190, 50, 50)',  // 마우스 호버 시 배경색 변경
                },
              }}
              startIcon={<CreateNewFolderIcon />} >
              PROJECT
            </Button>
            <Button
              variant="contained"
              className="btn btn-danger"
              onClick={openAgentModal}
              sx={{
                width: '108px',
                backgroundColor: 'rgb(210, 50, 50)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgb(190, 50, 50)',  // 마우스 호버 시 배경색 변경
                },
              }}
              endIcon={<PlaylistAddIcon />}>
              AGENT
            </Button>
          </Stack>
        </Center>
        <Title>
          <a>PROJECT LIST</a>
        </Title>
        <ContentListContainer>
          {contentList.length > 0 && (
            <ul>
              {contentList.map((item, index) => (
                <li key={index} style={{ color: 'white' }}>
                  <Link to="/resource" style={{ textDecoration: 'none', color: 'white' }}>
                    <strong >{item.projectName}</strong> : {item.projectDescription}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </ContentListContainer>
      </Bar>

      <Modal open={projectModalOpen} close={closeProjectModal} header="프로젝트 등록">
        <ProjectModal close={handleNextStep} addContentToList={setContentList} contentList={contentList} />
      </Modal>

      <Modal open={agentModalOpen} close={closeAgentModal} header="에이전트 등록">
        <AgentModal close={closeAgentModal} />
      </Modal>
    </>
  );
};

export default Sidebar;
