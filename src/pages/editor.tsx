// This is just a wrapper to disable SSR on the Editor page.
// The actual Editor page code is in ../components/Editor.tsx
import { Typography } from "@material-ui/core";
import dynamic from "next/dynamic";
import Loader from "../components/Loader";

export default dynamic(
    async () => import("../components/EditorAccountLoaderWrapper"),
    {
        ssr: false,
        // eslint-disable-next-line react/display-name
        loading: () => (
            <Loader>
                <Typography color="textSecondary">
                    Initializing Kobra Studio...
                </Typography>
            </Loader>
        )
    }
);
