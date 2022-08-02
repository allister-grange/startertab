import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

type MyDocumentProps = { cookies?: string };

const getCookieValue = (cookies: string, name: string) =>
  cookies.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

class MyDocument extends Document<{ cookies: string }> {
  static async getInitialProps(
    context: DocumentContext
  ): Promise<MyDocumentProps & DocumentInitialProps> {
    const ctx = await Document.getInitialProps(context);

    const { req, res } = context;

    let cookies = "";
    if (req) {
      cookies = req.headers.cookie ?? "";
    }

    if (res) {
      res.setHeader("Cache-Control", "no-store");
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
        <body style={{ background }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
