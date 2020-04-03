import React, { Component } from 'react';
import './App.css';
import ImagesGallery from './gallery/ImagesGallery';
import Header from './headers/Header';
import * as images from './imageGetter/images';
import SearchContainer from './components/SearchContainer';
import OptionsContainer from './components/OptionsContainer';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      imagesData: [],
      optionVal: ""
    }
    this.fetchInitalData = this.fetchInitalData.bind(this);
    this.setImagesData   = this.setImagesData.bind(this);
    this.setOption       = this.setOption.bind(this);
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

  setOption(optionVal){
    this.setState({
      optionVal: optionVal
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
          <div className="main-option-container">
            <OptionsContainer 
              setOptionVal = {this.setOption}
            />
          </div>
          <ImagesGallery
            imagesData = {this.state.imagesData}
            optionVal  = {this.state.optionVal}
          />
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
