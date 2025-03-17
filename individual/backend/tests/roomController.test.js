import roomController from '../controller/room/roomController.js';
import Room from '../model/room/roomSchema.js';

// Mock the Room model
jest.mock('../model/room/roomSchema.js', () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));

describe('Room Controller', () => {
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    it('should create a new room', async () => {
        const req = {
            body: {
                roomType: 'Room',
                name: 'Test Room',
                details: 'This is a Test Room',
                imageUrl: 'Test.jpg',
                bathroom: '1',
                adultOccupants: '2',
                childOccupants: '1',
                price: '999.99',
            },
        };
        const res = mockResponse();
        Room.create.mockResolvedValue(req.body);

        await roomController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining(req.body));
    });

    it('should return all rooms', async () => {
        const req = {};
        const res = mockResponse();
        Room.findAll.mockResolvedValue([
            {
                id: 1,
                name: 'Test Room',
                details: 'This is a Test Room',
                imageUrl: 'Test.jpg',
                bathroom: '1',
                adultOccupants: '2',
                childOccupants: '1',
                price: '999.99',
            },
        ]);

        await roomController.getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    id: 1,
                    name: 'Test Room',
                    details: 'This is a Test Room',
                    imageUrl: 'Test.jpg',
                    bathroom: '1',
                    adultOccupants: '2',
                    childOccupants: '1',
                    price: '999.99',
                }),
            ]),
        );
    });

    it('should return a room by Id', async () => {
        const req = { params: { id: 1 } };
        const res = mockResponse();
        Room.findByPk.mockResolvedValue({
            id: 1,
            name: 'Test Room',
            details: 'This is a Test Room',
            imageUrl: 'Test.jpg',
            bathroom: '1',
            adultOccupants: '2',
            childOccupants: '1',
            price: '999.99',
        });

        await roomController.getById(req, res);

        expect(res.status).toHaveBeenCalledWith(200); 
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 1,
                name: 'Test Room',
                details: 'This is a Test Room',
                imageUrl: 'Test.jpg',
                bathroom: '1',
                adultOccupants: '2',
                childOccupants: '1',
                price: '999.99',
            }),
        );
    });

    it('should return 404 if room not found', async () => {
        const req = { params: { id: 2 } };
        const res = mockResponse();
        Room.findByPk.mockResolvedValue(null);

        await roomController.getById(req, res);

        expect(res.status).toHaveBeenCalledWith(404); 
        expect(res.json).toHaveBeenCalledWith({ error: 'Room not found' });
    });
});