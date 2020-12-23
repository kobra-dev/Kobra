import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core';
import { Brightness4, FolderOpen, Home, InsertDriveFile, Save } from '@material-ui/icons';
import { useDarkTheme } from './DarkThemeProvider';
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

const useStyles = makeStyles((theme) => ({
  appbarMenu: {
    "& > *": {
      verticalAlign: "middle",
      display: "inline-block"
    },
    "& > *:nth-child(2)": {
      marginRight: "0.75rem"
    },
    "& .MuiButton-label": {
      display: "flex"
    }
  },
  header: {
    flexGrow: 1
  }
}));

export default function PageLayout(props: PageLayoutProps): React.ReactElement {
  const styles = useStyles();
  const { toggleDark } = useDarkTheme();

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
          <div className={styles.appbarMenu}>
            <Typography variant="h6" className={styles.header}>
              Kobra Studio -&nbsp;
            </Typography>
            <EditableTitle value={props.title} onChange={props.onTitleChange} />
            <Button color="inherit" startIcon={<Save />} onClick={props.onSave}>Save</Button>
            <Button color="inherit" startIcon={<InsertDriveFile />} onClick={props.onNew}>New</Button>
            <Button color="inherit" startIcon={<FolderOpen />} onClick={props.onOpen}>Open</Button>
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
