import React, {Component} from 'react';
import PropTypes from 'prop-types';


class ImagesGallery extends Component {
	constructor(props, context) {
    super(props, context);

    this.state = {

    }
	}

	render() {
		return (
			<div>
				Images Gallery
			</div>
		)
	}

}

ImagesGallery.propTypes = {
  imageData: PropTypes.array,
};

export default ImagesGallery;