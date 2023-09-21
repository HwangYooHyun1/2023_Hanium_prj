import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 80%;
    top: 200px;
    right: 80px;
  `;

function Main() {
  return (
    <div>
      <StyledDiv>
        <button style={{ border: "none", background: "none", padding: 0, cursor: "pointer" }}>
          <img src="/image/splash1.png" /></button>
        <button style={{ border: "none", background: "none", padding: 0, cursor: "pointer" }}>
          <img src="/image/splash2.png" /></button>
        <button style={{ border: "none", background: "none", padding: 0, cursor: "pointer" }}>
          <img src="/image/splash3.png" /></button>
      </StyledDiv>
    </div>
  )
}

export default Main