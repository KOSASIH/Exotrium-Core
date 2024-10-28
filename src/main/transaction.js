// src/main/transaction.js

const express = require('express');
const { Transaction } = require('./models/Transaction'); // Assuming you have a Transaction model defined
const { User } = require('./models/User'); // Assuming you have a User model defined
const { validateTransaction } = require('./middleware/validation'); // Validation middleware
const { authenticate } = require('./middleware/auth'); // Authentication middleware
const router = express.Router();

// Create a new transaction
router.post('/', authenticate, validateTransaction, async (req, res) => {
    try {
        const { productId, buyerId, sellerId, amount } = req.body;

        // Create a new transaction
        const newTransaction = new Transaction({
            productId,
            buyerId: req.user.id, // Use authenticated user's ID
            sellerId,
            amount,
            status: 'pending', // Initial status
        });

        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get transaction history for a user
router.get('/history', authenticate, async (req, res) => {
    try {
        const userId = req.user.id; // Use authenticated user's ID
        const transactions = await Transaction.find({
            $or: [{ buyerId: userId }, { sellerId: userId }],
        }).populate('productId', 'name price') // Populate product details
          .populate('buyerId', 'username') // Populate buyer details
          .populate('sellerId', 'username') // Populate seller details
          .sort({ createdAt: -1 }); // Sort by most recent

        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a single transaction by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
            .populate('productId', 'name price')
            .populate('buyerId', 'username')
            .populate('sellerId', 'username');

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Ensure the user is either the buyer or seller
        if (transaction.buyerId.toString() !== req.user.id && transaction.sellerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(transaction);
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update transaction status (e.g., to 'completed' or 'canceled')
router.put('/:id/status', authenticate, async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'completed', 'canceled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Ensure only the seller can update the status
        if (transaction.sellerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        transaction.status = status;
        await transaction.save();
        res.json(transaction);
    } catch (error) {
        console.error('Error updating transaction status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a transaction (optional, depending on your business logic)
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Ensure only the seller can delete the transaction
        if (transaction.sellerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        await transaction.remove();
        res.json({ message: 'Transaction deleted successfully' });
 } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
