import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useEditProfileMutation } from "src/generated/queries";
import { MAX_BIO_LEN, MAX_URL_LEN } from "src/utils/constants";
import LoadingButton from "../LoadingButton";
import Stack from "../Stack";

export default function EditProfileModal(props: {
    open: boolean;
    onClose(): void;
    bio: string;
    url: string;
}) {
    const [bio, setBio] = useState(props.bio);
    const [url, setUrl] = useState(props.url);
    const [editProfile, { data, loading }] = useEditProfileMutation({
        variables: {
            bio,
            url
        }
    });

    useEffect(() => {
        setBio(props.bio);
    }, [props.bio]);

    useEffect(() => {
        setUrl(props.url);
    }, [props.url]);

    const bioError = bio.length > MAX_BIO_LEN;
    const urlError = url.length > MAX_URL_LEN;

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Edit profile</DialogTitle>
            <DialogContent>
                <Stack>
                    <TextField
                        error={bioError}
                        helperText={
                            bioError
                                ? `Bio must be less than or equal to ${MAX_BIO_LEN} characters.`
                                : undefined
                        }
                        label="Bio"
                        fullWidth
                        value={bio}
                        onChange={(e) => {
                            setBio(e.target.value);
                        }}
                        variant="outlined"
                    />
                    <TextField
                        error={urlError}
                        helperText={
                            urlError
                                ? `URL must be less than or equal to ${MAX_URL_LEN} characters.`
                                : undefined
                        }
                        label="URL"
                        fullWidth
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                        }}
                        variant="outlined"
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Close
                </Button>
                <LoadingButton
                    loading={loading}
                    disabled={loading}
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                        await editProfile();
                        props.onClose();
                    }}
                >
                    Save
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
