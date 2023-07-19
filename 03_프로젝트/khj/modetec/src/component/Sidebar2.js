import React  from 'react'
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const Title = styled.div`
margin: 15px;
font-size:1.2rem;
`;
const Bar = styled.div`
  position: sticky;
  font-size: 1.1rem;
  top: 200px;
  width: 16.4rem;
  height: 100%;
`;


const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <>
    <Title><a>메뉴</a></Title>
    <Bar>
      <Navigation
  
          onSelect={({itemId}) => {
            navigate(itemId);
          }}
          items={[
      
            {
              title: '모니터링 대시보드',
              itemId: '/dashboard',
              subNav: [
                {
                  title: '리소스 모니터',
                  itemId: '/',
                },
                {
                  title: '웹 액세스 모니터',
                  itemId: '/webaccess',
                },
              ],
            },
            {
              title: '이상탐지',
              itemId: '/anomalydetection'
            },
            {
              title: '웹 취약점 스캐닝',
              itemId: '/webscanning'
            },
            {
              title: '보고서',
              itemId: '/report'
            },
          ]}
        />
    </Bar>
      
    </>
  );
}

export default Sidebar