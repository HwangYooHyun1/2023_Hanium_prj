import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Modal from './Modals/Modal';
import ProjectModal from './Modals/ProjectModal';
import AgentModal from './Modals/AgentModal';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';

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
  color: white;
  &::-webkit-scrollbar {
    width: 8px; 
  }
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

const StyledDiv = styled.div`
  background-color: ${(props) => (props.clicked ? 'rgb(100, 100, 100)' : 'rgb(60,60,60)')};
  cursor: pointer;
  padding-left:15px;
  transition: background-color 0.2s; /* 배경색 변화에 트랜지션 효과 추가 */
`;


const Sidebar = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const [clickedItem, setClickedItem] = useState(null);

  const handleItemClick = (item) => {
    if (item === clickedItem) {
      // 이미 클릭한 아이템을 다시 클릭하면 클릭 상태 해제
      setClickedItem(null);
    } else {
      // 새로운 아이템을 클릭하면 클릭 상태 설정
      setClickedItem(item);
    }
    navigate('/resource');
  };

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
          {projectList.map((project, index) => (
            <StyledDiv key={index} clicked={index === clickedItem}
              onClick={() => handleItemClick(index)}
            >
              {project}
            </StyledDiv>
          ))}
        </ContentListContainer>
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
