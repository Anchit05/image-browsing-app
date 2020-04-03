import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../styles/gallery/imagesGallery.css';


class ImagesGallery extends Component {
	constructor(props, context) {
    super(props, context);

    // this.state = {
    // 	imagesData: this.props.imageData
    // }
	}

	render() {
		let imagesArr = this.props.imagesData;
		console.log("imagesArr: ", imagesArr);
		return (
			<div className="main-images-list-container">
				{ imagesArr && imagesArr.length > 0 && imagesArr.map( (imagesObj, index) =>(
						<div className="common-image-container" key={index}>
							<img className={"common-image image-" + index} src={imagesObj.urls.small}/>
						</div>
					))
				}
			</div>
		)
	}

}

ImagesGallery.propTypes = {
  imagesData: PropTypes.array,
};

export default ImagesGallery;