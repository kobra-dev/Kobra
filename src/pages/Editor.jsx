import React from 'react';
import './Editor.css';
import PageLayout from '../components/PageLayout';
import CodeEditor from '../components/CodeEditor';
import Runner from '../components/Runner';
import { Paper, Button } from '@material-ui/core';
import { getCode, componentDidMount } from '../components/CodeEditor';

export default function Editor() {
	return (
		<PageLayout title="Kobra Studio">
			<div className="gridContainer">
				<div className="toolsColumn">
					<Paper style={{ gridArea: 'panel1' }}>
						<Button onClick={componentDidMount}>Set theme</Button>
					</Paper>
					<Runner getCode={() => getCode()} />
				</div>
				<Paper style={{ gridArea: 'editor' }} className="editorColumn">
					<CodeEditor />
				</Paper>
			</div>
		</PageLayout>
	);
}
