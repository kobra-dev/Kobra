import { forwardRef } from "react";

// This is a custom component using the styles from KBarPositioner that forwards the ref correctly
type KBarPositionerFwdRefProps = {
    children: React.ReactNode;
    style?: React.CSSProperties;
};
// eslint-disable-next-line react/display-name
const KBarPositionerFwdRef = forwardRef<
    HTMLDivElement,
    KBarPositionerFwdRefProps
>((props: KBarPositionerFwdRefProps, ref) => (
    <div
        ref={ref}
        style={{
            position: "fixed",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            inset: "0px",
            padding: "14vh 16px 16px",
            ...(props.style ?? {})
        }}
    >
        {props.children}
    </div>
));

export default KBarPositionerFwdRef;
