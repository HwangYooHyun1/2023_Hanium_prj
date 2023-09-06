import React from 'react';
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  demoMetricsContainer: {
    marginBottom: 10,
  },
  demoMetricsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  demoMetricsText: {
    fontSize: 12,
    marginBottom: 3,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderBottomWidth: 0,
    marginBottom: 3
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  tableCell: {
    padding: 5, // 셀의 패딩을 추가하여 텍스트와 경계 사이의 간격 조정
    fontSize: 10,
  },
  indexText: {
    fontSize: 12,
    marginBottom: 5, // 추가된 부분: 인덱스 텍스트 아래 여백
    color: '#666', // 인덱스 텍스트의 색상
  },
});

function AnomalyDetection({ anomalyData, selectedRiskLevels }) {
  console.log('테이블 출력용 확인 로그 - ', anomalyData);
  console.log('선택된 체크박스 배열 확인 로그 - ', selectedRiskLevels);


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

  const infoData = anomalyData; // 데이터 배열

  // Job에 따른 설명을 정의한 객체
const jobDescriptions = {
  "Nginx access visitor rate": `
    HTTP Access Logs: Detect unusual visitor rates (ECS)
    \n\n
    ""visitor_rate_ecs"" detects the percentage of unusual visitors to a website. In ideal situations, website visitor activity patterns generate requests at a fixed frequency.
    However, activities such as malicious behavior, scrap, and bots may differ from general visitor patterns.
  `,
  "Nginx access status code rate": `
    HTTP Access Logs: Detect unusual status code rates (ECS)
    \n\n
    ""status_code_rate_ecs"" focuses on the status codes of HTTP responses to detect abnormal status code ratios.
    For example, if the request fails and you see a large number of associated status codes, it is likely that the server is experiencing problems.
  `,
  "Nginx access source IP high dc URL": `
    HTTP Access Logs: Detect unusual source IPs - high distinct count of URLs (ECS)
    \n\n
    ""source_ip_url_count_ecs"" analyzes the number of field-specific URLs based on all sourceIPs.
    It is used to detect security threats and malicious activity early by finding strange IP addresses that send large numbers of requests to web servers.
    Under normal circumstances, requests from a particular IP address may be concentrated on some URLs, but in the case of unusual behavior or attack attempts, a high number of requests can occur for several different URLs.
  `,
  "Nginx access source IP high count": `
    HTTP Access Logs: Detect unusual source IPs - high request rates (ECS)
    \n\n
    ""source_ip_request_rate_ecs"" analyzes the request ratio based on all source IPs. 
    It is used to detect security threats and malicious activity early by finding strange IP addresses that send large numbers of requests to web servers.
    It has a typical request rate in normal use, but sending too many requests can be seen as a sign of server overload or malicious behavior.
  `,
  "low_request_rate_ecs": `
    HTTP Access Logs: Detect low request rates (ECS)
    \n\n
    ""low_request_rate_ecs"" detects when very few requests are made to the web server over a certain period of time.
    This can be associated with operational problems, connectivity problems, or network issues on the web server.
  `,
  "system.cpu.total.pct high_mean": `
    "system.cpu.total.pct high_mean" analyzes information about system CPU usage and detects abnormal behavior of high average CPU usage.
    \n\n
    As the central processing unit of a computer, the CPU is an important factor in performing operations on all processes and tasks.
    The CPU utilization on the system indicates the level of load on the tasks and processes currently running on the system.
    If the average CPU usage is significantly higher than expected, the system can be considered to be under load or a performance problem.
  `,
  "system.memory.total.pct high_mean": `
    "system.memory.total.pct high_mean" analyzes system-wide memory usage information and detects abnormal behavior of high average memory usage.
    \n\n
    Memory is an important resource used by computers to run programs and store data.
    System memory utilization indicates the memory requirements of processes and applications currently running on the system.
    If average memory utilization exceeds the system's physical memory limit, it can be considered a cause of system performance degradation or application malfunction.
  `,
  "system.disk.total.pct high_mean": `
    "system.disk.total.pct high_mean" analyzes system disk usage information and detects abnormal behavior of high average disk usage.
    \n\n
    Disks are important hardware elements for storing and retrieving data. 
    System disk utilization indicates the extent to which processes and tasks currently running on the system access the disk.
    If the average disk utilization exceeds expectations by a large margin, you can assume that the disk is experiencing slow performance or low space problems.
  `,
  "system.network.total.pct high_mean": `
    "system.network.total.pct high_mean" analyzes system network utilization information and detects abnormal behavior of high average network utilization.
    \n\n
    A network is an important element of data communication and is used by systems to communicate and exchange data with the outside world. 
    System network utilization represents the amount of network traffic currently occurring on the system.
    If average network utilization is well beyond the normal range, it can be considered that a network bottleneck or unusual network activity has occurred.
  `,
};

const getRiskLevel = (score) => {
  if (score >= 75) {
    return "High";
  } else if (score >= 50) {
    return "Medium";
  } else if (score >= 25) {
    return "Low";
  } else {
    return "Minimal";
  }
};

const filteredData = selectedRiskLevels.length > 0
  ? infoData.filter(data => selectedRiskLevels.includes(getRiskLevel(data.score)))
  : infoData;

return (
  <View style={styles.demoMetricsContainer}>
    {filteredData.map((data, index) => (
        <View key={index}>
          {/* 조건에 따라 새로운 페이지 생성 */}
          

          <Text style={styles.demoMetricsTitle}>
            <Text>Anomaly Data</Text>
            <Text style={styles.indexText}>Index: {index}</Text> {/* 추가된 부분 */}
          </Text>
          <View style={styles.table}>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Job</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.detector}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Time</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.time}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Score</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.score}</Text>
              </View>
            </View> 

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Risk Level</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={{ ...styles.tableCell, color: getScoreColor(data.score) }}>
                  {data.score >= 75 ? "High" : data.score >= 50 ? "Medium" : data.score >= 25 ? "Low" : "Minimal"}
                </Text>
              </View>
            </View>

            {data.content && (
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {/^\d{3}$/.test(data.content) ? "Status Code" : "Source IP"}
                  </Text>
                </View>

                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.content}</Text>
                </View>
              </View>
            )}


            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Classification</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {data.detector.startsWith("system.") ? "Metric Anomaly" : "Nginx HTTP Access Logs"}
                </Text>
              </View>
            </View> 

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Classification Description</Text>
              </View>

              <View style={styles.tableCol}>
                {data.detector.startsWith("system.") ? 
                  <Text style={styles.tableCell}>
                    "Metric Anomaly" continuously monitors the health and performance of various system elements on the web server and detects when a system metric (CPU/Memory/Disk I/O/Network) is out of range.
                  </Text> 
                  : 
                  <Text style={styles.tableCell}>
                    "Nginx HTTP Access Logs" analyzes each HTTP request received by the web server from the client and logs containing response information to it to detect abnormal behavior.
                  </Text>
                }
              </View>


            </View> 

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Job Description</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {jobDescriptions[data.detector] || "Default Job Description (if applicable)"}
                </Text>
              </View>
            </View>


          </View>

        </View>
      ))}
    </View>
  );
}



export default AnomalyDetection;