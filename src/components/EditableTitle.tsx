import { makeStyles, TextField, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

interface EditableTitleProps {
    value: string;
    maxLength?: number;
    onChange: { (newValue: string): void };
}

const useStyles = makeStyles((theme) => ({
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
    }
}));

export default function EditableTitle(props: EditableTitleProps) {
    const styles = useStyles();

    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(props.value);

    function textFieldBlur() {
        setIsActive(false);
        if (
            value.replaceAll(" ", "").length === 0 ||
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

    return isActive ? (
        <Typography color="inherit" className={styles.editableTitle}>
            <TextField
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                size="small"
                color="secondary"
                inputProps={{ disableUnderline: true }}
                autoFocus
                onBlur={textFieldBlur}
            />
        </Typography>
    ) : (
        <div className={styles.editableTitle}>
            <Typography
                className={styles.displayTitle}
                variant="h6"
                onClick={() => {
                    setIsActive(true);
                }}
            >
                <Edit fontSize="small" />
                {value}
            </Typography>
        </div>
    );
}
