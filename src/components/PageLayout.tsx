import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  Drawer,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Switch, Button
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import './PageLayout.css';

type PageLayoutProps = {
  title: string;
  children: React.ReactNode;
  onSave: {() : void};
  onOpen: {() : void};
};

export default function PageLayout(props: PageLayoutProps): React.ReactElement {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

          <List>
            <ListItem>
              <ListItemText>Dark Mode:</ListItemText>
              <Switch
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
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
          <div className="appbar-menu-container">
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              {props.title}
            </Typography>
            <Button onClick={handleMenu} color="inherit">File</Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {handleClose(); props.onSave();}}>Save</MenuItem>
              <MenuItem onClick={() => {handleClose(); props.onOpen();}}>Open</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ height: '100%' }}>{props.children}</div>
    </div>
  );
}
