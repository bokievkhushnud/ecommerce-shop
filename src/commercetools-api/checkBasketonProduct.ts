import { fetchCartByUserId } from './fetchCart';

function getuserId() {
  const data = localStorage.getItem('user')!;
  const data1 = JSON.parse(data);
  localStorage.setitem('customerID', data1.customer.id);
}

function checkBasketOnProduct() {
  getuserId();
  const userToken: string =
    localStorage.getItem('customerID') === null
      ? ''
      : localStorage.getItem('userAccessToken')!;
  console.log(fetchCartByUserId(userToken));
}

export { checkBasketOnProduct };
