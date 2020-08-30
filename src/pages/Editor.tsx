import React from 'react';
import './Editor.css';
import PageLayout from '../components/PageLayout';
import CodeEditor from '../components/CodeEditor';
import { Grid, Paper, Typography } from '@material-ui/core';

export default function Editor(): React.ReactElement {
	return (
		<PageLayout title="Kobra Studio">
			<div className="gridContainer">
				<Paper style={{ gridArea: 'editor' }}>
					<CodeEditor />
				</Paper>
				<Paper style={{ gridArea: 'panel1' }}>
					<Typography>Hi</Typography>
				</Paper>
				<Paper style={{ gridArea: 'panel2' }}>
					<Typography>Hi</Typography>
				</Paper>
			</div>
		</PageLayout>
	);
}
