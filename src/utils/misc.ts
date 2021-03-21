export const formatDateString = (date: string) => new Date(date)
    .toLocaleString("us", {
        // TypeScript doesn't know about these properties but they exist
        // @ts-ignore
        dateStyle: "long",
        // @ts-ignore
        timeStyle: "short"
    });