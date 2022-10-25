import React from 'react';
import './App.css';
import { CMSForm } from './components/CMSForm'
import { PostForm } from './components/PostForm';
import { CMSGrid } from './components/CMSGrid';

import {
 Routes, Route, Link, BrowserRouter as Router
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <div className='Background'>
      <header className="App-header">
      <h1> Contact Management System </h1>
      <div>
        <Link to="/" className='App-Bar'>
              Form
        </Link>
        <Link to="/records" className='App-Bar'>
              Records
        </Link>
      </div>
    {/* <CMSAppBar/> */}
      </header>
      <Routes>
        <Route path="/" element={
        <div className='CMS-Form'><CMSForm />   
        </div>} /> 
        <Route path="/submitted" element={<PostForm />} /> 
        <Route path="/records" element={<CMSGrid />} />
        <Route path="*" element={<h1 style={{fontSize: "30px"}}>
            ERROR 404: PAGE NOT FOUND!
            <br/>
            <p>
            <Link to="/" style={{ padding: 5 }}>
              HOME
          </Link>
            </p>
          </h1>} />
    </Routes>
      </div>
    </div>
    </Router>
  );
 }

export default App;
