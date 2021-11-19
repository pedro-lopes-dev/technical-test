import { Paper } from '@mui/material';
import styles from 'styles/user.module.css';
import React from 'react';
import { getUserAddress } from 'utils';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';
import UserProperty from './user-property';

const UserDetailsCard = ({ user, url }) => {
  return (
    <Paper style={{ height: '100%' }}>
      <div className={styles.cardContent}>
        <h2 className={styles.subtitle}>Personal Info</h2>
        <ol>
          <li>
            <UserProperty name="ID" value={`#${user.id}`} />
          </li>
          <li>
            <UserProperty name="Name" value={user.name} />
          </li>
          <li>
            <UserProperty name="Phone" value={user.phone} />
          </li>
          <li>
            <UserProperty name="Username" value={user.username} />
          </li>
          <li>
            <UserProperty name="E-mail" value={user.email} />
          </li>
          <li>
            <UserProperty name="Website" value={user.website} />
          </li>
        </ol>
        <h2 className={styles.subtitle}>Address</h2>
        <ol>
          <li>
            <address>
              <UserProperty name="Address" value={getUserAddress(user)} />
            </address>
          </li>
          <li>
            <UserProperty
              name="Coordinates"
              value={`(${user.address.geo.lat}, ${user.address.geo.lng})`}
            />
          </li>
        </ol>
        <h2 className={styles.subtitle}>Company</h2>
        <ol>
          <li>
            <UserProperty name="Name" value={user.company.name} />
          </li>
          <li>
            <UserProperty
              name="Catch phrase"
              value={user.company.catchPhrase}
            />
          </li>
          <li>
            <UserProperty name="BS" value={user.company.bs} />
          </li>
        </ol>
        <div className={styles.shareButtonsContainer}>
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} round className={styles.shareButton} />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={32} round className={styles.shareButton} />
          </TwitterShareButton>
          <EmailShareButton url={url}>
            <EmailIcon size={32} round className={styles.shareButton} />
          </EmailShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={32} round className={styles.shareButton} />
          </LinkedinShareButton>
        </div>
      </div>
    </Paper>
  );
};

export default UserDetailsCard;
