import {
    InputBase,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

interface EditableTitleProps {
    value: string;
    placeholder?: string;
    maxLength?: number;
    onChange: { (newValue: string): void };
    size?: "lg" | "md" | "sm";
    className?: string;
}

const useStyles = makeStyles(() => ({
    editableTitle: {
        display: "inline-block",
        "&:hover": {
            cursor: "pointer"
        },
        "& .MuiInput-root": {
            color: "inherit",
            "&::before": {
                borderBottomColor: "inherit !important"
            }
        }
    },
    displayTitle: {
        display: "flex",
        alignItems: "center",
        "& > *": {
            marginRight: "0.25rem"
        }
    },
    h6Input: {
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: "0.0075em"
    },
    h5Input: {
        fontSize: "1.5rem",
        fontWeight: 400,
        lineHeight: 1.334,
        letterSpacing: "0em"
    },
    h2Input: {
        fontSize: "3.75rem",
        fontWeight: 300,
        lineHeight: 1.2,
        letterSpacing: "-0.00833em"
    }
}));

const isTextEmpty = (value: string) => value.replaceAll(" ", "").length === 0;

export default function EditableTitle(props: EditableTitleProps) {
    const styles = useStyles();

    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(props.value);

    function textFieldBlur() {
        setIsActive(false);
        if (
            isTextEmpty(value) ||
            (props.maxLength && value.length > props.maxLength)
        ) {
            setValue(props.value);
            props.onChange(props.value);
        } else {
            props.onChange(value);
        }
    }

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const className =
        styles.editableTitle + (props.className ? " " + props.className : "");

    return isActive ? (
        <Typography color="inherit" className={className}>
            <InputBase
                className={
                    props.size === "sm"
                        ? styles.h6Input
                        : props.size === "md"
                        ? styles.h5Input
                        : props.size === "lg"
                        ? styles.h2Input
                        : styles.h6Input
                }
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                autoFocus
                onBlur={textFieldBlur}
                fullWidth
            />
        </Typography>
    ) : (
        <div className={className}>
            <Typography
                className={styles.displayTitle}
                variant={
                    props.size === "sm"
                        ? "h6"
                        : props.size === "md"
                        ? "h5"
                        : props.size === "lg"
                        ? "h2"
                        : "h6"
                }
                onClick={() => {
                    setIsActive(true);
                }}
            >
                <Edit fontSize="small" />
                {props.placeholder && isTextEmpty(value)
                    ? props.placeholder
                    : value}
            </Typography>
        </div>
    );
}
