// src/components/ProductCard.js

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Import CSS for styling
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart }) => {
    const { id, name, price, description, imageUrl } = product;

    return (
        <div className="product-card">
            <img src={imageUrl} alt={name} className="product-image" />
            <div className="product-info">
                <h3 className="product-title">{name}</h3>
                <p className="product-description">{description}</p>
                <p className="product-price">${price.toFixed(2)}</p>
                <div className="product-actions">
                    <button className="add-to-cart" onClick={() => onAddToCart(product)}>
                        <FaShoppingCart /> Add to Cart
                    </button>
                    <Link to={`/products/${id}`} className="view-details">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
