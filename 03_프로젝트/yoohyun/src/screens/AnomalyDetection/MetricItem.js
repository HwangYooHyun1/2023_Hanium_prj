import React, { useState } from "react";
import styled from "styled-components";
import IconButton from '@mui/material/IconButton';
import BarChartIcon from '@mui/icons-material/BarChart';
import DetailModal from "./DetailModal";

const TableRow = styled.tr`
  td {
    padding: 5px;
    border: 1px inset #ccc;
    font-size: 1rem;
    border-left: none;
    border-right: none;
  }
`;

const ScoreBox = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 auto;
  border: none;
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

const StyledIconButton = styled(IconButton)`
&& {
  padding: 3px;
  /* Add other styles as needed */
}
`;

const MetricItem = ({ result }) => {
  const { detector, time, score, sourceIp } = result;
  const kstTime = new Date(time).toLocaleString();
  const formattedScore = score.toFixed(2);
  const scoreColor = getScoreColor(score);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const year = new Date(time).getFullYear();
  const month = new Date(time).getMonth() + 1; // Months are zero-based
  const day = new Date(time).getDate();

  const openDetailModal = () => {
    console.log("Opening detail modal");
    setDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    console.log("Closing detail modal");
    setDetailModalOpen(false);
  };

  return (
    <TableRow>
      <td>{kstTime}</td>
      <td>{detector}</td>
      <td>{sourceIp !== null ? sourceIp : ""}</td>
      <td>{formattedScore}</td>
      <td>
        <ScoreBox score={score} style={{ backgroundColor: scoreColor }} />
      </td>
      <td>
        <StyledIconButton onClick={openDetailModal}>
          <BarChartIcon />
        </StyledIconButton>

      </td>
      {detailModalOpen && (
        <DetailModal
          open={detailModalOpen}
          onClose={closeDetailModal}
          data={result}
          year={year}
          month={month}
          day={day} />
      )}

    </TableRow>
  );
};

export default MetricItem;
