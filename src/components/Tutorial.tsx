import React from "react";
import { ListItem, Divider, Typography } from "@material-ui/core";

interface TutorialProps {
    moduleNum: string;
    moduleTitle: string;
    link: string;
}

export function Tutorial(props: TutorialProps) {
    return (
        <>
            <ListItem button>
                <a
                    href={props.link}
                    style={{
                        textDecoration: "none",
                        color: "black"
                    }}
                >
                    <Typography variant="body1">
                        {"\xa0\xa0\xa0\xa0" +
                            props.moduleNum +
                            "\xa0\xa0\xa0\xa0" +
                            props.moduleTitle}
                    </Typography>
                </a>
            </ListItem>
            <Divider />
        </>
    );
}

interface TutorialModuleProps {
    moduleNum: string;
    moduleTitle: string;
}

export function TutorialModule(props: TutorialModuleProps) {
    return (
        <>
            <ListItem button>
                <Typography variant="h6">
                    {props.moduleNum + "\xa0\xa0\xa0\xa0" + props.moduleTitle}
                </Typography>
            </ListItem>
            <Divider />
        </>
    );
}
