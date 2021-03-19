import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    makeStyles,
    Typography
} from "@material-ui/core";
import { UserProjectFragment } from "../../generated/queries";
import { Edit, Lock, MoreVert, Public, Visibility } from "@material-ui/icons";
import Stack from "../Stack";

const useStyles = makeStyles((theme) => ({
    subheaderContainer: {
        display: "flex",
        alignItems: "center"
    },
    card: {
        maxWidth: "30rem"
    }
}));

export default function ProjectCard(props: { project: UserProjectFragment }) {
    const styles = useStyles();

    return (
        <Card className={styles.card} variant="outlined">
            <CardActionArea>
                <CardHeader
                    title={props.project.name}
                    subheader={
                        <Stack
                            direction="row"
                            spacing="0.5rem"
                            className={styles.subheaderContainer}
                        >
                            {props.project.isPublic ? <Public /> : <Lock />}
                            <Typography>
                                {new Date(
                                    props.project.updatedAt as string
                                ).toLocaleString("us", {
                                    dateStyle: "long",
                                    timeStyle: "short"
                                })}
                            </Typography>
                        </Stack>
                    }
                    action={
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                    }
                />
                {props.project.description && (
                    <CardContent>
                        <Typography>{props.project.description}</Typography>
                    </CardContent>
                )}
            </CardActionArea>
            {/*
            <CardActions>
                <Button startIcon={<Visibility/>}>View page</Button>
                <Button startIcon={<Edit/>}>Open in Studio</Button>
            </CardActions>*/}
        </Card>
    );
}
