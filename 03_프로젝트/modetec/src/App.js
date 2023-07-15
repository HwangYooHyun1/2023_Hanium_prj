import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Resource from "./screens/Resource";
import WebAccess from "./screens/WebAccess";
import AnomalyDetection from "./screens/AnomalyDetection";
import WebScanning from "./screens/WebScanning";
import Report from "./screens/Report";
import Title from "./component/Title";
import Sidebar1 from "./component/Sidebar1";
import Sidebar2 from "./component/Sidebar2";


const Center = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  `;

  const Bar = styled.div`
  top: 200px;
  width: 17rem;
  height: 100%;
`;

const App = ()=> {
  return (
    <div className='App'>
      <BrowserRouter>
      <Title />
      <Center>
        <Bar>
          <Sidebar1/>
          <Sidebar2 />
        </Bar>
        <Routes>
          <Route path="/" element={<Resource />}/>
          <Route path="/webaccess" element={<WebAccess />}/>
          <Route path="/anomalydetection" element={<AnomalyDetection />}/>
          <Route path="/webscanning" element={<WebScanning />}/>
          <Route path="/report" element={<Report />}/>
        </Routes>
        </Center>
      </BrowserRouter>
    </div>
  );
}

export default App;
