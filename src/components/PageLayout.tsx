import { AppBar, Container, IconButton, Slide, Toolbar, Typography, useScrollTrigger } from "@material-ui/core";
import { Brightness4 } from "@material-ui/icons";
import React from "react";
import { useDarkTheme } from "./DarkThemeProvider";

function HideOnScroll(props: { children: React.ReactElement }) {
    const trigger = useScrollTrigger({ target: typeof window !== "undefined" ? window : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {props.children}
        </Slide>
    )
}

export default function PageLayout(props: { children: React.ReactFragment }) {
    const { toggleDark } = useDarkTheme();
    return (
        <>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6">Kobra</Typography>
                        <IconButton color="inherit" onClick={toggleDark}>
                            <Brightness4/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar/>
            <Container>
                {props.children}
            </Container>
        </>
    );
}