import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    ListItemIcon,
    makeStyles,
    Menu,
    MenuItem,
    Typography
} from "@material-ui/core";
import {
    useDeleteProjectMutation,
    UserProjectFragment
} from "../../generated/queries";
import {
    Delete,
    Edit,
    FileCopy,
    Lock,
    MoreVert,
    Public,
    Visibility
} from "@material-ui/icons";
import Stack from "../Stack";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { formatDateString } from "../../utils/misc";

const useStyles = makeStyles(() => ({
    subheaderContainer: {
        display: "flex",
        alignItems: "center"
    },
    cardContent: {
        paddingTop: 0
    }
}));

export default function ProjectCard(props: {
    project: UserProjectFragment;
    onDelete(): void;
}) {
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const router = useRouter();
    const [deleteProject] = useDeleteProjectMutation({
        update(cache) {
            const normalizedId = cache.identify({
                id: props.project.id,
                __typename: "Project"
            });
            cache.evict({ id: normalizedId });
            cache.gc();
        }
    });

    const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const copyUrl = () => {
        if (!navigator.clipboard) {
            return;
        }
        navigator.clipboard.writeText(
            process.env.NEXT_PUBLIC_APP_HOSTED_URL +
                "/project/" +
                props.project.id
        );
    };

    return (
        <>
            <Card variant="outlined">
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
                                {formatDateString(props.project.updatedAt)}
                            </Typography>
                        </Stack>
                    }
                    action={
                        <>
                            <IconButton
                                onClick={() => {
                                    router.push(
                                        "/editor?id=" + props.project.id
                                    );
                                }}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton onClick={handleActionClick}>
                                <MoreVert />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                keepMounted
                            >
                                <MenuItem
                                    onClick={() => {
                                        handleMenuClose();
                                        router.push(
                                            "/project/" + props.project.id
                                        );
                                    }}
                                >
                                    <ListItemIcon>
                                        <Visibility />
                                    </ListItemIcon>
                                    Project details
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleMenuClose();
                                        copyUrl();
                                    }}
                                >
                                    <ListItemIcon>
                                        <FileCopy />
                                    </ListItemIcon>
                                    Copy link
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleMenuClose();
                                        setDeleteDialogOpen(true);
                                    }}
                                >
                                    <ListItemIcon>
                                        <Delete />
                                    </ListItemIcon>
                                    Delete
                                </MenuItem>
                            </Menu>
                        </>
                    }
                />
                {props.project.summary && (
                    <CardContent className={styles.cardContent}>
                        <Typography>{props.project.summary}</Typography>
                    </CardContent>
                )}
            </Card>
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={async (del) => {
                    setDeleteDialogOpen(false);
                    if (del) {
                        await deleteProject({
                            variables: {
                                id: props.project.id
                            }
                        });
                        props.onDelete();
                    }
                }}
            />
        </>
    );
}
