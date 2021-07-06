import { InputBase, makeStyles } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";

export interface ConsoleLine {
    text: string;
    className?: string;
}

interface NewConsoleProps {
    data: ConsoleLine[];
    canType: boolean;
    onSubmit(text: string): void;
    welcomeMessage?: string;
    promptLabel?: string;
}

const MONOSPACE_FONTS =
    "Menlo,Andale Mono,DejaVu Sans Mono,Droid Sans Mono,Bitstream Vera Sans Mono,Courier New,Courier,monospace";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor:
            theme.palette.type === "dark" ? "rgb(30, 30, 30)" : "#efefef",
        fontFamily: MONOSPACE_FONTS,
        fontSize: "0.85em",
        padding: "0.5em",
        overflow: "auto",
        height: "100%",
        "& input": {
            fontFamily: MONOSPACE_FONTS,
            fontSize: "0.85em",
            padding: "0.5em"
        }
    },
    input: {
        border: "1px solid gray",
        flex: 1
    },
    inputWrapper: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        "& > *:first-child": {
            marginLeft: "0.5rem"
        },
        margin: "0.5rem 0"
    },
    message: {
        color: "#999",
        padding: "0.1em",
        whiteSpace: "normal"
    }
}));

export default function NewConsole(props: NewConsoleProps) {
    const styles = useStyles();
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>();
    const rootRef = useRef<HTMLDivElement>();

    function scrollToBottom() {
        rootRef.current.scrollTo({ top: rootRef.current.scrollHeight });
    }

    useEffect(() => {
        if (!props.canType) {
            setValue("");
        } else {
            (inputRef.current?.children[0] as HTMLElement | undefined)?.focus();
            scrollToBottom();
        }
    }, [props.canType]);

    useEffect(scrollToBottom, [props.data]);

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            props.onSubmit(value);
            setValue("");
        }
    }

    return (
        <div ref={rootRef} className={styles.root}>
            {props.welcomeMessage && (
                <div className={styles.message}>{props.welcomeMessage}</div>
            )}
            {props.data.map((line, index) => (
                <div
                    key={index}
                    className={
                        styles.message +
                        (line.className
                            ? " react-console-message-" + line.className
                            : "")
                    }
                >
                    {line.text}
                </div>
            ))}
            {props.canType && (
                <div className={styles.inputWrapper}>
                    {props.promptLabel}
                    <InputBase
                        ref={inputRef}
                        className={styles.input}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                </div>
            )}
        </div>
    );
}
