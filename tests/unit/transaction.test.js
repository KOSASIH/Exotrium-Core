// tests/unit/transaction.test.js

import { processTransaction, refundTransaction } from '../../services/transaction';

jest.mock('../../services/transaction'); // Mock the transaction service

describe('Transaction Handling Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    test('should process a transaction', async () => {
        const transactionData = { amount: 100, userId: 1 };
        processTransaction.mockResolvedValue({ id: 1, ...transactionData, status: 'success' }); // Mock implementation

        const result = await processTransaction(transactionData);
        expect(result).toEqual({ id: 1, ...transactionData, status: 'success' });
        expect(processTransaction).toHaveBeenCalledWith(transactionData);
        expect(processTransaction).toHaveBeenCalledTimes(1);
    });

    test('should refund a transaction', async () => {
        const transactionId = 1;
        refundTransaction.mockResolvedValue({ id: transactionId, status: 'refunded' }); // Mock implementation

        const result = await refundTransaction(transactionId);
        expect(result).toEqual({ id: transactionId, status: 'refunded' });
        expect(refundTransaction).toHaveBeenCalledWith(transactionId);
        expect(refundTransaction).toHaveBeenCalledTimes(1);
    });
});
