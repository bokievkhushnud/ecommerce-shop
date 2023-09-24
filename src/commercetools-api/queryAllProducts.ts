import { getAccessToken } from './accessToken';
import { ICategory } from '../types';

export async function queryAllProducts(
  sortOrder: string,
  page: number = 1,
  category?: ICategory | null
): Promise<any> {
  let sortParam = '';
  if (sortOrder) {
    switch (sortOrder) {
      case 'name.en-US.asc':
        sortParam = `&sort=name.en-US asc`;
        break;
      case 'name.en-US.desc':
        sortParam = `&sort=name.en-US desc`;
        break;
      case 'price.asc':
        sortParam = `&sort=price asc`; // Updated based on the error message
        break;
      case 'price.desc':
        sortParam = `&sort=price desc`; // Updated based on the error message
        break;
      default:
        break;
    }
  }
  const filterParams = category
    ? `&filter=categories.id:"${category.id}"`
    : `&limit=${6 + 3 * (page - 1)}`;
  const url: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/product-projections/search?${sortParam}${filterParams}`;
  const bearerToken: string =
    localStorage.getItem('accessToken') || (await getAccessToken());

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}

export async function fetchFilteredProducts(
  priceRange?: [number, number],
  flavors?: {
    spicy?: boolean;
    sweet?: boolean;
  },
  dietary?: {
    organic?: boolean;
    vegan?: boolean;
    vegetarian?: boolean;
  },
  portionSizes?: {
    small?: boolean;
    medium?: boolean;
    large?: boolean;
  }
): Promise<any> {
  let filterParams = '';

  // Constructing filters
  if (priceRange) {
    filterParams += `&filter=masterVariant.prices.centAmount:range(${
      priceRange[0] * 100
    },${priceRange[1] * 100})`;
  }

  if (flavors) {
    if (flavors.spicy)
      filterParams += '&filter=attributes.flavor:exact("spicy")';
    if (flavors.sweet)
      filterParams += '&filter=attributes.flavor:exact("sweet")';
  }

  if (dietary) {
    if (dietary.organic)
      filterParams += '&filter=attributes.dietary:exact("organic")';
    if (dietary.vegan)
      filterParams += '&filter=attributes.dietary:exact("vegan")';
    if (dietary.vegetarian)
      filterParams += '&filter=attributes.dietary:exact("vegetarian")';
  }

  if (portionSizes) {
    if (portionSizes.small)
      filterParams += '&filter=attributes.portionSize:exact("small")';
    if (portionSizes.medium)
      filterParams += '&filter=attributes.portionSize:exact("medium")';
    if (portionSizes.large)
      filterParams += '&filter=attributes.portionSize:exact("large")';
  }

  const url: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/product-projections/search?limit=100${filterParams}`;
  const bearerToken: string =
    localStorage.getItem('accessToken') || (await getAccessToken());

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.results;
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}

export async function getProductByID(productId: string): Promise<any> {
  const productURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/products/${productId}`;
  const bearerToken: string =
    localStorage.getItem('accessToken') || (await getAccessToken());

  const response = await fetch(productURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data; // since it's a single product, we directly return the data without using data.results
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}

export async function searchProducts(query: string): Promise<any> {
  const url: string = `https://api.${
    process.env.REACT_APP_REGION
  }.commercetools.com/${
    process.env.REACT_APP_PROJECT_KEY
  }/product-projections/search?limit=20&text.en-US=${encodeURIComponent(
    query
  )}&fuzzy=true`;
  const bearerToken: string =
    localStorage.getItem('accessToken') || (await getAccessToken());

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.results;
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}
