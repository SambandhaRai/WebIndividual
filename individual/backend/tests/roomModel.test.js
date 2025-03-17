const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const RoomMock = dbMock.define("Rooms", {
    id: 1,
    roomType: 'Room',
    name: 'Test Room',
    details: 'This is a Test Room',
    imageUrl: 'Test.jpg',
    bathroom: '1',
    adultOccupants: '2',
    childOccupants: '1',
    price: '999.99'
});

// Mock the create method to enforce validation
RoomMock.create = async (data) => {
    if (!data.name || !data.price) {
        throw new Error("Validation error: name and price are required");
    }
    return RoomMock.build(data);
};

describe("Room Model", () => {
    it('should create a room', async () => {
        const room = await RoomMock.create({
            roomType: 'Room',
            name: 'New Room',
            details: 'This is a New Test Room',
            imageUrl: 'NewTest.jpg',
            bathroom: '2',
            adultOccupants: '2',
            childOccupants: '2',
            price: '1999.99',
        });

        expect(room.roomType).toBe('Room');
        expect(room.name).toBe('New Room');
        expect(room.details).toBe('This is a New Test Room');
        expect(room.imageUrl).toBe('NewTest.jpg');
        expect(room.bathroom).toBe('2');
        expect(room.adultOccupants).toBe('2');
        expect(room.childOccupants).toBe('2');
        expect(room.price).toBe('1999.99');
    });

    it('should require a room name and price', async () => {
        await expect(RoomMock.create({})).rejects.toThrow("Validation error: name and price are required");
    });
});