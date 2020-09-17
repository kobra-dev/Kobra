import React from 'react';

class ModelProgress extends React.Component {
	render() {
		return (
			<div
				style={{
					border: '8px solid #3f51b5',
					borderRadius: '15px',
					height: '50px',
					padding: '3px'
				}}
			>
				<div style={{ textAlign: 'center' }}>
					<label>Epoch: {this.props.iterations}</label>
					<label>Accuracy: {this.props.accuracy}</label>
					<label>Loss: {this.props.loss}</label>
				</div>
				<label>Progress: {this.props.progress}</label>
				<progress
					style={{ backgroundColor: '#FF0000', width: '90%', float: 'right' }}
					value="100"
					max="100"
				>
					{this.props.progress}
				</progress>
			</div>
		);
	}
}

export function appendProgressUniLinReg(progress, slope, intercept, mse, r2) {
	var newElem = document.createElement('div');
	newElem.innerHTML = '';
	return;
}

export function appendProgressMultiLinReg(progress, mse, r2) {
	var newElem = document.createElement('div');
	newElem.innerHTML = '';
	return;
}

export default ModelProgress;
