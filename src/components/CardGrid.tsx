import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
    cardGrid: (props: { height100: boolean }) => ({
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(25rem, 1fr))",
        gap: "1rem",
        ...(props.height100 && {
            "& > * > *": {
                height: "100%"
            }
        })
    })
}));

export default function CardGrid(props: {
    children: React.ReactNode;
    h100?: boolean;
}) {
    const styles = useStyles({
        height100: props.h100 ?? true
    });

    return (
        <div className={styles.cardGrid}>
            {props.children}
        </div>
    );
}
