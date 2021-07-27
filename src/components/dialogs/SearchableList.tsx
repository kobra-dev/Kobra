import React, { useState } from "react";
import {
    CircularProgress,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import { useAutocomplete } from "@material-ui/lab";
import { nanoid } from "nanoid";

const useStyles = makeStyles(() => ({
    userProjects: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    results: {
        overflowY: "auto",
        flex: 1,
        marginTop: "1rem"
    }
}));

interface SearchableListProps<T> {
    data: T[];
    labelMapper: { (item: T): string };
    itemMapper: { (item: T): React.ReactNode };
}

export default function SearchableList<T>(props: SearchableListProps<T>) {
    const styles = useStyles();
    const [autocompleteId] = useState(nanoid());
    const { getRootProps, getInputProps, getListboxProps, groupedOptions } =
        useAutocomplete({
            id: "autocomplete" + autocompleteId,
            options: props.data ?? [],
            getOptionLabel: props.labelMapper
        });

    const [searchBoxValue, setSearchBoxValue] = useState("");
    // Intercept the result of getInputProps to set searchBoxValue
    const addStateToInputProps = (inputProps: any) => {
        if (inputProps.value !== searchBoxValue) {
            setSearchBoxValue(inputProps.value);
        }
        return inputProps;
    };

    return (
        <div className={styles.userProjects}>
            {props.data === undefined ? (
                <CircularProgress />
            ) : (
                <>
                    <div {...getRootProps()}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Search"
                            InputProps={{
                                inputProps: addStateToInputProps(
                                    getInputProps()
                                )
                            }}
                        />
                    </div>
                    <div className={styles.results}>
                        {(() => {
                            if (searchBoxValue.length > 0) {
                                if (groupedOptions.length > 0) {
                                    // Show results
                                    return (
                                        <div {...getListboxProps}>
                                            {groupedOptions.map(
                                                props.itemMapper
                                            )}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <Typography>No items found.</Typography>
                                    );
                                }
                            } else {
                                // There is nothing being searched for so show everything
                                return props.data.map(props.itemMapper);
                            }
                        })()}
                    </div>
                </>
            )}
        </div>
    );
}
