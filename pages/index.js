import * as React from 'react';
import { Button, Container } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import styles from 'styles/home.module.css';
import { useRouter } from 'next/router';
import { domain } from 'utils';

const Index = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>RealFevr - Technical test</title>
        <link rel="canonical" href={domain} />
        <meta property="og:title" content="RealFevr - Technical test" />
        <meta name="twitter:title" content="RealFevr - Technical test" />
        <meta property="og:description" content="Some description..." />
        <meta name="twitter:description" content="Some description..." />
        <meta name="description" content="Some description..." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content={domain} />
        <meta property="og:url" content={domain} />
        <meta property="og:image" content={`${domain}/background.jpg`} />
        <meta name="twitter:image" content={`${domain}/background.jpg`} />
      </Head>
      <main>
        <Container>
          <div className={styles.container}>
            <Image src="/logo.svg" alt="RealFevr" width={360} height={58} />
            <h2 className={styles.title}>Technical Test</h2>
            <Button
              className={styles.button}
              variant="contained"
              onClick={() => router.push('/users')}
            >
              All users
            </Button>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Index;
