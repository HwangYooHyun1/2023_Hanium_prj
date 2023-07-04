import { BrowserRouter, Route, Routes } from "react-router-dom";
import Resource from "./screens/Resource";
import WebAccess from "./screens/WebAccess";
import AnomalyDetection from "./screens/AnomalyDetection";
import WebScanning from "./screens/WebScanning";
import Report from "./screens/Report";

function App() {
  return (
    <div className='App'>
      <h1>hello</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Resource />}/>
          <Route path="/webaccess" element={<WebAccess />}/>
          <Route path="/anomalydetection" element={<AnomalyDetection />}/>
          <Route path="/webscanning" element={<WebScanning />}/>
          <Route path="/report" element={<Report />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
