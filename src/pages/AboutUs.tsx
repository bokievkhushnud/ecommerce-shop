import { Box, Container, Typography, Link, Grid } from '@mui/material';
import Card from '../components/specific/aboutTeamCard';
import { teammatesData, bios } from '../assets/teammatesData';
import photoIT from '../assets/images/Irina-photo.jpg';
import photoKB from '../assets/images/Khushnud-photo.jpg';
import photoYK from '../assets/images/Yulia-photo.jpg';

const AboutUs = () => {
  const images = [photoIT, photoKB, photoYK];

  return (
    <Container
      component="section"
      sx={{
        py: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Link href="https://rs.school/index.html" underline="none">
          <img
            src="https://rs.school/images/rs_school_js.svg"
            alt="The Rolling Scopes School website"
            style={{
              border: '3px dashed #000',
              borderRadius: '50%',
              width: 200,
              height: 80,
              display: 'block',
              margin: '0 auto',
            }}
          />
        </Link>
      </Box>

      <Box sx={{ maxWidth: '800px', mb: 4 }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontSize: '1.1rem', textAlign: 'justify' }}
        >
          Grandma's Basket online shop website is a graduation work for
          Javascript/Frontend course of The Rolling Scopes School' final task.
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: '1.1rem', textAlign: 'justify' }}
        >
          The Rolling Scopes School (RS School) is a free-of-charge and
          community-based education program conducted by The Rolling Scopes
          developer community since 2013. If you want to learn more about Rs
          School and its courses, click on the RS School icon.
        </Typography>
      </Box>

      {teammatesData.map((teammate, index) => (
        <Grid
          container
          spacing={5}
          justifyContent="center"
          sx={{ mb: 4 }}
          key={index}
        >
          <Grid item xs={12} sm={4}>
            <img
              src={images[index]}
              alt="teammate"
              style={{
                width: '100%',
                maxWidth: '330px',
                borderRadius: '15px',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              name={teammate.name}
              role={teammate.role}
              github={teammate.github}
              contributions={teammate.contributions}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ textAlign: 'justify' }}>{bios[index]}</Typography>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
};

export default AboutUs;
