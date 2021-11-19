import React from 'react';
import { Card, CardContent, CardActions, Button } from '@mui/material';
import { getUserAddress } from '../utils';
import { useRouter } from 'next/router';

const UserListCard = (props) => {
  const { user } = props;
  const router = useRouter();
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent className="card-content">
        <h2>{user.name}</h2>
        <ol>
          <li>{getUserAddress(user)}</li>
          <li>{user.email}</li>
          <li>{user.phone}</li>
        </ol>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => router.push(`/users/${user.id}`)}>
          See More
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserListCard;
