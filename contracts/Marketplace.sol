// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is Ownable {
    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price;
        address payable seller;
        bool isAvailable;
    }

    mapping(uint256 => Product) public products;
    mapping(address => uint256[]) public sellerProducts;
    uint256 public productCount;

    IERC20 public token; // ERC20 token for payments

    event ProductAdded(uint256 id, string name, uint256 price, address seller);
    event ProductPurchased(uint256 id, address buyer, uint256 price);
    event ProductUpdated(uint256 id, string name, uint256 price);
    event ProductRemoved(uint256 id);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    // Add a new product to the marketplace
    function addProduct(string memory _name, string memory _description, uint256 _price) public {
        require(_price > 0, "Price must be greater than zero");
        productCount++;
        products[productCount] = Product(productCount, _name, _description, _price, payable(msg.sender), true);
        sellerProducts[msg.sender].push(productCount);
        emit ProductAdded(productCount, _name, _price, msg.sender);
    }

    // Purchase a product
    function purchaseProduct(uint256 _id) public {
        Product storage product = products[_id];
        require(product.isAvailable, "Product is not available");
        require(token.balanceOf(msg.sender) >= product.price, "Insufficient token balance");

        // Transfer tokens to the seller
        token.transferFrom(msg.sender, product.seller, product.price);

        product.isAvailable = false; // Mark product as sold
        emit ProductPurchased(_id, msg.sender, product.price);
    }

    // Update product details
    function updateProduct(uint256 _id, string memory _name, string memory _description, uint256 _price) public {
        Product storage product = products[_id];
        require(msg.sender == product.seller, "Only the seller can update the product");
        require(product.isAvailable, "Product is not available for update");

        product.name = _name;
        product.description = _description;
        product.price = _price;

        emit ProductUpdated(_id, _name, _price);
    }

    // Remove a product from the marketplace
    function removeProduct(uint256 _id) public {
        Product storage product = products[_id];
        require(msg.sender == product.seller, "Only the seller can remove the product");
        require(product.isAvailable, "Product is not available for removal");

        product.isAvailable = false; // Mark product as removed
        emit ProductRemoved(_id);
    }

    // Get all products by seller
    function getSellerProducts(address _seller) public view returns (uint256[] memory) {
        return sellerProducts[_seller];
    }

    // Get product details
    function getProduct(uint256 _id) public view returns (Product memory) {
        return products[_id];
    }
}
