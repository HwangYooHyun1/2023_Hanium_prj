import React from 'react';
import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  demoMetricsContainer: {
    marginLeft: 20,
    marginRight: 15,
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
    padding: 5,
    fontSize: 10,
  },
  indexText: {
    fontSize: 12,
    marginBottom: 5,
    color: '#666',
  },
  statusCell: {
    padding: 5,
    fontSize: 10,
  },
  riskStatus: {
    backgroundColor: 'red',
    color: 'white',
  },
  safeStatus: {
    backgroundColor: 'green',
    color: 'white',
  },
  image: {
    width: 596,
    height: 850,
    position: 'absolute'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 65,
    marginLeft: 40,
  },
  
});



function WebVulnerabilities({ WebVulnerabilityData }) {
  if (WebVulnerabilityData) {
    const pages = WebVulnerabilityData.reduce((result, data, index) => {
      if (index % 3 === 0) {
        // 3의 배수일 때 새로운 페이지 생성
        result.push(
          <Page key={index} wrap size="A4" style={styles.page}>

            <View>
              <Image src="/image/backgroundNoIcon.png" style={styles.image} />
            </View>

              <Text style={styles.sectionTitle}>WebVulnerability Table</Text>

            <View style={styles.section}>

              <View style={styles.demoMetricsContainer}>

                <Text style={styles.demoMetricsTitle}>
                  <Text>WebVulnerabilities</Text>
                  <Text style={styles.indexText}>Index: {index}</Text>
                </Text>

                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>vulnerability</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{data.vulnerability}</Text>
                    </View>
                  </View>
                <View style={styles.tableRow}>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>description</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.description}</Text>
              </View>

            </View>

            <View style={styles.tableRow}>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>security_threat</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.security_threat}</Text>
              </View>

            </View>

            <View style={styles.tableRow}>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>content</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.content}</Text>
              </View>

            </View>

            {/* status 값에 따라 배경색을 다르게 설정 */}
            <View style={styles.tableRow}>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>status</Text>
              </View>

              <View style={[styles.tableCol, styles.statusCell, data.status === 'Risk' ? styles.riskStatus : (data.status === 'Safe' ? styles.safeStatus : {})]}>
                <Text style={styles.tableCell}>
                  {data.status}
                </Text>
              </View>

            </View>

                </View>
              </View>
            </View>
          </Page>
        );
      } else {
        // 3의 배수가 아닌 경우 현재 페이지에 내용 추가
        const currentPage = result[result.length - 1];
        const newChildren = currentPage.props.children.concat( // Create a new array
        <View key={index} style={styles.section}>

          <View key={index} style={styles.demoMetricsContainer}>
            {/* ... 내용 추가 ... */}

          <Text style={styles.demoMetricsTitle}>
            <Text>WebVulnerabilities</Text>
            <Text style={styles.indexText}>Index: {index}</Text> {/* 추가된 부분 */}
          </Text>

          <View style={styles.table}>

            <View style={styles.tableRow}>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>vulnerability</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.vulnerability}</Text>
              </View>

            </View>
            
            <View style={styles.tableRow}>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>description</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.description}</Text>
              </View>

            </View>

            <View style={styles.tableRow}>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>security_threat</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.security_threat}</Text>
              </View>

            </View>

            <View style={styles.tableRow}>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>content</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.content}</Text>
              </View>

            </View>

            {/* status 값에 따라 배경색을 다르게 설정 */}
            <View style={styles.tableRow}>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>status</Text>
              </View>

              <View style={[styles.tableCol, styles.statusCell, data.status === 'Risk' ? styles.riskStatus : (data.status === 'Safe' ? styles.safeStatus : {})]}>
                <Text style={styles.tableCell}>
                  {data.status}
                </Text>
              </View>

            </View>
            
          </View>
        </View>

          </View>
        );
        result[result.length - 1] = React.cloneElement(currentPage, { children: newChildren }); // Update the page with new children
      }
      return result;
    }, []);

    return <>{pages}</>;
  }

  return null; // WebVulnerabilityData가 없을 때 처리
}

export default WebVulnerabilities;



