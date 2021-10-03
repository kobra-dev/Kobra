/* eslint-disable react-hooks/rules-of-hooks */
import {
    Button,
    CircularProgress
} from "@material-ui/core";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";

// Based off of https://dev.to/somtougeh/building-infinite-scroll-in-react-with-hooks-and-intersection-observer-3e09

export default function InfiniteScroll<T>({
    fetchData: fetchDataUser,
    getContents,
    initialItems,
    itemsPerPage
}: {
    fetchData(page: number): Promise<T[]>;
    getContents(items: T[]): React.ReactNode;
    initialItems: T[];
    itemsPerPage: number;
}) {
    if (typeof window === "undefined") {
        return <>{getContents(initialItems)}</>;
    }
    const [element, setElement] = useState(null);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState(initialItems);
    const [noMoreItems, setNoMoreItems] = useState(false);

    const page = useRef(1);
    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (firstEntry.isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 1 }
        )
    );

    const fetchData = useCallback(
        async (pageNumber) => {
            setLoading(true);

            try {
                const data = await fetchDataUser(
                    pageNumber
                );
                setLoading(false);
                return data;
            } catch (e) {
                setLoading(false);
                return e;
            }
        },
        [fetchDataUser]
    );

    const handleInitial = useCallback(
        async (page) => {
            const newItems = await fetchData(page);
            if (newItems.length < itemsPerPage) {
                setNoMoreItems(true);
            }
            setItems((oldItems) => [
                ...oldItems,
                ...newItems
            ]);
        },
        [fetchData, itemsPerPage]
    );

    const loadMore = () => {
        page.current++;
        handleInitial(page.current);
    };

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [element]);

    const contents = useMemo(
        () => getContents(items),
        [getContents, items]
    );

    return (
        <>
            {contents}

            {!noMoreItems && (
                <div ref={setElement}>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Button
                            variant="outlined"
                            onClick={loadMore}
                        >
                            Load More
                        </Button>
                    )}
                </div>
            )}
        </>
    );
}
