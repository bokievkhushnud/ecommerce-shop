import React from 'react';
import { TeammateData } from '../../types/types';
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

const Card = (props: TeammateData) => {
  return (
    <MuiCard
      sx={{
        borderRadius: '15px',
        display: 'flex',
        height: '300px',
        width: '600px',
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          <CardMedia
            component="img"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            image={props.photo}
            alt="Photo"
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div>
              <Typography variant="h5">{props.name}</Typography>
              <Typography variant="subtitle1">{props.role}</Typography>
              <a href={props.github}>GitHub</a>
              <Typography variant="h6">Contributions:</Typography>
              <ul>
                {props.constributions.map((contribution, index) => (
                  <li key={index}>{contribution}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Grid>

        <Grid item xs={6}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              marginTop: '10px', // You can add more styles here
            }}
          >
            <div>
              <Typography variant="h5">Introduction</Typography>
              <Typography>{props.intro}</Typography>
            </div>
          </CardContent>
        </Grid>
      </Grid>
    </MuiCard>
  );
};

export default Card;
