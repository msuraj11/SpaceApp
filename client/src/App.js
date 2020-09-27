import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
//import RenderImages from './components/RenderImages';

const App = () => (
    <div className='container'>
      <h1 className='text-center'>
        <i className="fas fa-meteor"></i> Space App
      </h1>
      <FileUpload />
    </div>
);

export default App;
