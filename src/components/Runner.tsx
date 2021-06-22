import React, { forwardRef, useImperativeHandle, useState } from "react";
import Blockly from "blockly/core";
import { Paper, Button, makeStyles } from "@material-ui/core";
import { PlayArrow, FileCopy, Clear } from "@material-ui/icons";
import { runInContext, highlightBlock, RunResult } from "./RunnerContext";
import { dv_reset } from "src/blocks/DataView_block";
import NewConsole, { ConsoleLine } from "./NewConsole";

type RunnerGetState = ConsoleLine[] | undefined;
type RunnerSetState = { (newState: ConsoleLine[]): void };
type RunnerResetState = { (): void };

interface IRunnerProps {
    getCode: { (): string };
}

const useStyles = makeStyles((theme) => ({
    runnerContainer: {
        display: "flex",
        flexDirection: "column",
        "& .react-console-message-run-start, .react-console-message-run-end, .react-console-message-exception":
            {
                fontWeight: "bolder",
                fontSize: "1.1em"
            },
        "& .react-console-message-run-start, .react-console-message-run-end, .react-console-message-input-log":
            {
                color: "#595959 !important"
            },
        "& .react-console-message-exception": {
            color: "red !important"
        },
        "& .react-console-message-exception-message": {
            fontWeight: "bolder"
        },
        "& .react-console-message-input-log": {
            fontWeight: "bold"
        }
    },
    runnerControls: {
        margin: "0.5rem"
    },
    floatRight: {
        float: "right"
    }
}));

export interface RunnerRef {
    state: RunnerGetState;
    setState: RunnerSetState;
    resetState: RunnerResetState;
}

function Runner({ getCode }: IRunnerProps, ref: any) {
    const styles = useStyles();
    const [consoleState, setConsoleState] = useState<ConsoleLine[]>([]);
    const [consoleCanType, setConsoleCanType] = useState(false);
    const [userInputCallback, setUserInputCallback] =
        useState<{ (text: string): void } | undefined>();

    const logMessage = (text: string, className?: string) => {
        // Update both array (for future references) and the state
        consoleState.push({
            text,
            className
        });
        setConsoleState([...consoleState]);
    };

    useImperativeHandle<unknown, RunnerRef>(
        ref,
        () => ({
            state: consoleState,
            setState: (newState: ConsoleLine[]) => {
                setConsoleState(newState);
            },
            resetState: () => {
                setConsoleState([]);
            }
        }),
        [consoleState, setConsoleState]
    );

    async function run(): Promise<void> {
        setConsoleCanType(false);
        logMessage(
            "Run started at " + new Date().toLocaleTimeString(),
            "run-start"
        );

        const source: string = getCode();

        globalThis.runnerConsole = logMessage;
        globalThis.runnerConsoleGetInput = runnerConsoleGetInput;
        dv_reset();
        const runResult: RunResult | undefined = await runInContext(source);
        delete globalThis.runnerConsole;
        delete globalThis.runnerConsoleGetInput;

        if (!(runResult === undefined)) {
            // There was an exception
            logMessage("Error", "exception");

            let text: string | undefined = undefined;
            if (runResult.blockId !== undefined) {
                // Get block
                // @ts-ignore
                const block = Blockly.getMainWorkspace().getBlockById(
                    runResult.blockId
                );
                if (block !== null) {
                    const blockType = block.type;
                    // Get text
                    text =
                        block.inputList
                            .map((input) =>
                                input.fieldRow
                                    .filter(
                                        (field) =>
                                            field instanceof Blockly.FieldLabel
                                    )
                                    .map((field) => field.value_)
                                    .join("")
                            )
                            .join(" _ ") +
                        // The last field could have an input so we need to check
                        (block.inputList[block.inputList.length - 1].connection
                            ? " _"
                            : "");
                    if (!text) {
                        // Fallback
                        text = blockType.replace("_", " ");
                    }
                }
            }

            if (!text) {
                logMessage(
                    "Block type: could not be identified",
                    "exception-details"
                );
                logMessage(
                    "This may mean that you did not connect a required input to a block",
                    "exception-details"
                );
            } else {
                logMessage("Block type: " + text, "exception-details");
            }

            logMessage(runResult.exception, "exception-details");
            if (text) {
                logMessage(
                    "The block that caused the problem has been highlighted",
                    "exception-details"
                );
            }

            // Now log in browser console
            console.log("%cException in generated code", "color: red");
            console.log(runResult.exception);
            console.log("Generated code:");
            console.log(source);
        } else {
            highlightBlock("");
        }

        logMessage(
            "Run ended at " + new Date().toLocaleTimeString(),
            "run-end"
        );
    }

    function copyLog(): void {
        let output = "";
        consoleState.forEach((line) => {
            if (line.text.length > 0) {
                output += line.text + "\n";
            }
        });

        if (!navigator.clipboard) {
            logMessage(
                "Your browser does not support the Clipboard API.",
                "exception-details"
            );
            return;
        }

        navigator.clipboard.writeText(output).then(
            () => {},
            (err) => {
                logMessage("Error copying text: " + err, "exception-details");
            }
        );
    }

    function runnerConsoleGetInput(): Promise<string> {
        return new Promise((resolve) => {
            setConsoleCanType(true);
            setUserInputCallback(() => (text) => {
                resolve(text);
                logMessage("> " + text, "input-log");
                setConsoleCanType(false);
                setUserInputCallback(undefined);
            });
        });
    }

    return (
        <Paper className={styles.runnerContainer}>
            <div key={"runnercontrols"} className={styles.runnerControls}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlayArrow />}
                    onClick={run}
                >
                    Run
                </Button>
                <div className={styles.floatRight}>
                    <Button startIcon={<FileCopy />} onClick={copyLog}>
                        Copy log
                    </Button>
                    <Button
                        startIcon={<Clear />}
                        onClick={() => {
                            setConsoleState([]);
                        }}
                    >
                        Clear
                    </Button>
                </div>
            </div>
            <NewConsole
                data={consoleState}
                canType={consoleCanType}
                onSubmit={userInputCallback ?? (() => {})}
                welcomeMessage="The output of your program will be displayed here"
                promptLabel="> "
            />
        </Paper>
    );
}

const RefRunner = forwardRef(Runner);
export default RefRunner;
