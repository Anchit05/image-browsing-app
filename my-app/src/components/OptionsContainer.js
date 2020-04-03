import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as images from '../imageGetter/images';
import '../styles/components/optionsContainer.css';


class OptionsContainer extends Component {
	constructor(props, context) {
    super(props, context);
    this.myRef = React.createRef();
    this.state = {
    	options: [
									{ value: '', label: '2' },
									{ value: 'grid-three', label: '3' },
									{ value: 'grid-four', label: '4' },
							 ],
    	defaultOption: {}
    }
    this.updateOption = this.updateOption.bind(this);
	}

	componentDidMount(){
		this.setState({
			defaultOption: this.state.options[0]
		});
	}

	updateOption(obj){
		let val = obj.value;
		this.setState({
			defaultOption: obj
		});
		this.props.setOptionVal(val);
	}
	render() {
		return (
			<div className="options-container">
			  <Dropdown className="option-dropdown" 
			  					options={this.state.options} 
			  					onChange={this.updateOption} 
			  					value={this.state.defaultOption} 
			  					placeholder="Select an option" 
			  />
			</div>
		)
	}

}

export default OptionsContainer;