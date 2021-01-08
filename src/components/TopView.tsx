import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DataView from './DataView';
import { makeStyles, Paper } from '@material-ui/core';
import { TabContext } from '@material-ui/lab';

interface TabPanelsProps {
  value: number,
  className?: string,
  children: React.ReactNodeArray
}


const tabPanelsUseStyles = makeStyles((theme) => ({
  hiddenTab: {
    display: "none !important"
  }
}));

function TabPanels(props: TabPanelsProps) {
  const styles = tabPanelsUseStyles();
  return <div className={props.className}>
    {props.children.map((child, index) => (
      <div key={index} className={index === props.value ? "" : styles.hiddenTab}>
        {child}
      </div>
    ))}
  </div>;
}

const useStyles = makeStyles((theme) => ({
  topView: {
    display: "flex",
    flexDirection: "column"
  },
  paper: {
    flex: 1
  },
  tabPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    "& > *": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      "& > *": {
        flex: 1
      }
    }
  }
}));

export function TopView() {
  const [value, setValue] = useState(0);
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };
  const styles = useStyles();

  return (
    <div className={styles.topView}>
      <Paper className={styles.topView + " " + styles.paper}>
        <TabContext value={String(value)}>
          <Tabs textColor="primary" value={value} onChange={handleChange}>
            <Tab label="Data Visualization" />
            <Tab label="File Upload" />
          </Tabs>
          <TabPanels className={styles.tabPanel} value={value}>
            <DataView/>
            <Paper variant="outlined">
              <p>File upload component</p>
            </Paper>
          </TabPanels>
        </TabContext>
      </Paper>
    </div>
  );
}
