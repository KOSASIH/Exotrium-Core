// tests/unit/marketplace.test.js

import { getMarketplaceItems, addItemToMarketplace } from '../../services/marketplace';

jest.mock('../../services/marketplace'); // Mock the marketplace service

describe('Marketplace Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    test('should fetch marketplace items', async () => {
        const mockItems = [
            { id: 1, name: 'Item 1', price: 100 },
            { id: 2, name: 'Item 2', price: 200 },
        ];
        getMarketplaceItems.mockResolvedValue(mockItems); // Mock implementation

        const items = await getMarketplaceItems();
        expect(items).toEqual(mockItems);
        expect(getMarketplaceItems).toHaveBeenCalledTimes(1);
    });

    test('should add an item to the marketplace', async () => {
        const newItem = { name: 'New Item', price: 150 };
        addItemToMarketplace.mockResolvedValue({ id: 3, ...newItem }); // Mock implementation

        const addedItem = await addItemToMarketplace(newItem);
        expect(addedItem).toEqual({ id: 3, ...newItem });
        expect(addItemToMarketplace).toHaveBeenCalledWith(newItem);
        expect(addItemToMarketplace).toHaveBeenCalledTimes(1);
    });
});
