import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // High order component / Composition
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
