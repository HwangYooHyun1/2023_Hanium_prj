import React from 'react'
import styled from 'styled-components';

const Design = styled.div`
  background-color: rgb(34, 34, 34);
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 250px;
  padding:15px;
  color: white;
  z-index: 999;
`;

const Title = () => {
  return (
      <Design>
        <a> MODETEC </a>
  </Design>
  )
}

export default Title