import {
    Button,
    makeStyles,
    Typography
} from "@material-ui/core";
import { useLogin } from "./auth/LoginDialogProvider";
import Stack from "./Stack";

const useStyles = makeStyles(() => ({
    root: {
        padding: "1rem",
        "& > *": {
            textAlign: "center"
        }
    }
}));

export default function ModelsLoggedOut() {
    const login = useLogin();
    const styles = useStyles();

    return (
        <Stack className={styles.root}>
            <Typography variant="h4">
                Sign in with your Kobra account to deploy
                your models
            </Typography>
            <Typography variant="body1">
                To deploy models in your projects, you need
                a Kobra account.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => login()}
            >
                Sign up or log in
            </Button>
        </Stack>
    );
}
