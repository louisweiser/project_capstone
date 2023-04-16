import "@/styles/globals.css";
import "@/assets/fonts.css";
import { MyProvider } from "../contexts/myContext.js";
import { DataProvider } from "../contexts/dataContext.js";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  return (
    <MyProvider>
      <DataProvider>
        <Component {...pageProps} />
        <Analytics />
      </DataProvider>
    </MyProvider>
  );
}
