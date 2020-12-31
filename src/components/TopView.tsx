import React from "react";
import {
    Tab,
    Tabs,
    TabList,
    TabPanel
} from 'react-tabs';
import DataView from "./DataView";
import 'react-tabs/style/react-tabs.css';


export function TopView() {
    return ( 
        <Tabs>
            <TabList>
                <Tab>Data Visualization </Tab> 
                <Tab>File Uploads </Tab> 
            </TabList >

            <TabPanel style={{backgroundColor:"black",height:"100%"}}>
                <DataView />
            </TabPanel> 

            <TabPanel style={{height:"100%"}}>

            </TabPanel> 
        </Tabs>
    )
}