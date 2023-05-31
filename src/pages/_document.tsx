import { getCookieValue } from "@/helpers/settingsHelpers";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

type MyDocumentProps = { cookies?: string };

class MyDocument extends Document<{ cookies: string }> {
  static async getInitialProps(
    context: DocumentContext
  ): Promise<MyDocumentProps & DocumentInitialProps> {
    const ctx = await Document.getInitialProps(context);

    const { req, res } = context;
    let cookies = "";

    if (req && res) {
      res.setHeader("Cache-Control", "no-store");

      const userAgent = req.headers["user-agent"]
        ? req.headers["user-agent"]
        : navigator.userAgent;
      const isMobile = /Mobi/i.test(userAgent);

      cookies = req.headers.cookie ?? "";

      // redirecting a user to the landing page on their first visit
      // or if they're on mobile (you can't use the app on mobile)
      // or if they're coming from the extension, skip the landing page
      if (
        (isMobile || !getCookieValue(cookies, "background")) &&
        !req.url?.includes("landingpad") &&
        !req.url?.includes("?extension=true")
      ) {
        res.setHeader("Set-Cookie", "background=%23ffffff");
        res.writeHead(307, { Location: "/landingpad" });
        res.end();
      }
    }

    return { ...ctx, cookies };
  }

  render() {
    let background;
    const { cookies } = this.props;

    if (cookies) {
      background = decodeURIComponent(getCookieValue(cookies, "background"));
    }

    return (
      <Html>
        <Head />
        <body
          style={{
            background,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
