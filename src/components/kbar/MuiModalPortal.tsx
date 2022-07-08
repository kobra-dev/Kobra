import { Modal, Backdrop } from "@material-ui/core";
import { useKBar, VisualState } from "kbar";
import { forwardRef, useEffect } from "react";
import KBarPositionerFwdRef from "./KBarPositioner_patched";

// Use the MUI Modal component instead of kbar's KBarPortal (gives us nicer scrollbar handling + backdrop)
export default function MuiModalPortal(props: {
    children: React.ReactElement;
}) {
    const { showing, query } = useKBar((state) => ({
        // If the modal sees that it is animating out it will try to animate the backdrop too
        showing:
            state.visualState !== VisualState.hidden &&
            state.visualState !== VisualState.animatingOut
    }));

    return (
        <Modal
            open={showing}
            onClose={() => {
                query.setVisualState((vs) =>
                    vs === VisualState.hidden || vs === VisualState.animatingOut
                        ? vs
                        : VisualState.animatingOut
                );
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                // Same as dialog
                timeout: 225
            }}
            aria-label="Command menu"
        >
            {/* @ts-expect-error - typescript broken */}
            <KBarAnimatorMuiTransition in={true}>
                {props.children}
            </KBarAnimatorMuiTransition>
        </Modal>
    );
}

// Provide the kbar's VisualState to the Modal as a transition component so it knows when to unmount the modal children
const KBarAnimatorMuiTransition = forwardRef<HTMLDivElement>(
    function KBarAnimatorMuiTransition(
        props: {
            onEnter: () => void;
            onExited: () => void;
            // In isn't actually used, it's just so that modal can detect that there's a transition component
            in: any;
            children: React.ReactElement;
        },
        ref
    ) {
        const { onEnter, onExited, children } = props;
        const { visualState } = useKBar((state) => ({
            visualState: state.visualState
        }));

        useEffect(() => {
            if (visualState === VisualState.animatingIn) {
                onEnter();
            } else if (visualState === VisualState.hidden) {
                onExited();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [visualState]);

        return (
            // Need to have some element in the children to forward the ref
            <KBarPositionerFwdRef ref={ref}>{children}</KBarPositionerFwdRef>
        );
    }
);
