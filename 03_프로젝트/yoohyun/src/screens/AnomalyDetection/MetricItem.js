// MetricItem.js
import React from "react";
import styled from "styled-components";

const TableRow = styled.tr`
  td {
    padding: 8px;
    border: 1px solid #ccc;
  }
`;

// 시간을 한국 표준 시간대로 변환하는 함수
const convertToKST = (timestamp) => {
    const date = new Date(timestamp);
    const kstOffset = 9 * 60; // KST는 UTC+9
    date.setMinutes(date.getMinutes() + kstOffset);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const MetricItem = ({ result }) => {
    const { detector, time, score } = result;
    const kstTime = convertToKST(time); // 시간 변환

    return (
        <TableRow>
            <td>{kstTime}</td>
            <td>{detector}</td>
            <td>{score}</td>
        </TableRow>
    );
};

export default MetricItem;
