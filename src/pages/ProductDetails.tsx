import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import {
  Card,
  Container,
  ThemeProvider,
  Typography,
  CssBaseline,
  Button,
} from '@mui/material';
import { ImagesURL } from '../types/types';
import Neucha from '../assets/fonts/Roboto/Roboto.woff2';

const theme = createTheme({
  typography: {
    fontFamily: 'Neucha',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
                @font-face {
                    font-family: 'Neucha';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: local('Neucha'), url(${Neucha}) format('woff2);
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }
            `,
    },
  },
  palette: {
    primary: {
      light: '#76ff03',
      main: '#4caf10',
      dark: '#212121',
      contrastText: '#121212',
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#212121',
      contrastText: '#fff',
    },
  },
});

const ProductDetails: React.FC = () => {
  const [description, setDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState();
  const [currency, setCurrency] = useState();
  const [productsNumber, setProductsNumber] = useState<number | string>(0);

  const images: string[] = [];

  function handleChange(event: React.ChangeEvent<HTMLElement>) {
    setProductsNumber((event.target as HTMLInputElement)?.value || '');
  }

  useEffect(() => {
    const id = '869de558-9ab9-47e1-93d9-5970ddfdfd55';
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer 7FvKka_AMbaYiXHVd862jtClHFMuJoxu'
    );
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(
      `https://api.us-central1.gcp.commercetools.com/ecommerceproject-finaltask/products/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setProductName(result['masterData']['current']['name']['en-US']);
        setDescription(
          result['masterData']['current']['metaDescription']['en-US']
        );
        setPrice(
          result['masterData']['current']['masterVariant']['prices']['value'][
            'centAmount'
          ]
        );
        setCurrency(
          result['masterData']['current']['masterVariant']['prices']['value'][
            'currencyCode'
          ]
        );

        const arrayOfImages =
          result['masterData']['current']['masterVariant']['images'];
        console.log(arrayOfImages);
        arrayOfImages.forEach((obj: ImagesURL) => images.push(obj['url']));
      })
      .catch((error) => console.log('error', error));
  }, []);
  return (
    <div
      style={{
        backgroundColor: '#fff',
        width: '100%',
        height: '100vh',
      }}
    >
      <Container className="product-card" maxWidth="sm">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Card variant="outlined">
            <Typography variant="h5">{productName}</Typography>
            <Typography>
              {price}
              {currency}
            </Typography>
            <Typography>{description}</Typography>
          </Card>
          <div className="swiper"></div>
        </ThemeProvider>
        <div className="number-of-producgts">
          <Button id="plus">+1</Button>
          <input
            type="text"
            onChange={handleChange}
            className="numberOfProducts"
            value={productsNumber}
          />
          <Button id="minus">-1</Button>
        </div>
        <button id="btnBuy">Buy</button>
      </Container>
    </div>
  );
};

const obj = {
  id: '869de558-9ab9-47e1-93d9-5970ddfdfd55',
  version: 37,
  versionModifiedAt: '2023-09-03T19:54:27.672Z',
  lastMessageSequenceNumber: 17,
  createdAt: '2023-09-01T12:39:37.682Z',
  lastModifiedAt: '2023-09-03T19:54:27.672Z',
  lastModifiedBy: {
    isPlatformClient: true,
    user: {
      typeId: 'user',
      id: 'cfaea699-a658-4cc5-953a-9b457290a2f7',
    },
  },
  createdBy: {
    isPlatformClient: true,
    user: {
      typeId: 'user',
      id: 'cfaea699-a658-4cc5-953a-9b457290a2f7',
    },
  },
  productType: {
    typeId: 'product-type',
    id: 'a88cbc80-6332-4858-9435-5d4221e6f8c3',
  },
  masterData: {
    current: {
      name: {
        'en-US': 'Caesar Dressing',
      },
      description: {
        'en-US':
          'Caesar dressing is a creamy and tangy salad dressing with a rich flavor profile. It typically includes ingredients like mayonnaise, garlic, anchovies, Parmesan cheese, lemon juice, and black pepper, creating a savory and slightly zesty dressing that is popularly used on Caesar salads and as a versatile condiment for other dishes.',
      },
      categories: [
        {
          typeId: 'category',
          id: '5402688b-3630-4786-8b67-db73bcf13194',
        },
      ],
      categoryOrderHints: {},
      slug: {
        'en-US': 'caesar-dressing',
      },
      metaTitle: {
        'en-US': 'caesar souse',
      },
      metaDescription: {
        'en-US':
          'Caesar dressing is a creamy and tangy salad dressing with a rich flavor profile. It typically includes ingredients like mayonnaise, garlic, anchovies, Parmesan cheese, lemon juice, and black pepper, creating a savory and slightly zesty dressing that is popularly used on Caesar salads and as a versatile condiment for other dishes.',
      },
      masterVariant: {
        id: 1,
        sku: 'caesar-dressing',
        key: 'gf-cd-1',
        prices: [
          {
            id: '80e744f4-4cb3-493e-b819-3fee1f87e17f',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 1400,
              fractionDigits: 2,
            },
            country: 'US',
          },
        ],
        images: [
          {
            url: 'https://301658b69d72042c06d7-7d1f9581e5e5bb72bb1fd5d13d9bc9c5.ssl.cf1.rackcdn.com/Caesar-Dressing-1-KGJMV0mN.jpg',
            label: 'front',
            dimensions: { w: 679, h: 692 },
          },
          {
            url: 'https://301658b69d72042c06d7-7d1f9581e5e5bb72bb1fd5d13d9bc9c5.ssl.cf1.rackcdn.com/Caesar-Dressing-2-MTN9wgX0.jpg',
            label: 'back',
            dimensions: { w: 679, h: 679 },
          },
          {
            url: 'https://301658b69d72042c06d7-7d1f9581e5e5bb72bb1fd5d13d9bc9c5.ssl.cf1.rackcdn.com/Caesar-Dressing-4-BCNy18f2.jpg',
            label: 'description',
            dimensions: { w: 679, h: 679 },
          },
          {
            url: 'https://301658b69d72042c06d7-7d1f9581e5e5bb72bb1fd5d13d9bc9c5.ssl.cf1.rackcdn.com/Caesar-Dressing-3-SLsAll4a.jpg',
            label: 'recommendation',
            dimensions: { w: 679, h: 679 },
          },
        ],
        attributes: [],
        assets: [],
      },
      variants: [],
      searchKeywords: {},
    },
    staged: {
      name: { 'en-US': 'Caesar Dressing' },
      description: {
        'en-US':
          'Caesar dressing is a creamy and tangy salad dressing with a rich flavor profile. It typically includes ingredients like mayonnaise, garlic, anchovies, Parmesan cheese, lemon juice, and black pepper, creating a savory and slightly zesty dressing that is popularly used on Caesar salads and as a versatile condiment for other dishes.',
      },
      categories: [
        {
          typeId: 'category',
          id: '5402688b-3630-4786-8b67-db73bcf13194',
        },
      ],
      categoryOrderHints: {},
      slug: {
        'en-US': 'caesar-dressing',
      },
      metaTitle: { 'en-US': 'caesar souse' },
      metaDescription: {
        'en-US':
          'Caesar dressing is a creamy and tangy salad dressing with a rich flavor profile. It typically includes ingredients like mayonnaise, garlic, anchovies, Parmesan cheese, lemon juice, and black pepper, creating a savory and slightly zesty dressing that is popularly used on Caesar salads and as a versatile condiment for other dishes.',
      },
      masterVariant: {
        id: 1,
        sku: 'caesar-dressing',
        key: 'gf-cd-1',
        prices: [
          {
            id: '80e744f4-4cb3-493e-b819-3fee1f87e17f',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 1400,
              fractionDigits: 2,
            },
            country: 'US',
          },
        ],
        images: [
          {
            url: 'https://301658b69d72042c06d7-7d1f9581e5e5bb72bb1fd5d13d9bc9c5.ssl.cf1.rackcdn.com/Caesar-Dressing-1-KGJMV0mN.jpg',
            label: 'front',
            dimensions: { w: 679, h: 692 },
          },
          {
            url: 'https://301658b69d72042c06d7-7d1f9581e5e5bb72bb1fd5d13d9bc9c5.ssl.cf1.rackcdn.com/Caesar-Dressing-2-MTN9wgX0.jpg',
            label: 'back',
            dimensions: { w: 679, h: 679 },
          },
          {
            url: 'https://301658b69d72042c06d7-7d1f9581e5e5bb72bb1fd5d13d9bc9c5.ssl.cf1.rackcdn.com/Caesar-Dressing-4-BCNy18f2.jpg',
            label: 'description',
            dimensions: { w: 679, h: 679 },
          },
          {
            url: 'https://301658b69d72042c06d7-7d1f9581e5e5bb72bb1fd5d13d9bc9c5.ssl.cf1.rackcdn.com/Caesar-Dressing-3-SLsAll4a.jpg',
            label: 'recommendation',
            dimensions: { w: 679, h: 679 },
          },
        ],
        attributes: [],
        assets: [],
      },
      variants: [],
      searchKeywords: {},
    },
    published: true,
    hasStagedChanges: false,
  },
  key: 'gourmet-001',
  taxCategory: {
    typeId: 'tax-category',
    id: 'c25da028-22de-4d2b-a3cc-d74b23101ba6',
  },
  priceMode: 'Embedded',
  lastVariantId: 1,
};

export default ProductDetails;
