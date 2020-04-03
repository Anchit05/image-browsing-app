import React, { Component } from 'react';
import './App.css';
import ImagesGallery from './gallery/ImagesGallery';
import Header from './headers/Header';
import * as images from './imageGetter/images';
import SearchContainer from './components/SearchContainer';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      imagesData: []
    }
    this.fetchInitalData = this.fetchInitalData.bind(this);
    this.setImagesData   = this.setImagesData.bind(this);
  }

  componentDidMount() {
    // this.fetchInitalData();
  }

  fetchInitalData(){
    let oThis = this;
    images.tryFetchingImages().then((imagesData) => {
      oThis.setState({
        imagesData: imagesData
      });
    });
  }

  setImagesData(searchData){
    this.setState({
      imagesData: searchData
    });
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <div className="main-images-container">
          <div className="main-search-container">
            <SearchContainer 
              setImagesData = {this.setImagesData}
            />
          </div>
          <ImagesGallery
            imagesData = {this.state.imagesData}
          />
          <button className="button" onClick={images.tryFetchingImages}>Get Results</button>
        </div>
      </div>
    );
  }
}

// function App() {
//   let oThis = this;
//   useEffect(() => {
//     this.fetchInitalData();
//   }, []);

//   fetchInitalData(){
//     console.log("inital Data");
//   }

  
// }

export default App;
