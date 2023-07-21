import React from 'react'
import Styled from 'styled-components'

const Title = Styled.div`
  padding-top: 20px;
`;

const WebAccess = (props) => {
  return (
    <div>
      <Title><h5>웹 액세스 모니터</h5></Title>
      <iframe src="http://3.36.169.149:5601/app/dashboards#/view/5bc2aa60-2201-11ee-a0f2-110032b8cf20?embed=true&_g=(refreshInterval:(pause:!f,value:60000),time:(from:now-24h%2Fh,to:now))&_a=()&hide-filter-bar=True" height="100%" width="1600"></iframe>
    </div>
        
  )
}

export default WebAccess