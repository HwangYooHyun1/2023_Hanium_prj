import React from 'react'
import { useNavigate } from "react-router-dom";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const NavBarElements = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navigation
  
          onSelect={({itemId}) => {
            navigate(itemId);
          }}
          items={[
            {
              title: '메뉴',
            },
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
    </>
  );
}

export default NavBarElements