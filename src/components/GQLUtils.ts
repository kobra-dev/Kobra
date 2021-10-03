export interface UseQueryData<T> {
    loading: boolean;
    error?: any;
    data:
        | {
              [key: string]: T[];
          }
        | undefined;
}

export function dateConvertSort<T>(
    items: T[],
    dateProperty: string
): T[] {
    // @ts-ignore
    return (
        items
            .map((item: T) => ({
                ...item,
                [dateProperty]: new Date(item[dateProperty])
            }))
            // @ts-ignore
            .sort(
                (a: T, b: T) =>
                    b[dateProperty] - a[dateProperty]
            )
    );
}
