import NavBar from "@/components/Navbar";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>The Inkeeper</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto max-w-5xl">
          <NavBar />
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </>
  );
}
