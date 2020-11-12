import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';
import { Brightness4, FolderOpen, Home, InsertDriveFile, Save } from '@material-ui/icons';
import { useDarkTheme } from './DarkThemeProvider';
import './PageLayout.css';
import UserStatus from './UserStatus';
import EditableTitle from './EditableTitle';

type PageLayoutProps = {
  title: string;
  children: React.ReactNode;
  onSave: {() : void};
  onNew: {() : void};
  onOpen: {() : void};
  onHome: {() : void};
  onTitleChange: {(newVal: string): void};
};

export default function PageLayout(props: PageLayoutProps): React.ReactElement {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { toggleDark } = useDarkTheme();

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" style={{ background: '#42ad66' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => { props.onHome(); }}
          >
            <Home />
          </IconButton>
          <div className="appbar-menu-container">
            <Typography variant="h6" className="kobra-header">
              Kobra Studio -&nbsp;
              <EditableTitle value={props.title} onChange={props.onTitleChange} />
            </Typography>
            <Button color="inherit" startIcon={<Save />} onClick={props.onSave}>Save</Button>
            <Button color="inherit" startIcon={<InsertDriveFile />} onClick={props.onNew}>New</Button>
            <Button color="inherit" startIcon={<FolderOpen />} onClick={props.onOpen}>Open</Button>
            {/*<Button onClick={handleMenu} color="inherit">File</Button>
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
            </Menu>*/}
          </div>
          <UserStatus />
          <IconButton color="inherit" onClick={toggleDark}>
            <Brightness4 />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ height: '100%' }}>{props.children}</div>
    </div>
  );
}
