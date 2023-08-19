import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Modal from './Modals/Modal';
import ProjectModal from './Modals/ProjectModal';
import AgentModal from './Modals/AgentModal';
import './Sidebar1.css';

const Bar = styled.div`
  font-size: 1.2rem;
  top: 200px;
  height: calc(100vh / 3);
  width: 260px;
  background-color: rgb(60, 60, 60);
  position: fixed;
  top: 50px;
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

const Button = styled.button`
  width: 100%; /* 버튼들이 가로로 늘어나도록 100% 너비 지정 */
  margin: 5px; /* 버튼들 사이에 약간의 간격 추가 */
  font-size: 1.1rem;
`;

const Title = styled.div`
  padding: 11px;
  font-size: 1.2rem;
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
          <Button type="button" className="btn btn-danger" onClick={openProjectModal}>
            Project +
          </Button>
          <Button type="button" className="btn btn-danger" onClick={openAgentModal}>
            Agent +
          </Button>
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
