import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    // switched to any to solve issue – take second look at this
    cardGrid: (height100: any) => ({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(25rem, 1fr))",
        gap: "1rem",
        ...(height100 && {
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
    const styles = useStyles(props.h100 ?? true);

    return <div className={styles.cardGrid}>{props.children}</div>;
}
