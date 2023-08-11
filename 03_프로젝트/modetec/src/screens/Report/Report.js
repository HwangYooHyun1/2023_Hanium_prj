import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DailyReportDetail from './DailyReportDetail';
import AbnormalReportDetail from './AbnormalReportDetail';
import Modal from './Modal';


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding-left: 10px;
  display: flex;
`;

const MainTitle = styled.div`
  padding-top: 60px;
  padding-left: 10px;
  font-size: 25px;

`;

const ReportTitle = styled.div`
  margin-top: 5px;
  padding-left: 10px;
  font-size: 20px;
`;

const Sidebar = styled.div`
  width: 265px;
  height: 20px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 10px;
  padding: 0px;
  background-color: #f0f0f0;
  display: inline-flex; /* Display horizontally */
`;

const TabInput = styled.input`
  display: none;
`;

const getTabLabelStyles = (isActive) => css`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  padding: 20px;
  background: ${isActive ? '#69c8af' : '#cccccc'};
  font-size: 12px;
  color: ${isActive ? '#fff' : '#999999'};
  cursor: pointer;
  text-align: center;

  &:hover {
    background: ${isActive ? '#4b9584' : '#aaa'};
    color: #333;
  }
`;

const TabLabel = styled.label`
  ${(props) => getTabLabelStyles(props.isActive)}
  
`;

const TabContent = styled.div`
  width: 300px;
  height: 300px;
  background: #999;
  position: absolute;
  left: -600px;
  transition: all 1s;

  &.active {
    display: block;
    left: 0;
  }
`;

const ListView = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const ReportItem = styled.div`
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    background-color: #d1d1d1;
  }
`;

const ReportDetail = styled.div`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  overflow: auto;
  position: relative; /* Add this line */
  margin-top: 70px;
  border-top: 5px solid #333; /* 추가된 선 스타일 */
  border-bottom: 5px solid #333;
  margin-bottom: 15px;
`;


const AnimatedH3 = styled.h3`
  font-size: 15px;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  background-color: black;
  height: 40px;
  color: white;

  &.slide-enter {
    transform: translateX(-100%);
  }

  &.slide-enter-active {
    transform: translateX(0);
    transition: transform 1s;
  }

  &.slide-exit {
    transform: translateX(0);
  }

  &.slide-exit-active {
    transform: translateX(-100%);
    transition: transform 1s;
  }
`;

const SidebarButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 버튼을 수직 방향으로 가운데 정렬 */
  flex: 1;
  padding-bottom: 5px; /* 하단 간격을 조절할 수 있습니다 */
  padding-top: 5px; 

`;

const GenerateReportButton = styled.button`
  font-size: 16px;
  padding: 8px 60px;
  border: 1px solid;
  line-height: 1.5;
  background-color: #0063cc;
  color: #fff;
  cursor: pointer;
  border-color: #0063cc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  text-transform: none;
  &:hover {
    background-color: #0069d9;
    border-color: #0062cc;
    box-shadow: none;
  }
  &:active {
    box-shadow: none;
    background-color: #0062cc;
    border-color: #005cbf;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
`;



const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;








const Report = () => {

  const [activeTab, setActiveTab] = useState('tab1');
  const [selectedReport, setSelectedReport] = useState(null);
  const [dailyReports, setDailyReports] = useState([]);
  const [abnormalReports, setAbnormalReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [isGeneratingReports, setIsGeneratingReports] = useState(false);
  const [reportGeneratedTime, setReportGeneratedTime] = useState(null);
  const [reportDateRange, setReportDateRange] = useState(null);

  const handleTabChange = (event) => {
    setActiveTab(event.target.id);
    setSelectedReport(null);
  };

  const handleReportClick = (report) => {
    setSelectedReport(report);
  };

const generateReports = (count, type, startCount) => {
  const reports = [];
  for (let i = 1; i <= count; i++) {
    const reportName = `${type} ${startCount + i}`;
    reports.push(reportName);
  }
  return reports;
};


  const handleTabChange_2 = (tabId) => {
    setSelectedTab(tabId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGenerateReport = () => {
    setShowModal(true);
  };

  const handleGenerateReports = () => {
    setIsGeneratingReports(true);
    
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1, // 하루를 빼서 00:00으로 설정
      0, 0, 0
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23, 59, 59
    );
    
    setTimeout(() => {
      setIsGeneratingReports(false);
      setShowModal(false);
    
      let newReports = [];
      if (selectedTab === 'tab1') {
        newReports = generateReports(1, '일간 서버 보고서', dailyReports.length);
        setDailyReports([...dailyReports, ...newReports]);
      } else if (selectedTab === 'tab2') {
        newReports = generateReports(1, '이상탐지 보고서', abnormalReports.length);
        setAbnormalReports([...abnormalReports, ...newReports]);
      }
    
      setReportGeneratedTime(new Date());
      setReportDateRange({ start: startDate, end: endDate }); // 생성한 날짜 범위 저장
    }, 2000);
  };
  

<TransitionGroup>
  {(activeTab === 'tab1' ? dailyReports : abnormalReports).map((report, index) => (
    <CSSTransition key={index} classNames="slide" timeout={1000}>
      <div onClick={() => handleReportClick(report)}>
        <ReportItem>
          {report}
        </ReportItem>
      </div>
    </CSSTransition>
  ))}
</TransitionGroup>



  return (
        <Container>
      <div>
        <MainTitle>Report</MainTitle>
        <SidebarButtonWrapper>
        <GenerateReportButton onClick={handleGenerateReport}>
          보고서 생성하기
        </GenerateReportButton>
        </SidebarButtonWrapper>
        <Sidebar>
          <TabInput
            type="radio"
            id="tab1"
            name="tabmenu"
            checked={activeTab === 'tab1'}
            onChange={handleTabChange}
          />
          <TabLabel htmlFor="tab1" isActive={activeTab === 'tab1'}>
            일간 서버 보고서
          </TabLabel>

          <TabInput
            type="radio"
            id="tab2"
            name="tabmenu"
            checked={activeTab === 'tab2'}
            onChange={handleTabChange}
          />
          <TabLabel htmlFor="tab2" isActive={activeTab === 'tab2'}>
            이상 탐지 보고서
          </TabLabel>
        </Sidebar>

        {/* 보고서 목록 */}
        <ListView>
          <TransitionGroup>
            <CSSTransition key={activeTab} classNames="slide" timeout={1000}>
              <AnimatedH3>
                {activeTab === 'tab1'
                  ? '일간 서버 보고서 목록'
                  : activeTab === 'tab2'
                  ? '이상 탐지 보고서 목록'
                  : ''}
              </AnimatedH3>
            </CSSTransition>
          </TransitionGroup>
          <TransitionGroup>
            {(activeTab === 'tab1' ? dailyReports : abnormalReports).map((report, index) => (
              <CSSTransition key={index} classNames="slide" timeout={1000}>
                <ReportItem onClick={() => handleReportClick(report)}>
                  {report}
                </ReportItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListView>


      </div>
       {/* 보고서 상세 내용 */}
       {selectedReport && (
        <ReportDetail>
          {selectedTab === 'tab1' ? (
            <DailyReportDetail
              report={selectedReport}
              reportGeneratedTime={reportGeneratedTime}
              reportDateRange={reportDateRange}
            />
          ) : (
            <AbnormalReportDetail report={selectedReport} />
          )}
        </ReportDetail>
      )}



      {/* Modal */}
      {showModal && (
        <Modal
          selectedTab={selectedTab}
          isGeneratingReports={isGeneratingReports}
          handleTabChange_2={handleTabChange_2}
          handleGenerateReports={handleGenerateReports}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Container>
  );
};


export default Report;
