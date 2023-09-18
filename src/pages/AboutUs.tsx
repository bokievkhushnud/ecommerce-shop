import React from 'react';
import { createTheme } from '@mui/material/styles';
import { Box, Container, Typography, Link } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Card from '../components/specific/aboutTeamCard';
import teammatesData from '../assets/teammatesData';

import photoIT from '../assets/images/Irina-photo.jpg';
import photoKB from '../assets/images/Khushnud-photo.jpg';
import photoYK from '../assets/images/Yulia-photo.jpg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
      light: '#ffffff9f',
      contrastText: '#fff',
    },
  },
});

const AboutUs = () => {
  const images = [photoIT, photoKB, photoYK];

  return (
    <>
      <Container
        component="section"
        sx={{
          margin: 0,
          padding: 0,
          width: 1,
          height: 1,
        }}
      >
        <ThemeProvider theme={theme}>
          <Box
            borderRadius="50%"
            sx={{
              width: '100%',
              borderRadius: '50%',
            }}
          >
            <Link href="https://rs.school/index.html" underline="none">
              <img
                src="https://rs.school/images/rs_school_js.svg"
                alt="link The Rolling Scopes School website"
                width={`${200}px`}
                height={`${80}px`}
              />
            </Link>
            <div>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: 'primary.light',
                  padding: '1rem',
                  textAlign: 'justify',
                  fontSize: '1.1rem',
                }}
              >
                Grandma's Basket online shop website was made is a graduation
                work for Javascript/Frontend course of The Rolling Scopes
                School.
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: 'primary.light',
                  padding: '1rem',
                  textAlign: 'justify',
                  fontSize: '1.1rem',
                }}
              >
                The Rolling Scopes School (RS School) is a free-of-charge and
                community-based education program conducted by The Rolling
                Scopes developer community since 2013. If you want to learn more
                about Rs School and its courses, click on the RS School icon.
              </Typography>
            </div>
          </Box>
          <div>
            {teammatesData.map((teammate, index) => {
              return (
                <div className="card-contatiner" key={index + 1}>
                  <div className="card-photo">
                    <img src={images[index]} alt="teammate" />
                  </div>
                  <Card
                    name={teammate.name}
                    role={teammate.role}
                    github={teammate.github}
                    contributions={teammate.contributions}
                    intro={teammate.intro}
                  />
                </div>
              );
            })}
          </div>
        </ThemeProvider>
      </Container>
    </>
  );
};

export default AboutUs;
