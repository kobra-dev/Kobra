import React, { useState } from 'react';
import {
	AppBar,
	IconButton,
	Drawer,
	Toolbar,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemText
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import blocklyLogo from '../assets/blockly/logo_built_on_dark.svg';

type PageLayoutProps = {
	title: string,
	children: React.ReactNode
};

export default function PageLayout({
	title,
	children
}: PageLayoutProps): React.ReactElement {
	const [drawerOpen, setDrawerOpen] = useState(false);
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Drawer
				anchor="left"
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			>
				<div style={{ width: 275 }}>
					<Typography>Kobra Studio</Typography>
					<Divider />
					<List>
						<ListItem button>
							<ListItemText>Studio</ListItemText>
						</ListItem>
					</List>
				</div>
			</Drawer>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={() => setDrawerOpen(true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						{title}
					</Typography>
					<img src={blocklyLogo} style={{ height: 50 }} alt="Blockly logo" />
				</Toolbar>
			</AppBar>
			<div style={{ height: '100%' }}>{children}</div>
		</div>
	);
}
