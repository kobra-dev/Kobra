import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    makeStyles,
    Typography
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Link from "next/link";
import { ProjectCardFragment, User } from "src/generated/queries";
import { formatDateString } from "src/utils/misc";

const useStyles = makeStyles(() => ({
    cardContent: {
        paddingTop: 0
    },
    subheaderContainer: {
        display: "flex",
        alignItems: "center",
        "& > *": {
            marginRight: "0.25rem"
        }
    }
}));

export default function ProjectCard(props: {
    proj: ProjectCardFragment & {
        user?: Pick<User, "name">;
    };
    onClick?: { (): void };
    id?: string;
}) {
    const styles = useStyles();

    return (
        <Link passHref href={"/project/" + props.proj.id}>
            <CardActionArea onClick={props.onClick} id={props.id}>
                <Card variant="outlined">
                    <CardHeader
                        title={props.proj.name}
                        subheader={
                            props.proj.user ? (
                                <div>
                                    <Typography
                                        className={styles.subheaderContainer}
                                    >
                                        <AccountCircle />
                                        {props.proj.user.name +
                                            " · " +
                                            formatDateString(
                                                props.proj.updatedAt
                                            )}
                                    </Typography>
                                </div>
                            ) : (
                                formatDateString(props.proj.updatedAt)
                            )
                        }
                    />
                    {props.proj.summary && (
                        <CardContent className={styles.cardContent}>
                            <Typography>{props.proj.summary}</Typography>
                        </CardContent>
                    )}
                </Card>
            </CardActionArea>
        </Link>
    );
}
