// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Identity is Ownable {
    struct User {
        string name;
        string email;
        string phoneNumber;
        bool isVerified;
        uint256 registrationTimestamp;
    }

    mapping(address => User) private users;
    mapping(address => bool) private isRegistered;

    event UserRegistered(address indexed userAddress, string name, string email, string phoneNumber);
    event UserVerified(address indexed userAddress);
    event UserUpdated(address indexed userAddress, string name, string email, string phoneNumber);

    modifier onlyRegistered() {
        require(isRegistered[msg.sender], "User  is not registered");
        _;
    }

    // Register a new user
    function registerUser (string memory _name, string memory _email, string memory _phoneNumber) public {
        require(!isRegistered[msg.sender], "User  is already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(bytes(_phoneNumber).length > 0, "Phone number cannot be empty");

        users[msg.sender] = User({
            name: _name,
            email: _email,
            phoneNumber: _phoneNumber,
            isVerified: false,
            registrationTimestamp: block.timestamp
        });

        isRegistered[msg.sender] = true;

        emit UserRegistered(msg.sender, _name, _email, _phoneNumber);
    }

    // Verify a user's identity
    function verifyUser (address _userAddress) public onlyOwner {
        require(isRegistered[_userAddress], "User  is not registered");
        require(!users[_userAddress].isVerified, "User  is already verified");

        users[_userAddress].isVerified = true;

        emit UserVerified(_userAddress);
    }

    // Update user information
    function updateUser (string memory _name, string memory _email, string memory _phoneNumber) public onlyRegistered {
        User storage user = users[msg.sender];

        user.name = _name;
        user.email = _email;
        user.phoneNumber = _phoneNumber;

        emit UserUpdated(msg.sender, _name, _email, _phoneNumber);
    }

    // Get user information
    function getUser (address _userAddress) public view returns (string memory, string memory, string memory, bool, uint256) {
        require(isRegistered[_userAddress], "User  is not registered");
        User memory user = users[_userAddress];
        return (user.name, user.email, user.phoneNumber, user.isVerified, user.registrationTimestamp);
    }

    // Check if a user is registered
    function isUser Registered(address _userAddress) public view returns (bool) {
        return isRegistered[_userAddress];
    }

    // Check if a user is verified
    function isUser Verified(address _userAddress) public view returns (bool) {
        require(isRegistered[_userAddress], "User  is not registered");
        return users[_userAddress].isVerified;
    }
}
