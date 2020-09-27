import React from 'react';
import './Editor.css';
import PageLayout from '../components/PageLayout';
import CodeEditor from '../components/CodeEditor';
import Runner from '../components/Runner';
import DataView from '../components/DataView';
import { Paper } from '@material-ui/core';
import { getCode } from '../components/CodeEditor';

export default function Editor(): React.ReactElement {
	return (
		<PageLayout title="Kobra Studio">
			<div className="gridContainer">
				<div className="toolsColumn">
					<DataView />
					<Runner getCode={ () => getCode() } />
				</div>
				<Paper style={{ gridArea: 'editor' }} className="editorColumn">
					<CodeEditor />
				</Paper>
			</div>
		</PageLayout>
	);
}
