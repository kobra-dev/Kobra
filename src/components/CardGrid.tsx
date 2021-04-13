import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(25rem, 1fr))",
        gap: "1rem",
        "& > * > *": {
            height: "100%"
        }
    }
}));

export default function CardGrid(props: { children: React.ReactNode }) {
    const styles = useStyles();

    return <div className={styles.cardGrid}>{props.children}</div>;
}
