import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { queryCategories } from '../commercetools-api/queryCategories';
import CategoryCard from '../components/common/CategoryCard';
import { ICategory } from '../types';
import { fetchPromoCodes } from '../commercetools-api/fetchPromoCodes';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const MainPage: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [promoCodes, setPromoCodes] = useState<any[]>([]);

  useEffect(() => {
    queryCategories().then((data: ICategory[]) => {
      setCategories(
        data.map((category) => ({
          id: category.id,
          name: {
            'en-US': category.name['en-US'],
          },
          slug: {
            'en-US': category.slug['en-US'],
          },
          parent: category.parent
            ? { typeId: category.parent.typeId, id: category.parent.id }
            : null,
        }))
      );
    });
    fetchPromoCodes().then((codes) => {
      setPromoCodes(codes);
    });
  }, []);

  return (
    <Container>
      <Box
        mt={4}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <IconButton
          color="secondary"
          aria-label="previous"
          style={{ border: '#848482 1px solid' }}
        >
          <NavigateNextIcon style={{ transform: 'rotate(180deg)' }} />
        </IconButton>
        {promoCodes.map((code, index) => (
          <Box
            key={code.id}
            mt={4}
            mb={4}
            width="100%"
            display="flex"
            flexDirection="row"
            alignItems="center"
            marginTop={0}
            style={{
              justifyContent: 'center',
            }}
          >
            <Card
              elevation={5}
              className="promocode-card"
              style={{
                backgroundImage: 'url(./market.jpg)',
                backgroundSize: 'cover',
                height: '15rem',
                width: '85%',
                borderRadius: '12px',
                color: 'white',
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: 'bold' }}
                >
                  {code.name['en-US']}
                </Typography>
                <Typography variant="body1">
                  {code.description['en-US']}
                </Typography>
                <Box mt={2}>
                  <Chip
                    label={`Use promocode: ${code.code}`}
                    color="primary"
                    avatar={
                      <Avatar>
                        <LocalOfferIcon />
                      </Avatar>
                    }
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
        <IconButton
          color="secondary"
          aria-label="next"
          style={{ border: '#848482 1px solid' }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>

      <Box
        mt={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={0}
      >
        <Typography
          variant="h6"
          gutterBottom
          style={{
            fontWeight: 'bold',
            marginBottom: '20px',
            alignSelf: 'start',
          }}
        >
          Shop by category
        </Typography>
        <Grid container spacing={4}>
          {categories ? (
            categories.map((category, index) => {
              if (category.parent === null) {
                return (
                  <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                    <CategoryCard key={category.id} category={category} />
                  </Grid>
                );
              }
              return null;
            })
          ) : (
            <Box mt={4}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default MainPage;
