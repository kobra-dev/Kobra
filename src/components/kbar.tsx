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
                <KBarPositioner>
                    <KBarAnimator>
                        <KBarSearch
                            style={{
                                backgroundColor: "white",
                                borderTopLeftRadius: "0.5rem",
                                borderTopRightRadius: "0.5rem",
                                width: "30vw",
                                fontSize: "1.5rem"
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
                        background: active ? "#eee" : "transparent"
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
                            float: "right"
                        }}
                    >
                        {
                            //@ts-ignore
                            item.shortcut.map((shortcut, key) => (
                                <span
                                    key={key}
                                    style={{
                                        fontSize: "1.5rem",
                                        backgroundColor: "white",
                                        padding: "0.2rem",
                                        borderRadius: "0.8rem",
                                        alignItems: "center",
                                        color: "gray"
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
        id: "blog",
        name: "Blog",
        shortcut: ["b"],
        keywords: "writing words",
        perform: () => (window.location.pathname = "blog")
    },
    {
        id: "contact",
        name: "Contact",
        shortcut: ["c"],
        keywords: "email",
        perform: () => (window.location.pathname = "contact")
    }
];
