import React from 'react'
import styled from 'styled-components';

const Design = styled.div`
  background-color: rgb(60,60,60);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const Title = () => {
  return (
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
         MODETEC </a>
  </div>
</nav>
  )
}

export default Title