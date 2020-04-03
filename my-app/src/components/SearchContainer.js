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

	updateSearch(){
		let oThis = this,
				searchText = this.myRef.current.value;

		searchText = searchText.trim();

		this.setState({
			searchText: searchText
		});
		console.log("search text: ", searchText);

		if ( searchText ){
			images.tryFetchingSearchImages(searchText).then((imagesData) => {
	      if ( imagesData && imagesData.results && imagesData.results.length ){
	        oThis.props.setImagesData(imagesData.results, searchText);
	      }
	    });
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