import React, { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";

type SaveData = string;
type SaveFunction = { (val: SaveData): void };
const SaveContext = createContext<SaveFunction>(() => {});
const AutosaveStatusContext = createContext<{
    loading: boolean;
    lastSaveTime: Date;
}>({ loading: false, lastSaveTime: new Date() });

const BATCH_DURATION = 1000;

let latestData: SaveData = "";

export default function AutosaverProvider(props: {
    children: React.ReactNode;
    saveFn: (val: SaveData) => void;
}) {
    // Whether or not we're currently collecting a batch of changes
    const [collectingBatch, setCollectingBatch] = useState(false);
    // Used to provide an accurate status report
    const [loading, setLoading] = useState(false);
    const [lastSaveTime, setLastSaveTime] = useState(new Date());

    const save = (val: SaveData) => {
        latestData = val;
        if (!collectingBatch) {
            setLoading(true);
            setCollectingBatch(true);
            setTimeout(() => {
                setCollectingBatch(false);
                setLastSaveTime(new Date());
                props.saveFn(latestData);
                setLoading(false);
            }, BATCH_DURATION);
        }
    };

    return (
        <SaveContext.Provider value={save}>
            <AutosaveStatusContext.Provider value={{ loading, lastSaveTime }}>
                {props.children}
            </AutosaveStatusContext.Provider>
        </SaveContext.Provider>
    );
}

export const useSave = () => useContext(SaveContext);
export const useAutosaveStatus = () => useContext(AutosaveStatusContext);
