import React from "react";
import styled from "styled-components";

const TableRow = styled.tr`
  td {
    padding: 10px;
    border: 1px inset #ccc;
    font-size: 1.1rem;
    border-left: none;
    border-right: none;
  }
`;

const ScoreBox = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 auto;
  border: 0.5px solid #000;
  background-color: ${(props) => getScoreColor(props.score)};
`;

const getScoreColor = (score) => {
  if (score >= 25 && score < 50) {
    return "#fddd00";
  } else if (score >= 50 && score < 75) {
    return "#fba740";
  } else if (score >= 75 && score <= 100) {
    return "#fe5050";
  } else {
    return "#8bc8fb";
  }
};

const MetricItem = ({ result }) => {
  const { detector, time, score, sourceIp } = result;
  const kstTime = new Date(time).toLocaleString();
  const formattedScore = score.toFixed(2);
  const scoreColor = getScoreColor(score);

  return (
    <TableRow>
      <td>{kstTime}</td>
      <td>{detector}</td>
      <td>{sourceIp !== null ? sourceIp : ""}</td>
      <td>{formattedScore}</td>
      <td>
        <ScoreBox score={score} style={{ backgroundColor: scoreColor }} />
      </td>
    </TableRow>
  );
};

export default MetricItem;
