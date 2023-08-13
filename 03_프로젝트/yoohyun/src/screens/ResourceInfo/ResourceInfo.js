import React, { useState } from 'react';
import Styled from 'styled-components';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RIStyle.css';

const Title = Styled.div`
  padding-top: 60px;
  padding-left: 10px;
`;

const Sidebar = Styled.div`
  width: 250px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  position: fixed;
  left: 270px;
  top: 90px;
  bottom: 0;
`;

const ContentWrapper = Styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.isSidebarOpen ? '260px' : '50px'};
  right: 0;
  bottom: 0;
`;

export const ResourceInfo = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderIframe = () => {
    if (selectedItem === 'Item 1') {
      return <iframe src="http://3.36.169.149:5601/app/dashboards#/view/aa4a4aa0-379e-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-24h%2Fh%2Cto%3Anow))&hide-filter-bar=true" height="100%" width="100%"></iframe>
    } else if (selectedItem === 'Item 2') {
      return <iframe src="http://3.36.169.149:5601/app/dashboards#/view/aa4a4aa0-379e-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-24h%2Fh%2Cto%3Anow))&hide-filter-bar=true" height="100%" width="100%"></iframe>
    }
    return null;
  };

  return (
    <div className='rContainer'>
      <Title>
        <h5>서버 상세 정보 모니터</h5>
      </Title>
      <div className='rCenter' style={{ position: 'relative' }}>
        {isSidebarOpen && (
          <Sidebar>
            <div className='CloseSidebarButton' onClick={toggleSidebar} style={{ paddingLeft: '220px' }}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            <h5 style={{ padding: '15px' }}>Server List</h5>
            <div className='AccordionButton' onClick={() => setSelectedItem('Item 1')}>Item 1</div>
            <div className='AccordionButton' onClick={() => setSelectedItem('Item 2')}>Item 2</div>
          </Sidebar>
        )}
        {!isSidebarOpen && (
          <button className='OpenSidebarButton' onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        )}
        <ContentWrapper isSidebarOpen={isSidebarOpen}>
          {renderIframe()}
        </ContentWrapper>
      </div>
    </div>
  );
};

export default ResourceInfo;
