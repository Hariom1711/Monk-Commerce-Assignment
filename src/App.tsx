import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import Home from './Home/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;