import React, { useState, useEffect } from 'react'
import Styled from "styled-components";

const Title = Styled.div`
  display: fixed;
  padding-top: 60px;
`;

const TableList = Styled.div`
  background-color: rgb(248, 250, 253);
  height: 33vh; 
  display: flex;
  padding-left: 260px;
  justify-content: center;
  overflow: auto;
`;

const TableHead = Styled.thead`
  th {
    background-color: #ffffff;
    font-size: 1.1rem;
    position: sticky;
    z-index: 998;
    top: 0;
    padding: 10px;
    padding-left: 50px;
    border-bottom: 1px inset #ccc;
  }
`;

const TableRow = Styled.tr`
    td{
        padding: 5px;
        border: 1px inset #ccc;
        font-size: 1rem;
        border-left: none;
        border-right: none; 
    }
`;

const TableBody = Styled.tbody`
  padding-top: 40px;
  padding-bottom: 100px;
  background-color: rgb(248, 250, 253);
`;

const WebScanning = ({ result }) => {

  const { vulnerability, content, status } = result;

  return (
    <div>
      <Title>
        <h5>Web Vulnerability Scanning</h5>
      </Title>
      <TableList>
        <table stickyheader='true'>
          <TableHead>
            <tr>
              <th style={{ paddingRight: '280px', paddingLeft: '10px' }}>Vulnerability</th>
              <th style={{ paddingRight: '320px', paddingLeft: '10px' }}>content</th>
              <th style={{ paddingRight: '280px', paddingLeft: '10px' }}>Status</th>
            </tr>
          </TableHead>
          <TableBody>
            <TableRow>
              <td>{vulnerability}</td>
              <td>{content}</td>
              <td>{status}</td>
            </TableRow>
          </TableBody>
        </table>
      </TableList>
    </div>
  )
}

export default WebScanning