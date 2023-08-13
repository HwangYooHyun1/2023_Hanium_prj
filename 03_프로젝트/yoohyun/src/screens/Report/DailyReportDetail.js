import React from 'react';

const DailyReportDetail = ({ report, reportGeneratedTime, reportDateRange }) => {
  // 임의의 서버 데이터 배열
  const serverData = [
    { serverName: '서버1', ipAddress: '192.168.1.1', os: 'Linux', cpuAverage: '40%', cpuMax: '80%', memoryAverage: '60%', memoryMax: '90%' },
    { serverName: '서버2', ipAddress: '192.168.1.2', os: 'Windows', cpuAverage: '30%', cpuMax: '70%', memoryAverage: '50%', memoryMax: '85%' },
    // 추가적인 서버 데이터를 여기에 추가하십시오.
  ];

  return (
    <div>
      <h3 style={{ fontSize: '40px', fontWeight: 'bold' }}>{report}</h3>
      <p>{report}에 관한 상세 내용을 여기에 표시합니다.</p>

      {/* 추가 코드: 생성 시간 및 조회 조건 출력 */}
      {reportGeneratedTime && reportDateRange && (
        <div>
          <p>보고서 생성 시간: {reportGeneratedTime.toLocaleString()}</p>
          <p>
            조회 조건: {reportDateRange.start.toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}{' '}
            ({reportDateRange.start.toLocaleDateString('en-US', {
              weekday: 'short',
            })}) 00:00:00 ~{' '}
            {reportDateRange.end.toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}{' '}
            ({reportDateRange.end.toLocaleDateString('en-US', {
              weekday: 'short',
            })}) 23:59:59
          </p>
        </div>
      )}

      {/* 추가 코드: 서버 목록 테이블 */}
      <p style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '30px' }}>
        [서버목록]
      </p>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>서버 그룹명</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>CPU 코어</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>메모리 정보</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>CPU 평균</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>CPU 최대</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>메모리 평균</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>메모리 최대</th>
          </tr>
        </thead>
        <tbody>
          {serverData.map((server, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{server.serverName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{server.ipAddress}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{server.os}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{server.cpuAverage}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{server.cpuMax}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{server.memoryAverage}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{server.memoryMax}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 아래에 iframe을 추가합니다. */}
      <iframe
      src="http://3.36.169.149:5601/app/dashboards#/view/459f45d0-3788-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-24h%2Fh%2Cto%3Anow))&hide-filter-bar=true"        style={{ width: '100%', height: '500px', border: 'none' }} // iframe 크기 조정
      ></iframe>

    </div>
  );
};

export default DailyReportDetail;
