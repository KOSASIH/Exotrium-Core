// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Mintable.sol";

contract AdvancedToken is ERC20, Ownable, Pausable, ERC20Burnable {
    // Mapping from account to frozen status
    mapping(address => bool) private _frozenAccounts;

    // Events
    event AccountFrozen(address indexed account);
    event AccountUnfrozen(address indexed account);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Initial minting of tokens to the owner
        _mint(msg.sender, 1000000 * 10 ** decimals()); // Mint 1 million tokens
    }

    // Modifier to check if the account is frozen
    modifier notFrozen(address account) {
        require(!_frozenAccounts[account], "Account is frozen");
        _;
    }

    // Mint new tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Burn tokens
    function burn(uint256 amount) public override notFrozen(msg.sender) {
        super.burn(amount);
    }

    // Freeze an account
    function freezeAccount(address account) public onlyOwner {
        require(!_frozenAccounts[account], "Account is already frozen");
        _frozenAccounts[account] = true;
        emit AccountFrozen(account);
    }

    // Unfreeze an account
    function unfreezeAccount(address account) public onlyOwner {
        require(_frozenAccounts[account], "Account is not frozen");
        _frozenAccounts[account] = false;
        emit AccountUnfrozen(account);
    }

    // Override transfer functions to include frozen account checks
    function transfer(address recipient, uint256 amount) public override notFrozen(msg.sender) returns (bool) {
        return super.transfer(recipient, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override notFrozen(sender) returns (bool) {
        return super.transferFrom(sender, recipient, amount);
    }

    // Pause the contract
    function pause() public onlyOwner {
        _pause();
    }

    // Unpause the contract
    function unpause() public onlyOwner {
        _unpause();
    }

    // Override _beforeTokenTransfer to implement pausable functionality
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
