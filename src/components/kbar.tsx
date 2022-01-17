import { BorderBottom, BorderColor, Padding } from "@material-ui/icons";
import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    useMatches,
    KBarResults
} from "kbar";

export default function KBar({ children }) {
    return (
        <KBarProvider actions={actions}>
            <KBarPortal>
                <KBarPositioner
                    style={{
                        zIndex: 99999
                    }}
                >
                    <KBarAnimator>
                        <KBarSearch
                            style={{
                                backgroundColor: "white",
                                borderTopLeftRadius: "0.5rem",
                                borderTopRightRadius: "0.5rem",
                                width: "50vw",
                                maxWidth: "700px",
                                fontSize: "1.5rem",
                                border: "2px solid #ddd",
                                outline: "none",
                                padding: "0.5rem"
                            }}
                        />
                        <RenderResults />
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            {children}
        </KBarProvider>
    );
}

function RenderResults() {
    const { results } = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) => (
                <div
                    style={{
                        background: active ? "#eee" : "#fff",
                        paddingLeft: "0.5rem",
                        border: "1px solid #eee",
                        borderLeft: "2px #ddd solid",
                        borderRight: "2px #ddd solid"
                    }}
                >
                    <>
                        <span
                            style={{
                                fontSize: "1.2rem"
                            }}
                        >
                            {
                                //@ts-ignore
                                item.name
                            }
                        </span>
                        <br
                            style={{
                                marginTop: "0rem"
                            }}
                        />
                        <span
                            style={{
                                fontSize: "0.8rem",
                                color: "gray"
                            }}
                        >
                            {
                                //@ts-ignore
                                item.keywords
                            }
                        </span>
                    </>
                    <span
                        style={{
                            position: "absolute",
                            top: "0.5rem",
                            right: "0rem"
                        }}
                    >
                        {
                            //@ts-ignore
                            item.shortcut.map((shortcut, key) => (
                                <span
                                    key={key}
                                    style={{
                                        fontSize: "1.2rem",
                                        backgroundColor: "white",
                                        padding: "0.2rem",
                                        borderRadius: "0.8rem",
                                        alignItems: "center",
                                        marginRight: "0.3rem",
                                        color: "gray",
                                        border: "2px #eee solid"
                                    }}
                                >
                                    {shortcut}
                                </span>
                            ))
                        }
                    </span>
                </div>
            )}
        />
    );
}

const actions = [
    {
        id: "new-project",
        name: "Create New Project",
        shortcut: ["g", "n"],
        keywords: "Create new project in Kobra Studio",
        perform: () => (window.location.pathname = "editor")
    },
    {
        id: "dashboard",
        name: "Dashboard",
        shortcut: ["g", "h"],
        keywords: "Go to your dashboard",
        perform: () => (window.location.pathname = "")
    },
    {
        id: "explore",
        name: "Explore",
        shortcut: ["g", "e"],
        keywords: "Explore Kobra projects made by other users :)",
        perform: () => (window.location.pathname = "explore")
    },
    {
        id: "docs",
        name: "Documentation",
        shortcut: ["g", "d"],
        keywords: "Go to Kobra's documentation",
        perform: () => (window.location.href = "https://docs.kobra.dev/")
    },
    {
        id: "blog",
        name: "Blog",
        shortcut: ["g", "b"],
        keywords: "Go to Kobra's blog",
        perform: () => (window.location.href = "https://blog.kobra.dev/")
    },
    {
        id: "github",
        name: "GitHub",
        shortcut: ["g", "h"],
        keywords: "Go to Kobra's GitHub",
        perform: () =>
            (window.location.href = "https://github.com/kobra-dev/kobra")
    }
];
