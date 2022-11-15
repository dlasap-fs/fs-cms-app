import React from "react";
import "./App.css";
import { CMSForm } from "./components/CMSForm";
import { PostForm } from "./components/PostForm";
import { CMSGrid } from "./components/CMSGrid";

import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Router>
      <header className="App-header">
        <h1> Contact Management System </h1>
        <div className="nav-link-bar">
          <div className="nav-link-button">
            <Link to="/" className="nav-link">
              Form
            </Link>
          </div>
          <div className="nav-link-button">
            <Link to="/records" className="nav-link">
              Records
            </Link>
          </div>
        </div>
        {/* <CMSAppBar/> */}
      </header>
      <div className="App">
        <div className="Container">
          <Routes>
            <Route path="/" element={<CMSForm />} />
            <Route path="/submitted" element={<PostForm />} />
            <Route path="/records" element={<CMSGrid />} />
            <Route
              path="*"
              element={
                <h1 style={{ fontSize: "30px" }}>
                  ERROR 404: PAGE NOT FOUND!
                  <br />
                  <p>
                    <Link to="/" style={{ padding: 5 }}>
                      HOME
                    </Link>
                  </p>
                </h1>
              }
            />
          </Routes>
        </div>
      </div>
      <footer className="App-footer">
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
