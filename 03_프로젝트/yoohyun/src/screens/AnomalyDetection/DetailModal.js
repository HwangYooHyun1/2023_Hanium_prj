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
  width: 80%;
  height: 95%;
  max-width: 80%;
  padding: 7px;
  background-color: #fff;
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

const DetailModal = ({ open, onClose, data }) => {
  const { detector, time, score, sourceIp } = data;

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
      return (<iframe src="http://3.36.169.149:5601/app/dashboards#/view/8c8249f0-3f4b-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A30000)%2Ctime%3A(from%3Anow-7d%2Fd%2Cto%3Anow))&hide-filter-bar=true"
        height="100%" width="100%"></iframe>)
    }
    else if (detector === "Nginx access status code rate") {
      return (<iframe src="http://3.36.169.149:5601/app/dashboards#/view/27a9c2e0-3fed-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A30000)%2Ctime%3A(from%3Anow-7d%2Fd%2Cto%3Anow))&hide-filter-bar=true"
        height="100%" width="100%" ></iframe>
      )
    }
    else if (detector === "Nginx access source IP high dc URL") {
      return (<iframe src="http://3.36.169.149:5601/app/dashboards#/view/dd71f990-3fec-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A30000)%2Ctime%3A(from%3Anow-7d%2Fd%2Cto%3Anow))&hide-filter-bar=true"
        height="100%" width="100%"></iframe>
      );
    }
    else if (detector === "Nginx access source IP high count") {
      return (<iframe src="http://3.36.169.149:5601/app/dashboards#/view/5b012490-3f4c-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A30000)%2Ctime%3A(from%3Anow-7d%2Fd%2Cto%3Anow))&hide-filter-bar=true"
        height="100%" width="100%"></iframe>
      );
    }
    else if (detector === "Nginx access visitor rate") {
      return (<iframe src="http://3.36.169.149:5601/app/dashboards#/view/a243dea0-3fed-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A30000)%2Ctime%3A(from%3Anow-7d%2Fd%2Cto%3Anow))&hide-filter-bar=true"
        height="100%" width="100%"></iframe>
      );
    }
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer open={open}>
        <ModalContent>
          <CloseButton onClick={onClose} />
          <Typography variant="h6">{detector}의 상세 정보</Typography>
          <Typography>Time: {new Date(time).toLocaleString()}</Typography>
          <Typography>Score: {score.toFixed(2)}</Typography>
          <Typography>Source IP: {sourceIp !== null ? sourceIp : "N/A"}</Typography>
          {renderIframe()}
        </ModalContent>
      </ModalContainer>
    </Modal>
  );

};


export default DetailModal;
