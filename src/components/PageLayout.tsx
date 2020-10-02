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
  Switch, Button, ThemeProvider, createMuiTheme
} from '@material-ui/core';
import { Brightness4, Menu as MenuIcon } from '@material-ui/icons';
import './PageLayout.css';

type PageLayoutProps = {
  title: string;
  children: React.ReactNode;
  onSave: {() : void};
  onOpen: {() : void};
  onThemeSwitch: {(isDarkTheme: boolean) : void};
};

export default function PageLayout(props: PageLayoutProps): React.ReactElement {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function toggleTheme() {
    setIsDarkTheme(!isDarkTheme);
    document.body.style.backgroundColor = !isDarkTheme ? "#121212" : "#ffffff";
    props.onThemeSwitch(!isDarkTheme);
  }

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkTheme ? 'dark' : 'light',
        },
      }),
    [isDarkTheme],
  );

  return (
    <ThemeProvider theme={theme}>
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
        <AppBar position="static" style={{ background: '#42ad66' }}>
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
            <IconButton color="inherit" className="toggleThemeButton" onClick={toggleTheme}>
              <Brightness4 />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{ height: '100%' }}>{props.children}</div>
      </div>
    </ThemeProvider>
  );
}
