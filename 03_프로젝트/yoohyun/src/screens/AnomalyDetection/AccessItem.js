import React from "react";
import styled from "styled-components";

const TableRow = styled.tr`
  td {
    padding: 10px;
    padding-right: 70px;
    padding-left: 70px;
    border: 1px inset #ccc;
    font-size: 1.1rem;
    border-left: none; /* 왼쪽 선 제거 */
    border-right: none; /* 오른쪽 선 제거 */
  
`;
const ScoreBox = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 auto;
  border: 0.5px solid #000;
  background-color: ${props => getScoreColor(props.score)};
`;


const getScoreColor = (score) => {
  if (score >= 25 && score < 50) {
    return "#fddd00";
  } else if (score >= 50 && score < 75) {
    return "#fba740"; 
  } else if (score >= 57 && score <= 100) {
    return "#fe5050"; 
  } else {
    return "#8bc8fb"; 
  }
};;

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
  const { detector, time, score, sourceIp } = result;
  const kstTime = convertToKST(time); // 시간 변환
  const formattedScore = score.toFixed(2);
  const scoreColor = getScoreColor(score);
  return (
    <TableRow>
      <td>{kstTime}</td>
      <td>{detector}</td>
      <td>{sourceIp !== null ? sourceIp : ""}</td>
      <td>{formattedScore}</td>
      <td><ScoreBox score={score} style={{ backgroundColor: scoreColor }} /></td>
    </TableRow>
  );
};

export default MetricItem;
