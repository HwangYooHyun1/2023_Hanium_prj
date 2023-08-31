import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';

const ModalContainer = styled.div`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1001;
`;

const ModalContent = styled.div`
  width: 70%;
  height: 95%;
  max-width: 80%;
  padding: 7px;
  background-color: rgb(248, 250, 253);
  border-radius: 0.3rem;
  overflow: auto;
  position: relative;
`;

const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 5px;
  right: 5px;
  margin: 7px;
`;

const DataBox = styled.div`
  background-color : #fff;
  margin: 10px;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const DetailModal = ({ open, onClose, data, year, month, day }) => {
  const { detector, time, score, sourceIp } = data;

  const today = new Date();
  const koreanTime = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const formattedDate = koreanTime.toISOString().substring(0, 10);

  console.log('formattedDate:', formattedDate)
  const currentDate = new Date(year, month - 1, day);
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  const formattedToday = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  const formattedSevenDaysAgo = `${sevenDaysAgo.getFullYear()}-${(sevenDaysAgo.getMonth() + 1).toString().padStart(2, '0')}-${sevenDaysAgo.getDate().toString().padStart(2, '0')}`;

  console.log("formattedToday:", formattedToday);
  console.log("formattedSevenDaysAgo:", formattedSevenDaysAgo);

  const prevOpenRef = React.useRef(open);

  React.useEffect(() => {
    console.log("DetailModal is", open ? "open" : "closed");

    // 이전 open 상태와 현재 open 상태가 다른 경우에만 로그 출력
    if (prevOpenRef.current !== open) {
      console.log("DetailModal transition:", prevOpenRef.current, "->", open);
      prevOpenRef.current = open;
    }
  }, [open]);

  const renderIframe = () => {
    if (detector === "system.cpu.total.pct high_mean" || detector === "system.memory.total.pct high_mean" || detector === "system.disk.total.pct high_mean" || detector === "system.network.out.bytes high_mean") {
      return (
        <iframe src={`http://3.36.169.149:5601/app/dashboards#/view/8c8249f0-3f4b-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3A'${formattedSevenDaysAgo}T15%3A00%3A00.000Z'%2Cto%3A'${formattedToday}T15%3A00%3A00.000Z'))&show-time-filter=true&hide-filter-bar=true`}
          height="100%" width="100%"
        ></iframe>)
    }
    else if (detector === "Nginx access status code rate") {
      return (<iframe src={`http://3.36.169.149:5601/app/dashboards#/view/27a9c2e0-3fed-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3A'${formattedSevenDaysAgo}T15%3A00%3A00.000Z'%2Cto%3A'${formattedToday}T15%3A00%3A00.000Z'))&show-time-filter=true&hide-filter-bar=true`}
        height="100%" width="100%"></iframe>)
    }
    else if (detector === "Nginx access source IP high dc URL") {
      return (<iframe src={`http://3.36.169.149:5601/app/dashboards#/view/dd71f990-3fec-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:'${formattedSevenDaysAgo}T15:00:00.000Z',to:'${formattedToday}T15%3A00%3A00.000Z'))&_a=()&show-time-filter=true&hide-filter-bar=true`}
        height="100%" width="100%"></iframe>)
    }
    else if (detector === "Nginx access source IP high count") {
      return (<iframe src={`http://3.36.169.149:5601/app/dashboards#/view/5b012490-3f4c-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3A'${formattedSevenDaysAgo}T15%3A00%3A00.000Z'%2Cto%3A'${formattedToday}T15%3A00%3A00.000Z'))&show-time-filter=true&hide-filter-bar=true`}
        height="100%" width="100%"></iframe>
      );
    }
    else if (detector === "Nginx access visitor rate") {
      return null;
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer open={open}>
        <ModalContent>
          <CloseButton onClick={onClose} />
          <Typography variant="h5" style={{ padding: '8px', fontWeight: 'bold' }}>Details of {detector}</Typography>
          <DataBox>
            <Typography style={{ paddingBottom: '3px', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>Selected anomaly detection data information</Typography>
            <Typography style={{ padding: '5px 0', paddingTop: '10px' }}>Detector : {detector}</Typography>
            <Typography style={{ padding: '5px 0' }}>Time : {new Date(time).toLocaleString()}</Typography>
            <Typography style={{ padding: '5px 0' }}>Score : {score.toFixed(2)}</Typography>
            <Typography style={{ padding: '5px 0', paddingBottom: '10px' }}>Source IP : {sourceIp !== null ? sourceIp : "N/A"}</Typography>
          </DataBox>
          <div style={{ height: '100vh', border: 'none', overflow: 'hidden' }}>{renderIframe()}</div>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );

};


export default DetailModal;
