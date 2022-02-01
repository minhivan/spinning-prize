import CssBaseline from '@mui/material/CssBaseline';

import {
  Routes,
  Route
} from "react-router-dom";
import Snowfall from 'react-snowfall';

import Home from './components/Home';
import Play from './components/Play';

function App() {
  return (
    <>
      <CssBaseline />
      <Snowfall />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="play" element={<Play />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
