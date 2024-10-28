# API Documentation for Exotrium Marketplace

## Introduction

The Exotrium Marketplace API allows developers to interact with the platform programmatically. This document provides an overview of the available endpoints, request/response formats, and authentication methods.

## Base URL

[https://api.exotrium.com/v1](https://api.exotrium.com/v1)


## Authentication

All API requests require an API key. You can obtain your API key by signing up on the Exotrium Marketplace.

### Header

```bash
Authorization: Bearer YOUR_API_KEY
```


## Endpoints

### 1. Get Products

- **Endpoint:** `/products`
- **Method:** `GET`
- **Description:** Retrieve a list of products available in the marketplace.

#### Request

```bash
GET /products
```


#### Response

```json
1 {
2   "products": [
3     {
4       "id": "123",
5       "name": "Product Name",
6       "price": "10.00",
7       "description": "Product description.",
8       "seller": "Seller Name"
9     },
10     ...
11   ]
12 }
```

2. Create Order
- **Endpoint**: /orders
- **Method**: POST
- **Description**: Create a new order in the marketplace.
- **Request**
```json
1 {
2   "productId": "123",
3   "quantity":  2,
4   "paymentMethod": "Pi cryptocurrency"
5 }
```
- **Response**
```json
1 {
2   "orderId": "456",
3   "status": "pending"
4 }
```

# Conclusion

The Exotrium Marketplace API provides a robust interface for developers to integrate with the platform. For more information or to request additional endpoints, please contact our development team at [dev@exotrium.com].
