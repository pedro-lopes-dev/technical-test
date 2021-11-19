import React from 'react';
import { Container } from '@mui/material';
import Image from 'next/image';
import { domain } from 'utils';

const Nav = () => {
  return (
    <header className="nav">
      <nav>
        <Container>
          <h1>
            <a href={domain}>
              <Image src="/logo.svg" alt="RealFevr" width={360} height={58} />
            </a>
          </h1>
        </Container>
      </nav>
    </header>
  );
};

export default Nav;
