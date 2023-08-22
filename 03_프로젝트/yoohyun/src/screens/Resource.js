import React, { useState } from 'react';
import Styled from 'styled-components';
import RefreshIcon from '@mui/icons-material/Refresh';
import InfoIcon from '@mui/icons-material/Info';

const Container = Styled.div`
  height: 100vh; 
  width: 100vw;
`;

const Title = Styled.div`
  display: flex;
  align-items: center;
  padding-top: 50px;
  padding-left: 20px;
`;

const RefreshButton = Styled(RefreshIcon)`
  margin-top: 5px;
  margin-left : 8px;
  
`;

const Resource = (props) => {
  // 상태를 사용하여 새로고침 이벤트를 처리합니다.
  const [reload, setReload] = useState(false);

  // 새로고침 버튼 클릭 시 새로고침 이벤트를 발생시킵니다.
  const handleRefreshClick = () => {
    setReload(!reload);
  };

  return (
    <Container>
      <Title>
        <h5 style={{ fontWeight: 'bold', marginTop: '10px' }}>Resource Monitor</h5>
        <RefreshButton sx={{ fontSize: 28 }} onClick={handleRefreshClick} />
      </Title>
      {/* iframe 내부에 key prop을 사용하여 새로고침 이벤트를 감지하고 iframe을 다시 로드합니다. */}
      <iframe
        key={reload ? 'reload' : 'normal'}
        src="http://3.36.169.149:5601/app/dashboards#/view/459f45d0-3788-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-24h%2Fh%2Cto%3Anow))&hide-filter-bar=true"
        width="100%"
        height="100%"
      ></iframe>

    </Container>

  );
};

export default Resource;
