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
                                width: "30vw"
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
            onRender={({ item, active }) =>
                typeof item === "string" ? (
                    <div>{item}</div>
                ) : (
                    <div
                        style={{
                            background: active ? "#eee" : "transparent"
                        }}
                    >
                        {item.name}
                    </div>
                )
            }
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
