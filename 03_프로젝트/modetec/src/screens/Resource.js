import React, { useState } from 'react';
import Styled from 'styled-components';
import RefreshIcon from '@mui/icons-material/Refresh';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const Container = Styled.div`
  height: 100vh; 
  width: 100vw;
`;

const Title = Styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;
  padding-left: 10px;
`;

const RefreshButton = Styled(RefreshIcon)`
  margin-top: 4px;
  margin-left : 5px;
  
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
        <Tooltip color="disabled" title={<Typography style={{ fontSize: 16 }}>Info Page</Typography>}>
          <InfoIcon style={{ marginTop: '4px', marginLeft: '10px' }} sx={{ fontSize: 28 }} />
        </Tooltip>
        <Tooltip title={<Typography style={{ fontSize: 16 }}>Reload Page</Typography>}>
          <RefreshButton sx={{ fontSize: 28 }} onClick={handleRefreshClick} />
        </Tooltip>
      </Title>
      {/* iframe 내부에 key prop을 사용하여 새로고침 이벤트를 감지하고 iframe을 다시 로드합니다. */}
      <iframe
        key={reload ? 'reload' : 'normal'}
        src="http://3.36.169.149:5601/app/dashboards#/view/459f45d0-3788-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval:(pause:!f,value:60000),time:(from:now-24h%2Fh,to:now))&_a=()&hide-filter-bar=true"
        width="100%"
        height="100%"
      ></iframe>
    </Container>
  );
};

export default Resource;
