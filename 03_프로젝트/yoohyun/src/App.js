import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Resource from "./screens/Resource";
import ResourceInfo from './screens/ResourceInfo/ResourceInfo'
import WebAccess from "./screens/WebAccess";
import AnomalyDetection from "./screens/AnomalyDetection/AnomalyDetection";
import WebScanning from "./screens/WebScanning";
import Report from "./screens/Report";
import Title from "./component/Title";
import Sidebar1 from "./component/Sidebar1";
import Sidebar2 from "./component/Sidebar2";


const App = () => {
  return (
    <div className='App' >
      <Title />
      <BrowserRouter>
        <div className='center'>
          <div className='bar'>
            <Sidebar1 />
            <Sidebar2 />
          </div>
          <Routes className="dashboard">
            <Route path="/" element={<Resource />} />
            <Route path="/resource_info" element={<ResourceInfo />} />
            <Route path="/webaccess" element={<WebAccess />} />
            <Route path="/anomalydetection" element={<AnomalyDetection />} />
            <Route path="/webscanning" element={<WebScanning />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
