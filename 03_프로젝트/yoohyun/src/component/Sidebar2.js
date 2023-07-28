import './Sidebar2.css'
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css'; 


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.pathname);

  return (
    <>
    <div className='Bar'>
    <div className='title'>메뉴</div>
      <Navigation
        activeItemId={selectedItem}

        onSelect={({ itemId }) => {
          setSelectedItem(itemId);
          navigate(itemId);
        }}
        items={[
          {
            title: '모니터링 대시보드',
            itemId: '',

            subNav: [
              {
                title: '• 리소스 모니터',
                itemId: '/',
              },
              {
                title: '• 웹 액세스 모니터',
                itemId: '/webaccess',
              },
            ],
          },
          {
            title: '이상탐지',
            itemId: '/anomalydetection',
          },
          {
            title: '웹 취약점 스캐닝',
            itemId: '/webscanning',
          },
          {
            title: '보고서',
            itemId: '/report',
          },
        ]}
      />
    </div>
    
  </>
  );
};

export default Sidebar;
