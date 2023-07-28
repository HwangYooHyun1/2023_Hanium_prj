// Sidebar.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Modal from './Modals/Modal';
import ProjectModal from './Modals/ProjectModal';
import AgentModal from './Modals/AgentModal';
import './Sidebar1.css'

const Bar = styled.div`
  font-size: 1.2rem;
  top: 200px;
  height: calc(100vh/3);
  width: 250px;
  background-color: rgb(60,60,60);
  position: fixed; /* 고정된 위치로 설정 */
  top: 60px; /* 상단에 고정 */
  left: 0; /* 왼쪽에 고정 */
  z-index: 999; /* 다른 바와 겹치지 않게 설정 */
`;

const Center = styled.div`
  height: 1;
  margin:4%;
  padding-top:10px;
  display: flex;
  flex-direction: row;
`;

const Margin = styled.div`
  margin: 5px;
`;
const Title = styled.div`
padding: 13px;
font-size:1.1rem;
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
          <button type="button" className="btn btn-danger" onClick={openProjectModal}>
            프로젝트 +
          </button>
          <Margin></Margin>
          <button type="button" className="btn btn-danger" onClick={openAgentModal}>
            에이전트 +
          </button>
        </Center>
        <Title>
          <a>프로젝트 목록</a>
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
