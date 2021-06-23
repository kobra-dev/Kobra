// Modeled after Chakra UI's Stack component

import { makeStyles } from "@material-ui/core"
import React from "react";

interface StackStylesProps {
    direction?: "row" | "column",
    spacing?: string | number
}

interface StackProps extends StackStylesProps {
    children: React.ReactNode,
    className?: string,
    [key: string]: any
}

const useStyles = makeStyles((theme) => ({
    stack: (props: StackStylesProps) => ({
        display: "flex",
        flexDirection: props.direction ?? "column",
        "& > *:not(:last-child)": {
            [props.direction === "row" ? "marginRight" : "marginBottom"]: props.spacing ?? "1rem"
        }
    })
}));

export default function Stack(props: StackProps) {
    const { children, className, direction, spacing, ...containerProps } = props;
    const styles = useStyles({ direction, spacing });

    return (
        <div className={styles.stack + (className ? " " + className : "")} {...containerProps}>
            {children}
        </div>
    )
}