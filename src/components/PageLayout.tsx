import React from 'react';
import { IonPage } from '@ionic/react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

type PageLayoutProps = {
	title: string;
	children: React.ReactNode;
};

export default function PageLayout({
	title,
	children
}: PageLayoutProps): React.ReactElement {
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">{title}</Typography>
				</Toolbar>
			</AppBar>
			<div style={{ height: '100%' }}>{children}</div>
		</div>
	);
}
