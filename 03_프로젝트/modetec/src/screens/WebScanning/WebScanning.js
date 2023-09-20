import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import FeedbackIcon from '@mui/icons-material/Feedback';
import './WSStyle.css';
import ItemPage from './ItemPage';

const Title = Styled.div`
  padding-top: 40px;
  padding-left: 10px;
`;

const Sidebar = Styled.div`
  width: 230px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  position: fixed;
  left: 250px;
  top: 75px;
  bottom: 10px;
  z-index: 1000;
`;

const ContentWrapper = Styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 75px;
  left: 480px; 
  right: 20px;
  bottom: 10px;
  overflow: auto;
  margin-left: 10px;
  
`;

export const WebScanning = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    // 아이템 목록을 가져오는 비동기 로직을 작성하고 itemList 상태 업데이트
    fetch('http://52.79.201.187:8080/agents')
      .then(response => response.json())
      .then(data => {
        const infoMap = data.info.map;
        const newItems = Object.keys(infoMap).map(key => {
          return {
            name: key,
            nameValue: infoMap[key],
          };
        });
        setItemList(newItems);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  return (
    < div className='rContainer' >
      <Title>
        <h5 style={{ fontWeight: 'bold' }}>Web Vulnerabilty Scanning</h5>
      </Title>
      <div className='rCenter' style={{ position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ paddingLeft: '200px', paddingTop: '340px' }}>
            <FeedbackIcon color='disabled' sx={{ fontSize: 40 }} />
          </div>
          <h4 style={{ paddingLeft: '200px', paddingTop: '10px', color: 'grey' }}>Click a server in the list</h4>
        </div>

        <Sidebar>
          <h5 style={{ padding: '15px', paddingTop: '40px' }}>Server List</h5>
          {itemList.map(item => (
            <div className='AccordionButton' key={item.name} onClick={() => setSelectedItem(item)}>
              {item.name} <br /> ({item.nameValue})
            </div>
          ))}
        </Sidebar>

        <ContentWrapper>
          {selectedItem && <ItemPage selectedItem={selectedItem} />}
        </ContentWrapper>
      </div>
    </div >
  );
}

export default WebScanning;
