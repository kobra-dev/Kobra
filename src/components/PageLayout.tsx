import {
    AppBar,
    Button,
    Container,
    IconButton,
    makeStyles,
    Slide,
    Toolbar,
    Typography,
    useScrollTrigger
} from "@material-ui/core";
import { Brightness4 } from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useDarkTheme } from "./DarkThemeProvider";
import Stack from "./Stack";
import UserStatus from "./UserStatus";

function HideOnScroll(props: { children: React.ReactElement }) {
    const trigger = useScrollTrigger({
        target: typeof window !== "undefined" ? window : undefined
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {props.children}
        </Slide>
    );
}

const useStyles = makeStyles((theme) => ({
    toolbar: {
        "& .Mui-disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            color: "inherit"
        },
        "& > div": {
            alignItems: "center"
        }
    },
    childrenContainer: {
        marginTop: "1rem"
    },
    header: {
        marginRight: "0.75rem",
        height: "1.25rem"
    }
}));

const NAVBAR_LINKS = [
    {
        url: "/",
        text: "Home"
    },
    {
        url: "/explore",
        text: "Explore"
    },
    {
        url: "/editor",
        text: "Studio"
    }
];

export default function PageLayout(props: { children: React.ReactFragment }) {
    const { toggleDark } = useDarkTheme();
    const styles = useStyles();
    const router = useRouter();

    return (
        <>
            <HideOnScroll>
                <AppBar>
                    <Toolbar className={styles.toolbar}>
                        <Stack direction="row" spacing="0.25rem">
                            <img
                                src="/assets/white logo.svg"
                                className={styles.header}
                                alt="logo"
                            />
                            {NAVBAR_LINKS.map((link) => (
                                <Button
                                    key={link.url}
                                    color="inherit"
                                    onClick={() => router.push(link.url)}
                                    disabled={router.pathname === link.url}
                                >
                                    {link.text}
                                </Button>
                            ))}
                        </Stack>
                        <UserStatus />
                        <IconButton color="inherit" onClick={toggleDark}>
                            <Brightness4 />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            <Container className={styles.childrenContainer}>
                {props.children}
            </Container>
        </>
    );
}
