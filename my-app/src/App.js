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
      count: 30
    }
    this.fetchInitalData = this.fetchInitalData.bind(this);
    this.setImagesData   = this.setImagesData.bind(this);
    this.setOption       = this.setOption.bind(this);
    this.fetchImages     = this.fetchImages.bind(this);
  }

  componentDidMount() {
    const { count, start } = this.state;
    this.fetchInitalData(count, start);
  }

  fetchInitalData(count, start){
    let oThis = this;
    images.tryFetchingImages(count, start).then((imagesData) => {
      oThis.setState({
        imagesData: imagesData
      });
    });
  }

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

  setImagesData(searchData, searchText){
    this.setState({
      imagesData: searchData,
      searchText: searchText
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
