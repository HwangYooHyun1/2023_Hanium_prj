import React, { useEffect, useState } from 'react';
import axios from 'axios';


const AnomalyDetection = () => {
  const [result, setResult] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const axiosData = async () => {
    try {
      const response = await axios.get('http://3.36.169.149:9200');
      console.log(response.data);
      console.log('연결완료');
      setResult(response.data); // 가져온 데이터를 상태에 저장
    } catch (error) {
      console.error('Error while fetching ML jobs:', error);
    }
  };

  useEffect(() => {
    axiosData(); // 컴포넌트가 마운트되면 데이터를 가져오도록 호출
  }, []);

  // 원하는 Job 이름들
  const desiredJobs = [
    "low_request_rate_ecs",
    "metric_anomaly",
    "source_ip_request_rate_ecs",
    "source_ip_url_count_ecs",
    "visitor_rate_ecs"
  ];

  // 원하는 Job 이름들에 해당하는 결과를 필터링하는 함수
  const filterResults = () => {
    const filtered = result.filter((item) => desiredJobs.includes(item.job_id));
    setFilteredResults(filtered);
  };

  useEffect(() => {
    filterResults(); // 컴포넌트가 마운트되면 원하는 Job들을 필터링
  }, [result]);

  return (
    <div>
      <h4>AnomalyDetection</h4>
      <ul>
        {filteredResults.map((job) => (
          <li key={job.job_id}>{job.job_id}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnomalyDetection;