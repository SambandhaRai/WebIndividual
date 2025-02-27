import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";
import { User } from "../user/userSchema.js";  // Import User model
import { Room } from "../room/roomSchema.js";  // Import Room model

export const Booking = sequelize.define("Booking", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,  // Reference to the User model
            key: 'id',    // Foreign key to the User's id
        },
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    userContact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Room,  // Reference to the Room model
            key: 'id',    // Foreign key to the Room's id
        },
    },
    roomName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    checkInDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    roomQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    pricePerNight: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
        defaultValue: "pending",
    },
}, {
    timestamps: true,
});

// Associations
Room.hasMany(Booking, { foreignKey: "roomId", onDelete: "CASCADE" }); // A room can have many bookings
Booking.belongsTo(Room, { foreignKey: "roomId" }); // Each booking belongs to a room

User.hasMany(Booking, { foreignKey: "userId", onDelete: "CASCADE" }); // A user can have many bookings
Booking.belongsTo(User, { foreignKey: "userId" }); // Each booking belongs to a user
