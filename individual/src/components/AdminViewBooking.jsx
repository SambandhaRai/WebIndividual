import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MenuIcon, PlusSquare, LogOut, Edit, ViewIcon } from "lucide-react";
import { getUserBookingsApi, logout, updateBookingApi, cancelBookingApi, deleteBookingApi } from "../apis/api";
import {
    Container,
    Sidebar,
    SidebarNav,
    SidebarContent,
    SideIcons,
    SideIconText,
    Main,
    NavContainer,
    Nav,
    Icons,
    IconText,
    Content,
    FormContainer,
    Title,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    ActionButton,
    LoadingContainer,
    LoadingDots,
    LoadingDot,
    LoadingText,
} from "../styles/adminView";

const ViewBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch all bookings
    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await getUserBookingsApi("all"); // Fetch all bookings
            setBookings(response.bookings || []);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            toast.error("Failed to fetch bookings. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings(); // Initial fetch when the component mounts
    }, []);

    // Handle confirm booking
    const handleConfirmBooking = async (bookingId) => {
        try {
            await updateBookingApi(bookingId, { status: "confirmed" });
            toast.success("Booking confirmed successfully!");
            setBookings((prev) =>
                prev.map((booking) =>
                    booking.id === bookingId ? { ...booking, status: "confirmed" } : booking
                )
            );
        } catch (error) {
            console.error("Error confirming booking:", error);
            toast.error("Failed to confirm booking. Please try again.");
        }
    };

    // Handle cancel booking
    const handleCancelBooking = async (bookingId) => {
        try {
            await cancelBookingApi(bookingId);
            toast.success("Booking cancelled successfully!");
            setBookings((prev) =>
                prev.map((booking) =>
                    booking.id === bookingId ? { ...booking, status: "cancelled" } : booking
                )
            );
        } catch (error) {
            console.error("Error cancelling booking:", error);
            toast.error("Failed to cancel booking. Please try again.");
        }
    };

    const handleDeleteBooking = async (bookingId) => {
        try {
            // Call the delete API to remove the booking from the database
            await deleteBookingApi(bookingId);
    
            // Update the state to remove the deleted booking from the bookings array
            setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking.id !== bookingId)
            );
    
            // Show a success toast message
            toast.success("Booking deleted successfully!");
        } catch (error) {
            console.error("Error deleting booking:", error);
            toast.error("Failed to delete booking. Please try again.");
        }
    };    

    // Handle logout
    const handleLogout = () => {
        logout();
    };

    return (
        <Container>
            <Sidebar>
                <SidebarNav>
                    <Link to="/dashboard">
                        <Icons>
                            <IconText>
                                <MenuIcon size={25} color="black" />
                                <span> Dashboard</span>
                            </IconText>
                        </Icons>
                    </Link>
                </SidebarNav>
                <SidebarContent>
                    <Link to="/adminadd">
                        <SideIcons>
                            <SideIconText>
                                <PlusSquare size={25} color="black" />
                                <span> Add Room</span>
                            </SideIconText>
                        </SideIcons>
                    </Link>
                    <Link to="/adminupd">
                        <SideIcons>
                            <SideIconText>
                                <Edit size={25} color="black" />
                                <span> Update Room</span>
                            </SideIconText>
                        </SideIcons>
                    </Link>
                    <Link to="/addexp">
                        <SideIcons>
                            <SideIconText>
                                <PlusSquare size={25} color="black" />
                                <span> Add Experience</span>
                            </SideIconText>
                        </SideIcons>
                    </Link>
                    <Link to="/updexp">
                        <SideIcons>
                            <SideIconText>
                                <Edit size={25} color="black" />
                                <span> Update Experience</span>
                            </SideIconText>
                        </SideIcons>
                    </Link>
                    <Link to="/viewbooking">
                        <SideIcons>
                            <SideIconText>
                                <ViewIcon size={25} color="black" />
                                <span> View Booking</span>
                            </SideIconText>
                        </SideIcons>
                    </Link>
                    <SideIcons>
                        <SideIconText onClick={handleLogout}>
                            <LogOut size={25} color="black" />
                            <span> Logout</span>
                        </SideIconText>
                    </SideIcons>
                </SidebarContent>
            </Sidebar>
            <Main>
                <NavContainer>
                    <Nav>
                        <h1>ADMIN</h1>
                    </Nav>
                </NavContainer>
                <Content>
                    <FormContainer>
                        <Title>View Bookings</Title>
                        {loading ? (
                            <LoadingContainer>
                                <LoadingDots>
                                    <LoadingDot />
                                    <LoadingDot />
                                    <LoadingDot />
                                </LoadingDots>
                                <LoadingText>Loading bookings...</LoadingText>
                            </LoadingContainer>
                        ) : (
                            <Table>
                                <thead>
                                    <TableRow>
                                        <TableHeader>Booking ID</TableHeader>
                                        <TableHeader>User Name</TableHeader>
                                        <TableHeader>Email</TableHeader>
                                        <TableHeader>Room Name</TableHeader>
                                        <TableHeader>Check-In Date</TableHeader>
                                        <TableHeader>Check-Out Date</TableHeader>
                                        <TableHeader>Status</TableHeader>
                                        <TableHeader>Total Price</TableHeader>
                                        <TableHeader>Actions</TableHeader>
                                    </TableRow>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell>{booking.id}</TableCell>
                                            <TableCell>{booking.user?.name || "N/A"}</TableCell>
                                            <TableCell>{booking.user?.email || "N/A"}</TableCell>
                                            <TableCell>{booking.room?.name || "N/A"}</TableCell>
                                            <TableCell>{new Date(booking.checkInDate).toLocaleDateString()}</TableCell>
                                            <TableCell>{new Date(booking.checkOutDate).toLocaleDateString()}</TableCell>
                                            <TableCell>{booking.status}</TableCell>
                                            <TableCell>{booking.totalPrice ? `Rs. ${booking.totalPrice.toFixed(2)}` : "N/A"}</TableCell>
                                            <TableCell>
                                                {booking.status === "pending" && (
                                                    <ActionButton onClick={() => handleConfirmBooking(booking.id)}>Confirm</ActionButton>
                                                )}
                                                {booking.status !== "cancelled" && (
                                                    <ActionButton onClick={() => handleCancelBooking(booking.id)}>Cancel</ActionButton>
                                                )}
                                                {(booking.status === "confirmed" || booking.status === "cancelled") && (
                                                    <ActionButton onClick={() => handleDeleteBooking(booking.id)}>Delete</ActionButton>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </FormContainer>
                </Content>
            </Main>
        </Container>
    );
};

export default ViewBooking;
