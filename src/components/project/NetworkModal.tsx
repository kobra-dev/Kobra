import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
import { ProjectDetailsFragment } from "src/generated/queries";
import CardGrid from "../CardGrid";
import ProjectCard from "./ProjectCard";

export default function NetworkModal(props: {
    open: boolean;
    onClose(): void;
    proj: ProjectDetailsFragment;
}) {
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Forks</DialogTitle>
            <DialogContent>
                <CardGrid>
                    {props.proj.children?.map((proj) => (
                        <ProjectCard
                            key={proj.id}
                            proj={proj}
                            onClick={props.onClose}
                        />
                    ))}
                </CardGrid>
            </DialogContent>
        </Dialog>
    );
}
