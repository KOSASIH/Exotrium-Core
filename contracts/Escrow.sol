// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Escrow is Ownable {
    enum EscrowStatus { Created, Funded, Completed, Disputed, Resolved }

    struct EscrowTransaction {
        address payable buyer;
        address payable seller;
        uint256 amount;
        EscrowStatus status;
        uint256 createdAt;
        uint256 disputeTime;
    }

    mapping(uint256 => EscrowTransaction) public escrows;
    uint256 public escrowCount;

    event EscrowCreated(uint256 indexed escrowId, address indexed buyer, address indexed seller, uint256 amount);
    event EscrowFunded(uint256 indexed escrowId);
    event EscrowCompleted(uint256 indexed escrowId);
    event EscrowDisputed(uint256 indexed escrowId);
    event EscrowResolved(uint256 indexed escrowId, address indexed winner);

    modifier onlyBuyer(uint256 _escrowId) {
        require(msg.sender == escrows[_escrowId].buyer, "Only buyer can call this function");
        _;
    }

    modifier onlySeller(uint256 _escrowId) {
        require(msg.sender == escrows[_escrowId].seller, "Only seller can call this function");
        _;
    }

    modifier inStatus(uint256 _escrowId, EscrowStatus _status) {
        require(escrows[_escrowId].status == _status, "Invalid escrow status");
        _;
    }

    // Create a new escrow transaction
    function createEscrow(address payable _seller) public payable {
        require(msg.value > 0, "Amount must be greater than zero");
        require(_seller != msg.sender, "Buyer cannot be the seller");

        escrowCount++;
        escrows[escrowCount] = EscrowTransaction({
            buyer: payable(msg.sender),
            seller: _seller,
            amount: msg.value,
            status: EscrowStatus.Created,
            createdAt: block.timestamp,
            disputeTime: 0
        });

        emit EscrowCreated(escrowCount, msg.sender, _seller, msg.value);
    }

    // Fund the escrow transaction
    function fundEscrow(uint256 _escrowId) public payable onlyBuyer(_escrowId) inStatus(_escrowId, EscrowStatus.Created) {
        require(msg.value > 0, "Amount must be greater than zero");
        require(msg.value == escrows[_escrowId].amount, "Incorrect amount sent");

        escrows[_escrowId].status = EscrowStatus.Funded;
        emit EscrowFunded(_escrowId);
    }

    // Complete the escrow transaction
    function completeEscrow(uint256 _escrowId) public onlySeller(_escrowId) inStatus(_escrowId, EscrowStatus.Funded) {
        escrows[_escrowId].status = EscrowStatus.Completed;
        escrows[_escrowId].seller.transfer(escrows[_escrowId].amount);
        emit EscrowCompleted(_escrowId);
    }

    // Dispute the escrow transaction
    function disputeEscrow(uint256 _escrowId) public onlyBuyer(_escrowId) inStatus(_escrowId, EscrowStatus.Funded) {
        escrows[_escrowId].status = EscrowStatus.Disputed;
        escrows[_escrowId].disputeTime = block.timestamp;
        emit EscrowDisputed(_escrowId);
    }

    // Resolve the dispute
    function resolveDispute(uint256 _escrowId, address payable _winner) public onlyOwner inStatus(_escrowId, EscrowStatus.Disputed) {
        require(_winner == escrows[_escrowId].buyer || _winner == escrows[_escrowId].seller, "Invalid winner");

        escrows[_escrowId].status = EscrowStatus.Resolved;
        escrows[_escrowId].amount = 0; // Prevent re-entrancy
        _winner.transfer(escrows[_escrowId].amount);
        emit EscrowResolved(_escrowId, _winner);
    }

    // Get escrow details
    function getEscrowDetails(uint256 _escrowId) public view returns (
        address buyer,
        address seller,
        uint256 amount,
        EscrowStatus status,
        uint256 createdAt,
        uint256 disputeTime
    ) {
        EscrowTransaction memory escrow = escrows[_escrowId];
        return (escrow.buyer, escrow.seller, escrow.amount, escrow.status, escrow.createdAt, escrow.disputeTime);
    }
}
