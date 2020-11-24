import React from 'react';
import fetch from 'isomorphic-unfetch';

// Use a global to save the user, so we don't have to fetch it again after page navigations
let userState: any;

const User = React.createContext({ user: null as any, loading: false });

export const fetchUser = async () => {
  if (userState !== undefined) {
    return userState;
  }

  const res = await fetch('/api/me');
  userState = res.ok ? await res.json() : null;
  const tokenRes = await fetch('/api/getAccessToken');
  if(tokenRes.ok) {
    const token: {token: string} = await tokenRes.json();
    userState = { ...userState, ...token};
  }

  return userState;
};

export const UserProvider = ({ value, children }: any) => {
  const { user } = value;

  // If the user was fetched in SSR add it to userState so we don't fetch it again
  React.useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <User.Provider value={value}>{children}</User.Provider>;
};

export const useUser = () => React.useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = React.useState({
    user: userState || null,
    loading: userState === undefined
  });

  React.useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;

    fetchUser().then((user) => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        setUser({ user, loading: false });
      }
    });

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState]);

  return data;
};

export const login = (redirectUrl: string = window.location.pathname) => {
  //window.location.search = `?redirectUrl=${encodeURIComponent(redirectUrl)}`;
  //window.location.pathname = `/api/login`;
  window.location.href = window.location.origin + `/api/login?redirectUrl=${encodeURIComponent(redirectUrl)}`;
}

export const logout = () => {
  window.location.pathname = "/api/logout";
}