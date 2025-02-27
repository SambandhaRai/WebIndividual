import { Room } from "./room/roomSchema.js";
import { Booking } from "./booking/bookingSchema.js";
import { User } from "./user/userSchema.js";

Room.hasMany(Booking, { foreignKey: "roomId", onDelete: "CASCADE" });
Booking.belongsTo(Room, { foreignKey: "roomId" });

User.hasMany(Booking, { foreignKey: "userId", onDelete: "CASCADE" });
Booking.belongsTo(User, { foreignKey: "userId" });

export { Room, Booking, User };