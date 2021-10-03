import {
    Checkbox,
    FormControlLabel,
    makeStyles,
    Typography
} from "@material-ui/core";
import { successTextStyles } from "./Login";

interface FinishSignupInputsProps {
    signUpUserTesting: boolean;
    setSignUpUserTesting: (
        signUpUserTesting: boolean
    ) => void;
    signUpEmailUpdates: boolean;
    setSignUpEmailUpdates: (
        signUpEmailUpdates: boolean
    ) => void;
}

const useStyles = makeStyles((theme) => ({
    successText: successTextStyles
}));

export default function FinishSignupInputs(
    props: FinishSignupInputsProps
) {
    const styles = useStyles();

    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={props.signUpUserTesting}
                        onChange={(e) =>
                            props.setSignUpUserTesting(
                                e.target.checked
                            )
                        }
                    />
                }
                label="I'd like to help out Kobra by participating in a short user interview"
            />
            {props.signUpUserTesting && (
                <Typography className={styles.successText}>
                    Thanks so much! Once you sign up,
                    you&apos;ll get an email with more
                    details.
                </Typography>
            )}
            <FormControlLabel
                control={
                    <Checkbox
                        checked={props.signUpEmailUpdates}
                        onChange={(e) =>
                            props.setSignUpEmailUpdates(
                                e.target.checked
                            )
                        }
                    />
                }
                label="I'd like to receive infrequent update emails from Kobra (I can unsubscribe any time)"
            />
        </>
    );
}
