import { Dialog, DialogContent, DialogTitle, makeStyles } from "@material-ui/core";
import { ProjectDetailsFragment } from "src/generated/queries";
import { cardGridStyles } from "src/pages/project/[id]";
import ProjectCard from "./ProjectCard";

const useStyles = makeStyles((theme) => ({
    cardGrid: cardGridStyles
}));

export default function NetworkModal(props: {
    open: boolean;
    onClose(): void;
    proj: ProjectDetailsFragment;
}) {
    const styles = useStyles();
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Forks</DialogTitle>
            <DialogContent>
                <div className={styles.cardGrid}>
                    {props.proj.children?.map((proj) => (
                        <ProjectCard key={proj.id} proj={proj} onClick={props.onClose} />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
