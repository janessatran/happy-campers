import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Parks from "../components/Parks";

export default (
  <Router>
    <Routes>
      <Route path="/" exact component={Home} />
      <Route path="/parks" element={<Parks />} />
    </Routes>
  </Router>
);
