import React from 'react'
import styled from 'styled-components'
import AnnouncementIcon from '@mui/icons-material/Announcement';

const mainContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  `;
const Image = styled.img`
  margin-top: 35px;
  width: 1670px;
  height: auto; 
`;
const TextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

function Main() {
  return (
    <mainContainer>
      <Image src='image/main_background.png' alt="main" />
      <TextContainer>
        <h4 style={{ paddingLeft: '200px', paddingTop: '10px', color: 'grey' }}>
          <AnnouncementIcon color='disabled' sx={{ fontSize: 40 }} /><br /><br />
          WELCOME TO MODETEC ! <br /><br />
          Register projects and agents for server monitoring.<br />
          Then click on the project you want to monitor.
        </h4>
      </TextContainer>
    </mainContainer>
  )
}

export default Main