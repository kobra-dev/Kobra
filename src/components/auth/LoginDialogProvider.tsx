import { Button, Dialog } from "@material-ui/core";
import React, { createContext, useCallback, useContext, useState } from "react";
import { getKBarLock, releaseKBarLock } from "../kbar/kbar";
import Login, { LoginTab } from "./Login";

type LoginFunction = { (initialTab?: LoginTab): Promise<boolean> };

const LoginContext = createContext<LoginFunction>({} as LoginFunction);

export default function LoginDialogProvider(props: {
    children: React.ReactNode;
}) {
    const [loginOpen, setLoginOpen] = useState<false | LoginTab>(false);
    const [openResolve, setOpenResolve] =
        useState<{ (value: boolean): void }>();

    const loginFn = useCallback(
        (initialTab?: LoginTab) => {
            const kbarLock = getKBarLock();
            setLoginOpen(initialTab ?? LoginTab.LOGIN);
            return new Promise<boolean>((resolve) => {
                setOpenResolve(() => (val: boolean) => {
                    resolve(val);
                    releaseKBarLock(kbarLock);
                });
            });
        },
        [setLoginOpen, setOpenResolve]
    );

    const dialogOnClose = (success: boolean) => {
        setLoginOpen(false);
        if (openResolve) {
            openResolve(success);
        }
    };

    return (
        <LoginContext.Provider value={loginFn}>
            {props.children}
            <Dialog
                open={loginOpen !== false}
                onClose={() => dialogOnClose(false)}
            >
                <Login
                    otherButtons={
                        <Button onClick={() => dialogOnClose(false)}>
                            Close
                        </Button>
                    }
                    onLogin={() => dialogOnClose(true)}
                    initialTab={loginOpen === false ? undefined : loginOpen}
                />
            </Dialog>
        </LoginContext.Provider>
    );
}

export const useLogin = () => useContext(LoginContext);
