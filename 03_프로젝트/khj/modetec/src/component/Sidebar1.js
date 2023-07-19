import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const Center = styled.div`
  height: 1;
  margin:5%;
  display: flex;
  flex-direction: row;
  `;

const Bar = styled.div`
  font-size: 1.2rem;
  top: 200px;
  width: 16rem;
  height: 250px;
`;

const Title = styled.div`
margin: 15px;
font-size:1.2rem;
`;


const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
    <Bar>
        <Center>
        <button type="button" class="btn btn-danger"> 프로젝트 +</button>
        <div class='space'></div>
        <button type="button" class="btn btn-danger">에이전트 +</button>
        </Center>
        <Title><a>프로젝트 목록</a></Title>
      <Navigation
  
          onSelect={({itemId}) => {
            navigate(itemId);
          }}
          items={[
       
          ]}
        />
    </Bar>
      
    </>
  );
}

export default Sidebar
