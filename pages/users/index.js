import React from 'react';
import Head from 'next/head';
import { Container, Grid } from '@mui/material';
import { domain } from 'utils';
import dynamic from 'next/dynamic';
import Nav from 'src/nav';
import UserListCard from 'src/user-list-card';
import styles from 'styles/users.module.css';

const MapWithNoSSR = dynamic(() => import('src/map'), {
  ssr: false,
});

const Home = ({ users }) => (
  <>
    <Head>
      <title>RealFevr - Technical test</title>
      <link rel="canonical" href={`${domain}/users`} />
      <meta property="og:title" content="RealFevr - Users list" />
      <meta name="twitter:title" content="RealFevr - Users list" />
      <meta
        property="og:description"
        content="Some description about the list of users..."
      />
      <meta
        name="twitter:description"
        content="Some description about the list of users..."
      />
      <meta
        name="description"
        content="Some description about the list of users..."
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:url" content={`${domain}/users`} />
      <meta property="og:url" content={`${domain}/users`} />
      <meta property="og:image" content={`${domain}/background.jpg`} />
      <meta name="twitter:image" content={`${domain}/background.jpg`} />
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
      <Container>
        <section>
          <MapWithNoSSR users={users} />
        </section>
        <section className={styles.cardsContainer}>
          <Grid container spacing={2} component="ol">
            {users?.map((user) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                key={user.id}
                component="li"
              >
                <UserListCard user={user} />
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
    </main>
  </>
);

export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  if (!users) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      users,
    },
  };
}

export default Home;
