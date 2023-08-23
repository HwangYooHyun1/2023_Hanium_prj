import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar2.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import SensorsIcon from '@mui/icons-material/Sensors';
import SummarizeIcon from '@mui/icons-material/Summarize';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.pathname);
  const [showSubNav, setShowSubNav] = useState(false);


  const handleTabClick = (itemId) => {
    setSelectedItem(itemId);
    if (itemId === '/' || itemId === '/webaccess' || itemId === '/resource_info') {
      setShowSubNav(true);
    } else {
      setShowSubNav(false);
    }
    navigate(itemId);
  };

  return (
    <div className='Bar'>
      <div className='title'>MENU</div>
      <button
        className={`nav-button ${selectedItem === '/' || selectedItem === '/resource_info' || selectedItem === '/webaccess' || showSubNav ? 'active' : ''}`}
        onClick={() => {
          setShowSubNav(!showSubNav);
        }}
        style={{ textAlign: 'left' }}
      >
        <DashboardIcon /> Monitoring Dashboard
      </button>
      {showSubNav && (
        <div className='sub-nav'>
          <button
            className={`sub-nav-button ${selectedItem === '/' ? 'active' : ''}`}
            onClick={() => handleTabClick('/')} // Handle 리소스 모니터 button click
            style={{ textAlign: 'left', textIndent: '20px' }}

          >
            • Resource Monitor
          </button>
          <button
            className={`sub-nav-button ${selectedItem === '/resource_info' ? 'active' : ''}`}
            onClick={() => handleTabClick('/resource_info')}
            style={{ textAlign: 'left', textIndent: '20px' }}

          >
            • Server Details Info
          </button>
          <button
            className={`sub-nav-button ${selectedItem === '/webaccess' ? 'active' : ''}`}
            onClick={() => handleTabClick('/webaccess')} // Handle 웹 액세스 모니터 button click
            style={{ textAlign: 'left', textIndent: '20px' }}

          >
            • Web Access Monitor
          </button>
        </div>
      )}
      <button
        className={`nav-button ${selectedItem === '/anomalydetection' ? 'active' : ''}`}
        onClick={() => handleTabClick('/anomalydetection')} // Handle 이상탐지 button click
        style={{ textAlign: 'left' }}
      >
        <CrisisAlertIcon /> Anomaly Detection
      </button>
      <button
        className={`nav-button ${selectedItem === '/webscanning' ? 'active' : ''}`}
        onClick={() => handleTabClick('/webscanning')} // Handle 웹 취약점 스캐닝 button click
        style={{ textAlign: 'left' }}
      >
        <SensorsIcon /> Vulnerability Scanning
      </button>
      <button
        className={`nav-button ${selectedItem === '/report' ? 'active' : ''}`}
        onClick={() => handleTabClick('/report')} // Handle 보고서 button click
        style={{ textAlign: 'left' }}
      >
        <SummarizeIcon /> Report
      </button>
    </div>
  );
};

export default Sidebar;