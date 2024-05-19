import { AppErrorBoundary } from "@/components/ui/AppErrorBoundary";
import NoSSR from "@/components/ui/NoSSR";
import { defaultSettings } from "@/helpers/themes";
import "@/styles/github-markdown.css";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RecoilRoot } from "recoil";

type MyAppProps = { cookies?: string; analyticsEnabled: boolean };

export function MyApp({
  Component,
  pageProps,
  cookies,
  analyticsEnabled,
}: AppProps & MyAppProps) {
  // setting defaults settings in local storage if the user is new
  useEffect(() => {
    if (!localStorage.getItem("user_settings")) {
      localStorage.setItem("user_settings", JSON.stringify(defaultSettings));
    }
  }, []);

  return (
    <ErrorBoundary FallbackComponent={AppErrorBoundary}>
      <ChakraProvider>
        <Head>
          <title>StarterTab</title>
          <meta
            name="og:description"
            content="A customizable website to replace your 'New Tab' homepage"
          />
          <meta
            name="description"
            content="A customizable website to replace your 'New Tab' homepage"
          />
          <meta property="og:image" content={"/demo.png"} />
          <meta
            property="og:title"
            content="StarterTab - A customizable homepage"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {analyticsEnabled && (
            <script
              async
              src="https://umami.startertab.com/script.js"
              data-website-id="45bf60b9-cea8-4364-9920-9cbaaad14353"
            ></script>
          )}
        </Head>

        {/* NOTE: I have to use client side rendering here because of allowing a user
        to create their own themes. Because themes are stored client-side in localStorage,
        they can only be found when the application is rendered on the client. */}
        <NoSSR>
          <RecoilRoot>
            <Component cookies={cookies} {...pageProps} />
            <Analytics />
          </RecoilRoot>
        </NoSSR>
      </ChakraProvider>
    </ErrorBoundary>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<MyAppProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  const { req, res } = context.ctx;

  let cookies = "";
  if (req) {
    cookies = req.headers.cookie ?? "";
  }

  if (res) {
    res.setHeader("Cache-Control", "no-store");
  }

  return {
    ...ctx,
    cookies,
    analyticsEnabled: process.env.ANALYTICS_ENABLED === "true",
  };
};

export default MyApp;
