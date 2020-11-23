import { CircularProgress, makeStyles } from '@material-ui/core';

interface LoaderProps {
    children?: React.ReactNode
}

const useStyles = makeStyles((theme) => ({
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        '& > *': {
            marginTop: 'calc(50vh - 40px)',
            textAlign: "center"
        }
    }
}));

export default function Loader(props: LoaderProps) {
    const styles = useStyles();
    return (
        <div className={styles.loaderContainer}>
            <div>
                <CircularProgress />
                {props.children}
            </div>
        </div>
    );
}