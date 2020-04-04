import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as images from '../imageGetter/images';
import '../styles/components/searchContainer.css';


class SearchContainer extends Component {
	constructor(props, context) {
    super(props, context);
    this.myRef = React.createRef();
    this.state = {
    	searchText: ""
    }
    this.updateSearch = this.updateSearch.bind(this);
	}

	// check for the previous search data
	checkForData(searchText){
    let recentData = JSON.parse(localStorage.getItem("recentImageSearchData") || "[]"),
    		currentData= [];

    for(let i=0; i< recentData.length; i++){
      if ( recentData[i] && Object.keys(recentData[i]).indexOf(searchText) != -1 ){
        currentData = JSON.parse(JSON.stringify(recentData[i][searchText]));
        break;
      }
    }
    return currentData;
  }

	updateSearch(){
		let oThis = this,
				searchText = this.myRef.current.value,
				localData;

		searchText = searchText.trim();

		this.setState({
			searchText: searchText
		});

		localData = this.checkForData(searchText);
		if ( searchText && localData && localData.length ){
			oThis.props.setImagesData(localData, searchText);
		}else{
			if ( searchText ){
				images.tryFetchingSearchImages(searchText).then((imagesData) => {
		      if ( imagesData && imagesData.results && imagesData.results.length ){
		        oThis.props.setImagesData(imagesData.results, searchText);
		      }
		    });
			}else{
				if ( oThis.props.searchedImages ){
					oThis.props.fetchInitalData(30,1);
				}
			}
		}
	}

	render() {
		return (
			<div className="search-container">
				<input className  = "search-input-box ibm" 
			         type       = "text"
			         placeholder= "Search Images"
			         maxLength  = "200"
			         ref={this.myRef}/>
			  <div className="search-button ibm" onClick={this.updateSearch}>
			  	<span className="search-text">Search</span>
			  </div>
			</div>
		)
	}

}

SearchContainer.propTypes = {
  
};

export default SearchContainer;