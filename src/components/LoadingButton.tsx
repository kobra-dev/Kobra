import {
    Button,
    ButtonProps,
    CircularProgress,
    makeStyles
} from "@material-ui/core";

interface LoadingButtonProps extends ButtonProps {
    loading: boolean;
    disableMargin?: boolean;
    loaderColor?: "inherit" | "primary" | "secondary";
}

const useStyles = makeStyles((theme) => ({
    wrapper: (props: { disableMargin: boolean }) => ({
        ...(props.disableMargin ? undefined : { margin: theme.spacing(1) }),
        position: "relative"
    }),
    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
    }
}));

export default function LoadingButton(props: LoadingButtonProps) {
    const { loading, disableMargin, ...buttonProps } = props;
    const styles = useStyles({ disableMargin });

    return (
        <div className={styles.wrapper}>
            <Button {...buttonProps} />
            {loading && (
                <CircularProgress
                    size={24}
                    className={styles.buttonProgress}
                    color={props.loaderColor}
                />
            )}
        </div>
    );
}
