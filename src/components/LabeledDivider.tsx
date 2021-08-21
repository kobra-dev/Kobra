import {
    Divider,
    makeStyles,
    Typography,
    TypographyProps
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        "& > *:first-child": {
            marginRight: theme.spacing(2)
        },
        "& > *:last-child": {
            marginLeft: theme.spacing(2)
        }
    },
    divider: {
        flex: 1
    }
}));

export default function LabeledDivider(props: TypographyProps) {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Divider className={styles.divider} />
            <Typography variant="body2" {...props} />
            <Divider className={styles.divider} />
        </div>
    );
}
