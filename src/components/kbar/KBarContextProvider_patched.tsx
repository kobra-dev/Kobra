// This is (mostly) copied from https://github.com/timc1/kbar/blob/main/src/KBarContextProvider.tsx
// and is patched to use our custom InternalEvents_patched component

import { useStore } from "./useStore_patched";
import * as React from "react";
import { InternalEvents } from "./InternalEvents_patched";
import { KBarContext, KBarProviderProps } from "kbar";

export const KBarProvider: React.FC<KBarProviderProps> = (props) => {
    const contextValue = useStore(props);

    return (
        <KBarContext.Provider value={contextValue}>
            <InternalEvents />
            {props.children}
        </KBarContext.Provider>
    );
};
