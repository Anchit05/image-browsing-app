import React, { Component } from 'react';
import './App.css';
import ImagesGallery from './gallery/ImagesGallery';
import Header from './headers/Header';
import * as images from './imageGetter/images';
import SearchContainer from './components/SearchContainer';
import OptionsContainer from './components/OptionsContainer';
import InfiniteScroll from 'react-infinite-scroll-component';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      imagesData: [],
      optionVal: "",
      searchText: "",
      start: 1,
      count: 30,
      searchedImages: false
    }
    this.fetchInitalData = this.fetchInitalData.bind(this);
    this.setImagesData   = this.setImagesData.bind(this);
    this.setOption       = this.setOption.bind(this);
    this.fetchImages     = this.fetchImages.bind(this);
    this.saveRecentData  = this.saveRecentData.bind(this);
  }

  componentDidMount() {
    const { count, start } = this.state;
    this.fetchInitalData(count, start);
  }

  // to check if the searched Data is already there
  checkForData(searchText){
    let recentData = JSON.parse(localStorage.getItem("recentImageSearchData") || "[]"),
        count      = 0;

    for(let i=0; i< recentData.length; i++){
      if ( recentData[i] && Object.keys(recentData[i]).indexOf(searchText) != -1 ){
        count = count + 1;
      }
    }
    if ( count ){
      return false;
    }else{
      return true;
    }
  }

  // saves the recent search data
  saveRecentData(imagesData, searchText){
    let recentData = JSON.parse(localStorage.getItem("recentImageSearchData") || "[]"),
        objData    = {},
        tempArr    = [];

    if ( searchText && this.checkForData(searchText) ){
      imagesData.map(function(obj, index){
        let tempObj = {};
        if ( obj.urls && obj.urls.small ){
          tempObj.urls = JSON.parse(JSON.stringify(obj.urls));
          tempArr.push(tempObj);
        }
      });
      objData[searchText] = JSON.parse(JSON.stringify(tempArr));
      recentData.push(objData);
      localStorage.setItem("recentImageSearchData", JSON.stringify( recentData ));
    }
  }

  //fetches data, initally when page loads
  fetchInitalData(count, start){
    let oThis = this;
    console.log("fetch inital: ", count, start);
    images.tryFetchingImages(count, start).then((imagesData) => {
      oThis.setState({
        imagesData: imagesData,
        searchedImages: false
      });
    });
  }

  // fetch images during infinte scroll
  fetchImages(){
    let oThis = this;

    const { count, start } = this.state;
    this.setState({ start: this.state.start + count });

    images.tryFetchingMoreImages(this.state.searchText, count, start).then((imagesData) => {
      if ( this.state.searchText ){
        oThis.setState({
          imagesData: this.state.imagesData.concat(imagesData.results)
        });
      }else{
        oThis.setState({
          imagesData: this.state.imagesData.concat(imagesData)
        });
      }
    });
  }

  // function to set searched data
  setImagesData(searchData, searchText){
    this.setState({
      imagesData: searchData,
      searchText: searchText,
      searchedImages: true
    });
    this.saveRecentData(searchData, searchText);
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
              searchedImages = {this.state.searchedImages}
              fetchInitalData = {this.fetchInitalData}
            />
          </div>
          <div className="main-option-container">
            <OptionsContainer 
              setOptionVal = {this.setOption}
            />
          </div>
          <InfiniteScroll
            dataLength={this.state.imagesData.length}
            next={this.fetchImages}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <ImagesGallery
              imagesData = {this.state.imagesData}
              optionVal  = {this.state.optionVal}
            />
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default App;
