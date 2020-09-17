import React from 'react';
import './Editor.css';
import PageLayout from '../components/PageLayout';
import CodeEditor from '../components/CodeEditor';
import Runner from '../components/Runner';
import { Paper } from '@material-ui/core';
import { testBuild, componentDidMount } from '../components/CodeEditor';

export default function Editor(): React.ReactElement {
	return (
		<PageLayout title="Kobra Studio">
			<div className="gridContainer">
				<div className="toolsColumn">
					<Paper style={{ gridArea: 'panel1' }}>
						<button onClick={testBuild}>Test</button><button onClick={componentDidMount}>Set theme</button>
					</Paper>
					<Runner />
				</div>
				<Paper style={{ gridArea: 'editor' }} className="editorColumn">
					<CodeEditor />
				</Paper>
			</div>
		</PageLayout>
	);
}
