import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface IImage {
  dimensions: {
    w: number;
    h: number;
  };
  url: string;
}

interface ImageModalProps {
  images: IImage[];
}

const ImageModal: React.FC<ImageModalProps> = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const toggleZoom = () => {
    setZoom(!zoom);
  };

  return (
    <div>
      <img
        src={images[0].url}
        alt="Product thumbnail"
        style={{ width: '100%', cursor: 'pointer', objectFit: 'contain' }}
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          position="relative"
          width="80vw"
          height="80vh"
          bgcolor="white"
          overflow="hidden"
        >
          <img
            src={images[currentIndex].url}
            alt="Product"
            onClick={toggleZoom}
            style={{
              maxWidth: zoom ? '120%' : '100%',
              maxHeight: zoom ? '120%' : '100%',
              width: 'auto',
              height: 'auto',
              cursor: zoom ? 'zoom-out' : 'zoom-in',
              transition: 'transform 0.3s',
              objectFit: 'contain',
              margin: 'auto',
              display: 'block',
            }}
          />
          <IconButton
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
            onClick={handlePrev}
          >
            <ArrowBackIos />
          </IconButton>
          <IconButton
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
            onClick={handleNext}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
};

export default ImageModal;
