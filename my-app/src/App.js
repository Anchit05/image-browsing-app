import React from 'react';
import './App.css';
import ImagesGallery from './gallery/ImagesGallery';
import Header from './headers/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <ImagesGallery
        imageData = {[]}
      />
    </div>
  );
}

export default App;
