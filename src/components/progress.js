import React from 'react';

class modelProgress extends React.Component {
	render() {
		return (
			<div>
				<h1>Epoch: {this.props.iterations}</h1>
				<h3>Accuracy: {this.props.accuracy}</h3>
				<h3>Loss: {this.props.loss}</h3>
				<progress value="80" max="100">
					80%
				</progress>
			</div>
		);
	}
}

export default modelProgress;
