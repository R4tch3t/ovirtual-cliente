import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>
    };
  }

  render() {
    return (
      <Html lang="es" className='h-full bg-gray-100' >
        <Head>{CssBaseline.flush()}</Head>
        <body className='h-full' >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;