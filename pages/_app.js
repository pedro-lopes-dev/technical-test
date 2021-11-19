import * as React from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from 'utils';
import 'styles.css';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </CacheProvider>
  );
}
