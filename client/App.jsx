import React from 'react';
import Home from 'components/pages/Home.jsx';
import Backoffice from 'components/pages/Backoffice';
import ExerciseSet from 'components/pages/ExerciseSet.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn/:titleUrl/*" element={<ExerciseSet />} />
      <Route path="/backoffice/*" element={<Backoffice />} />
    </Routes>
  </Router>
);

export default withAuthenticationRequired(App);
