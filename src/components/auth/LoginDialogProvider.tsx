import { Button, Dialog } from "@material-ui/core";
import React, { createContext, useCallback, useContext, useState } from "react";
import Login from "./Login";

type LoginFunction = {(): Promise<boolean>};

const LoginContext = createContext<LoginFunction>({} as LoginFunction);

export default function LoginDialogProvider(props: { children: React.ReactNode }) {
    const [loginOpen, setLoginOpen] = useState(false);
    const [openResolve, setOpenResolve] = useState<{(value: boolean): void}>();

    const loginFn = useCallback(() => {
        setLoginOpen(true);
        return new Promise<boolean>(resolve => {
            setOpenResolve(() => resolve);
        });
    }, [setLoginOpen, setOpenResolve]);

    const dialogOnClose = (success: boolean) => {
        setLoginOpen(false);
        if(openResolve) {
            openResolve(success);
        }
    }

    return (
        <LoginContext.Provider value={loginFn}>
            {props.children}
            <Dialog open={loginOpen} onClose={() => dialogOnClose(false)}>
                <Login
                    otherButtons={<Button onClick={() => dialogOnClose(false)}>Close</Button>}
                    onLogin={() => dialogOnClose(true)}
                />
            </Dialog>
        </LoginContext.Provider>
        
    )
}

export const useLogin = () => useContext(LoginContext);