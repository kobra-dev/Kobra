import {
    Divider,
    ListSubheader,
    makeStyles,
    Tab,
    Tabs
} from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import Blockly from "blockly/core";

type BlocklyToolboxItem =
    | {
          kind: "CATEGORY";
          name: string;
          colour?: string;
      }
    | {
          kind: "SEP";
          cssconfig?: {
              container?: string;
          };
          label?: string;
      };

const useStyles = makeStyles((theme) => ({
    tab: {
        minHeight: 0,
        "& > .MuiTab-wrapper": {
            flexDirection: "initial",
            justifyContent: "left",
            textAlign: "left"
        }
    },
    subheader: {
        lineHeight: "2em"
    }
}));

// Lets us use any DOM element in the tab list
function PropsIsolator(props: any) {
    return props.children;
}

const parseColor = (color: string) =>
    color.startsWith("#")
        ? color
        : Blockly.hueToHex(parseInt(color));

function BlocklyToolboxInner() {
    const styles = useStyles();
    const [tab, setTab] = useState<number | false>(false);

    const toolbox: Blockly.Toolbox = useMemo(
        // @ts-ignore
        () => Blockly.getMainWorkspace().toolbox_,
        []
    );
    const toolboxContents = toolbox.toolboxDef_
        .contents as BlocklyToolboxItem[];

    useEffect(() => {
        const cl = (e: {
            type: any;
            oldItem: string | null;
            newItem: string | null;
        }) => {
            if (
                e.type ===
                Blockly.Events.TOOLBOX_ITEM_SELECT
            ) {
                setTab(
                    e.newItem === null
                        ? false
                        : toolboxContents.findIndex(
                              (item) =>
                                  item.kind ===
                                      "CATEGORY" &&
                                  item.name === e.newItem
                          )
                );
            }
        };
        const ws = Blockly.getMainWorkspace();
        ws.addChangeListener(cl);
        return () => ws.removeChangeListener(cl);
    }, [setTab, toolboxContents]);

    return (
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tab}
            onChange={(_, newVal) => {
                toolbox.setSelectedItem(
                    toolbox.contents_[newVal]
                );
            }}
            aria-label="Vertical tabs example"
            textColor="primary"
        >
            {toolboxContents.map((tab, index) =>
                tab.kind === "CATEGORY" ? (
                    <Tab
                        key={index}
                        className={styles.tab}
                        label={tab.name}
                        style={
                            tab.colour
                                ? {
                                      borderLeft:
                                          "5px solid " +
                                          parseColor(
                                              tab.colour
                                          )
                                  }
                                : {
                                      paddingLeft: "17px"
                                  }
                        }
                    />
                ) : tab.kind === "SEP" ? (
                    <PropsIsolator key={index}>
                        <div>
                            <Divider
                                className={
                                    tab.cssconfig?.container
                                }
                            />
                            {tab.label && (
                                <ListSubheader
                                    className={
                                        styles.subheader
                                    }
                                >
                                    {tab.label}
                                </ListSubheader>
                            )}
                        </div>
                    </PropsIsolator>
                ) : null
            )}
        </Tabs>
    );
}

const getToolboxDiv = () =>
    document.querySelector(".blocklyToolboxDiv");

export default function BlocklyToolbox() {
    // Make sure that the toolbox renders when the Blockly toolbox is added
    const [_, rerender] = useState(false);
    useEffect(() => {
        if (!getToolboxDiv()) {
            const observer = new MutationObserver(
                (mutationList, observer) => {
                    for (const mutation of mutationList) {
                        if (
                            (mutation.target as HTMLElement)
                                .className ===
                            "blocklyToolboxContents"
                        ) {
                            observer.disconnect();
                            rerender(!_);
                            break;
                        }
                    }
                }
            );
            observer.observe(
                document.getElementById("__next"),
                {
                    attributes: false,
                    childList: true,
                    subtree: true
                }
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const toolbox = getToolboxDiv();
    if (toolbox) {
        (
            Array.prototype.find.call(
                toolbox.children,
                (child: HTMLElement) =>
                    child.classList.contains(
                        "blocklyToolboxContents"
                    )
            ) as HTMLElement | undefined
        )?.remove();
        return ReactDOM.createPortal(
            <BlocklyToolboxInner />,
            toolbox
        );
    }
    return null;
}
