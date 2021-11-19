import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Nav from 'src/nav';
import UserDetailsCard from 'src/user-details-card';
import styles from 'styles/user.module.css';
import { domain } from 'utils';
import { Container, Grid } from '@mui/material';

const MapWithNoSSR = dynamic(() => import('src/map'), {
  ssr: false,
});

const Users = (props) => {
  const { user } = props;
  const url = `${domain}/users/${user.id}`;

  return (
    <>
      <Head>
        <title>RealFevr - Technical test</title>
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`RealFevr - ${user.name}`} />
        <meta name="twitter:title" content={`RealFevr - ${user.name}`} />
        <meta
          property="og:description"
          content="Some description about a specific user..."
        />
        <meta
          name="twitter:description"
          content="Some description about a specific user..."
        />
        <meta
          name="description"
          content="Some description about a specific user..."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content={url} />
        <meta property="og:url" content={url} />
        <meta
          property="og:image"
          content={`${domain}/api/og-image?lat=${user.address.geo.lat}&lng=${user.address.geo.lng}`}
        />
        <meta
          name="twitter:image"
          content={`${domain}/api/og-image?lat=${user.address.geo.lat}&lng=${user.address.geo.lng}`}
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossOrigin=""
        />
      </Head>
      <Nav />
      <main>
        <Container className={styles.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <section>
                <UserDetailsCard user={user} url={url} />
              </section>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <section className={styles.mapSection}>
                <MapWithNoSSR users={[user]} />
              </section>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export async function getStaticProps(context) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${context.params.id}`
  );
  const user = await res.json();
  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  const paths = users.map((user) => ({
    params: { id: String(user.id) },
  }));
  return { paths, fallback: false };
}

export default Users;
