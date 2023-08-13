import React from 'react';

const AbnormalReportDetail = ({ report }) => {
  return (
    <div>
      <h3 style={{ fontSize: '40px', fontWeight: 'bold' }}>{report}</h3>
      <p>{report}에 관한 이상 탐지 보고서 상세 내용을 여기에 표시합니다.</p>
      {/* 이상 탐지 보고서 내용을 출력하는 추가 코드를 작성하시면 됩니다. */}
    </div>
  );
};

export default AbnormalReportDetail;
