import { Pagination } from "@material-ui/lab";
import React from "react";

interface PaginatorProps {
    children: React.ReactNode;
    nPages: number;
    onPageChange(page: number): void;
}

export default function Paginator(props: PaginatorProps) {
    const PagePicker = () =>
        props.nPages > 1 ? (
            <Pagination
                count={props.nPages}
                onChange={(e, page) => props.onPageChange(page)}
            />
        ) : null;
    return (
        <>
            <PagePicker />
            {props.children}
            <PagePicker />
        </>
    );
}
