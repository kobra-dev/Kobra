// Modeled after Chakra UI's Stack component

import { makeStyles } from "@material-ui/core"
import React from "react";

interface StackStylesProps {
    direction?: "row" | "column",
    spacing?: string | number
}

interface StackProps extends StackStylesProps {
    children: React.ReactNodeArray
}

const useStyles = makeStyles((theme) => ({
    stack: (props: StackStylesProps) => ({
        display: "flex",
        flexDirection: props.direction ?? "column",
        "& > *:not(:last-child)": {
            [props.direction === "column" ? "marginBottom" : "marginRight"]: props.spacing ?? "1rem"
        }
    })
}));

export default function Stack(props: StackProps) {
    const { children, ...styleProps } = props;
    const styles = useStyles(styleProps);

    return (
        <div className={styles.stack}>
            {children}
        </div>
    )
}