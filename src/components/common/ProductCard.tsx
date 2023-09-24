import React from 'react';
import { IProduct } from '../../types';
import { ButtonAddToCart } from '../specific/ButtonAddToCart';
import './ProductCard.scss';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, description, masterVariant } = product;
  const navigate = useNavigate();

  const displayPrice = (centAmount: number) =>
    `$${(centAmount * 0.01).toFixed(2)}`;

  const redirectToProduct = (e: React.MouseEvent) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-card" onClick={(e) => redirectToProduct(e)}>
      <div
        className="product-image"
        style={{ backgroundImage: `url(${masterVariant.images[0].url})` }}
      ></div>
      <div className="product-name">
        {name['en-US'].slice(0, 35).concat('...')}
      </div>
      <div className="product-description">
        {description['en-US'].slice(0, 35).concat('...')}
      </div>
      <div className="product-prices">
        {masterVariant.prices.length ? (
          <div className="product-price">
            {masterVariant.prices[0].discounted &&
            masterVariant.prices[0].discounted.value ? (
              <>
                <span className="discounted-price">
                  {displayPrice(
                    masterVariant.prices[0].discounted.value.centAmount
                  )}
                </span>{' '}
                <span className="original-price original-price_discounted">
                  {displayPrice(masterVariant.prices[0].value.centAmount)}
                </span>
              </>
            ) : (
              <span className="original-price">
                {displayPrice(masterVariant.prices[0].value.centAmount)}
              </span>
            )}
          </div>
        ) : (
          <div className="product-price">$0.00</div>
        )}
        <ButtonAddToCart productId={product.id}></ButtonAddToCart>
      </div>
    </div>
  );
};

export default ProductCard;
