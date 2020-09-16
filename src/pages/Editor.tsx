import React from 'react';
import './Editor.css';
import PageLayout from '../components/PageLayout';
import CodeEditor from '../components/CodeEditor';
import { Paper, Typography } from '@material-ui/core';
import { testBuild } from '../components/CodeEditor';

export default function Editor(): React.ReactElement {
	return (
		<PageLayout title="Kobra Studio">
			<div className="gridContainer">
				<Paper style={{ gridArea: 'editor' }}>
					<CodeEditor />
				</Paper>
				<Paper style={{ gridArea: 'panel1' }}>
					<button onClick={testBuild}>Test</button>
				</Paper>
				<Paper style={{ gridArea: 'panel2' }}>
					<Typography>Hi</Typography>
				</Paper>
			</div>
		</PageLayout>
	);
}
