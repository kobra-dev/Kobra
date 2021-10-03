import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import React, { createContext } from "react";
import { forwardRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useImperativeHandle } from "react";
import { useContext } from "react";
import { useState } from "react";
import firebase from "../utils/firebase";

type SaveFunction = { (): void };
const SaveContext = createContext<SaveFunction>(() => {});
const AutosaveStatusContext = createContext<{
    loading: boolean;
    lastSaveTime: Date;
    haveAttemptedToSave: boolean;
}>({
    loading: false,
    lastSaveTime: new Date(),
    haveAttemptedToSave: false
});

const BATCH_DURATION = 1000;

let onFinishSave: { (): void } | undefined = undefined;

type ProvidedSaveFn = () => Promise<boolean>;
let providedSaveFn: ProvidedSaveFn = undefined;

export type AutosaverProviderRef = {
    finishSave: () => Promise<void>;
    reset: () => void;
    fakeSave: () => void;
    save: () => void;
};

// This is a component to debounce save calls to reduce the number of network requests
function AutosaverProvider(
    props: {
        children: React.ReactNode;
        // Returns false if the save failed and the last save time shouldn't be updated
        saveFn: ProvidedSaveFn;
        canSave: boolean;
    },
    ref
) {
    // Whether or not we're currently collecting a batch of changes
    const [collectingBatch, setCollectingBatch] =
        useState(false);
    // Used to provide an accurate status report
    const [loading, setLoading] = useState(false);
    const [lastSaveTime, setLastSaveTime] =
        useState<Date | undefined>(undefined);
    const [haveAttemptedToSave, setHaveAttemptedToSave] =
        useState(false);
    const [user] = useAuthState(firebase.auth());

    useEffect(() => {
        if (!user) {
            // If it's loading that batch will fail
            setHaveAttemptedToSave(loading);
            setLastSaveTime(undefined);
        } else if (haveAttemptedToSave && !lastSaveTime) {
            // Try to save the project now that we can
            save();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const save = useCallback(() => {
        setHaveAttemptedToSave(true);
        if (!props.canSave) return;
        if (!collectingBatch) {
            setLoading(true);
            setCollectingBatch(true);
            setTimeout(async () => {
                setCollectingBatch(false);
                const newLastSaveTime = new Date();
                if (await providedSaveFn()) {
                    setLastSaveTime(newLastSaveTime);
                }
                setLoading(false);
                if (onFinishSave) {
                    onFinishSave();
                    onFinishSave = undefined;
                }
            }, BATCH_DURATION);
        }
    }, [
        collectingBatch,
        setLoading,
        setCollectingBatch,
        setLastSaveTime,
        props.canSave
    ]);

    useImperativeHandle<unknown, AutosaverProviderRef>(
        ref,
        () => ({
            finishSave() {
                return new Promise<void>((res) => {
                    if (!loading) {
                        res();
                    } else {
                        onFinishSave = res;
                    }
                });
            },
            reset() {
                setLastSaveTime(undefined);
                setHaveAttemptedToSave(false);
            },
            // Pretend to save but don't actually run the logic
            // Used for forking a project
            fakeSave() {
                setLastSaveTime(new Date());
                setHaveAttemptedToSave(true);
            },
            save
        }),
        [loading, setLastSaveTime, save]
    );

    useEffect(() => {
        providedSaveFn = props.saveFn;
    }, [props.saveFn]);

    return (
        <SaveContext.Provider value={save}>
            <AutosaveStatusContext.Provider
                value={{
                    loading,
                    lastSaveTime,
                    haveAttemptedToSave
                }}
            >
                {props.children}
            </AutosaveStatusContext.Provider>
        </SaveContext.Provider>
    );
}

export default forwardRef(AutosaverProvider);

export const useSave = () => useContext(SaveContext);
export const useAutosaveStatus = () =>
    useContext(AutosaveStatusContext);
