import { makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

interface EditableTitleProps {
    value: string,
    onChange: {(newValue: string): void}
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
    }
}));

export default function EditableTitle(props: EditableTitleProps) {
    const styles = useStyles();

    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(props.value);

    function textFieldBlur() {
        setIsActive(false);
        if(value.replaceAll(' ', '').length === 0) {
            setValue(props.value);
            props.onChange(props.value);
        }
        else {
            props.onChange(value);
        }
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value]);

    return isActive ? (
        <Typography color="inherit" className={styles.editableTitle}>
            <TextField value={value} onChange={(event) => {setValue(event.target.value);}} size="small" color="secondary" inputProps={{ disableUnderline: true }} autoFocus onBlur={textFieldBlur} />
        </Typography>
    ) : (
        <Typography className={styles.editableTitle} variant="h6" onClick={() => {setIsActive(true);}}>{value}</Typography>
    );
}