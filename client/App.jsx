import React from 'react';
import Home from 'components/pages/Home.jsx';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

export default withAuthenticationRequired(App);
