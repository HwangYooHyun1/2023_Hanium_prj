import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RIStyle.css';

const Title = Styled.div`
  padding-top: 60px;
  padding-left: 20px;
`;

const Sidebar = Styled.div`
  width: 250px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  position: fixed;
  left: 260px;
  top: 90px;
  bottom: 5px;
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
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    // 아이템 목록을 가져오는 비동기 로직을 작성하고 itemList 상태 업데이트
    fetch('http://52.79.201.187:8080/agents')
      .then(response => response.json())
      .then(data => {
        const infoMap = data.info.map;
        const newItems = Object.keys(infoMap).map(key => {
          const url = `http://3.36.169.149:5601/app/dashboards#/view/aa4a4aa0-379e-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(time:(from:now-24h%2Fh,to:now))&_a=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'metricbeat-*',key:host.hostname,negate:!f,params:(query:${infoMap[key]}),type:phrase),query:(match_phrase:(host.hostname:${infoMap[key]})))))&hide-filter-bar=true`;
          return {
            name: key,
            nameValue: infoMap[key],
            url: url,
          };
        });
        setItemList(newItems);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderIframe = () => {
    if (selectedItem) {
      return <iframe src={selectedItem.url} height="100%" width="100%"></iframe>;
    }
    return null;
  };


  return (
    <div className='rContainer'>
      <Title>
        <h5>Server Details Info</h5>
      </Title>
      <div className='rCenter' style={{ position: 'relative' }}>
        {isSidebarOpen && (
          <Sidebar>
            <div className='CloseSidebarButton' onClick={toggleSidebar} style={{ paddingLeft: '220px' }}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            <h5 style={{ padding: '15px' }}>Server List</h5>
            {itemList.map(item => (
              <div className='AccordionButton' key={item.name} onClick={() => setSelectedItem(item)}>
                {item.name} <br /> ({item.nameValue})
              </div>
            ))}
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
