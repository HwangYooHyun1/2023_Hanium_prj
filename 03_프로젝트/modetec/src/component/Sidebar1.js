import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'react-minimal-side-navigation';
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

const Center = styled.div`
  height: 1;
  margin: 4%;
  padding-top: 10px;
  display: flex;
  flex-direction: row; /* 버튼들을 수평으로 배치하기 위해 row로 변경 */
  justify-content: center; /* 버튼들을 수평 방향으로 가운데 정렬 */
`;

/*const Button = styled.button`
  //width: 100%; /* 버튼들이 가로로 늘어나도록 100% 너비 지정 */
// margin: 5px; /* 버튼들 사이에 약간의 간격 추가 */
// font-size: 0.9rem;
//`;

const Title = styled.div`
  padding: 11px;
  font-size: 1.1rem;
  color: rgb(237, 237, 237);
`;

const Sidebar = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const navigate = useNavigate();

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
          {/* Button 스타일드 컴포넌트를 버튼들에 적용 */}
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
        <Navigation
          onSelect={({ itemId }) => {
            navigate(itemId);
          }}
          items={[]}
        />
      </Bar>

      <Modal open={projectModalOpen} close={closeProjectModal} header="프로젝트 등록">
        <ProjectModal close={handleNextStep} />
      </Modal>

      <Modal open={agentModalOpen} close={closeAgentModal} header="에이전트 등록">
        <AgentModal close={closeAgentModal} />
      </Modal>
    </>
  );
};

export default Sidebar;
