import { Typography } from "@material-ui/core";
import { useState } from "react";

export default function Models() {
    return (
        <>
            <Typography variant="h6">Models</Typography>
            {JSON.stringify(globalThis.modelsDb)}
        </>
    );
}
