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

const useStyles = makeStyles((theme) => ({
    cardContent: {
        paddingTop: 0
    }
}));

export default function ProjectCard(props: {
    proj: ProjectCardFragment & { user?: Pick<User, "name"> };
    onClick?: { (): void };
}) {
    const styles = useStyles();

    return (
        <Link href={"/project/" + props.proj.id}>
            <CardActionArea onClick={props.onClick}>
                <Card variant="outlined">
                    <CardHeader
                        title={props.proj.name}
                        subheader={
                            props.proj.user ? (
                                <div>
                                    <Typography>
                                        {formatDateString(props.proj.updatedAt)}
                                    </Typography>
                                    <Typography>
                                        <AccountCircle />
                                        {props.proj.user.name}
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
