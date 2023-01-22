import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "../redux/store";

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    // High order component / Composition

    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
