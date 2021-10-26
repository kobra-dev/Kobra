import {
    CircularProgress,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import { useEffect } from "react";
import { useIsUsernameAvailableLazyQuery } from "src/generated/queries";
import { MAX_USERNAME_LEN } from "src/utils/constants";
import { errorTextStyles, successTextStyles } from "./Login";

export enum UsernameTextFieldStatus {
    Success,
    Loading,
    Error
}

interface UsernameTextFieldProps {
    value: string;
    onChange(val: string): void;
    onStatusChange(val: UsernameTextFieldStatus): void;
}

const useStyles = makeStyles((theme) => ({
    errorText: errorTextStyles(theme),
    successText: successTextStyles
}));

export default function UsernameTextField(props: UsernameTextFieldProps) {
    const styles = useStyles();
    const [getIsUsernameAvailable, { loading, data }] =
        useIsUsernameAvailableLazyQuery({
            variables: {
                name: props.value
            }
        });

    useEffect(() => {
        if (props.value.length > 0) {
            getIsUsernameAvailable();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    useEffect(() => {
        props.onStatusChange(
            props.value.length > MAX_USERNAME_LEN
                ? UsernameTextFieldStatus.Error
                : loading
                ? UsernameTextFieldStatus.Loading
                : data?.isUsernameAvailable
                ? UsernameTextFieldStatus.Success
                : UsernameTextFieldStatus.Error
        );
    }, [props, loading, data]);

    return (
        <>
            <TextField
                variant="outlined"
                label="Username"
                required
                value={props.value}
                onChange={(e) => {
                    props.onChange(e.target.value);
                }}
            />
            {props.value.length > MAX_USERNAME_LEN ? (
                <Typography className={styles.errorText}>
                    Username must be less than {MAX_USERNAME_LEN} characters
                </Typography>
            ) : loading ? (
                <CircularProgress size="24px" />
            ) : data && props.value.length > 0 ? (
                data.isUsernameAvailable ? (
                    <Typography className={styles.successText}>
                        This username is available.
                    </Typography>
                ) : (
                    <Typography className={styles.errorText}>
                        Sorry, this username isn&apos;t available.
                    </Typography>
                )
            ) : undefined}
        </>
    );
}
