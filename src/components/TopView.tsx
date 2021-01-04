import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import DataView from './DataView';

// full credit to https://medium.com/javascript-in-plain-english/material-ui-tabs-ee580daa62de for tabpanel snippet
function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

export function TopView() {
  const [value, setValue] = useState(0);
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Data Visualization" />
        <Tab label="File Upload" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DataView />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <p>file upload component</p>
      </TabPanel>
    </>
  );
}
