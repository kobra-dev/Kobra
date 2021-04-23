import {
    Button,
    ButtonProps,
    CircularProgress,
    makeStyles
} from "@material-ui/core";

interface LoadingButtonProps extends ButtonProps {
    loading: boolean;
}

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        position: "relative"
    },
    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
    }
}));

export default function LoadingButton(props: LoadingButtonProps) {
    const styles = useStyles();
    const { loading, ...buttonProps } = props;

    return (
        <div className={styles.wrapper}>
            <Button {...buttonProps} />
            {loading && (
                <CircularProgress size={24} className={styles.buttonProgress} />
            )}
        </div>
    );
}
