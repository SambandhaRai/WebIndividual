import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { toast } from 'react-toastify';
import { createBookingApi, getAllRooms, getAvailableRooms } from '../apis/api'; 
import { Bed, ShowerHead, UsersIcon, ExpandIcon } from "lucide-react";
import {
    Container,
    NavContainer,
    Nav,
    NavList,
    NavItem,
    Icons,
    IconText,
    Content,
    Info,
    DateInputWrapper,
    DateInputContainer,
    DateInput,
    Label,
    DatePickerWrapper,
    Room,
    RoomInput,
    RoomIcons,
    RoomIconText,
    Quantity,
    QuantityInput,
    Button,
    Display,
    RoomCard,
    RoomImage,
    RoomInfo,
    PriceIconText
} from "../styles/book";

function Book() {
    const navigate = useNavigate();
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [roomQuantity, setRoomQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [rooms, setRooms] = useState([]); // State to store all rooms
    const [availableRooms, setAvailableRooms] = useState([]); // State to store available rooms

    // Fetch rooms when the component mounts
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getAllRooms();
                setRooms(response.data); // Set the fetched rooms to state
            } catch (error) {
                console.error("Failed to fetch rooms:", error);
                toast.error("Failed to load rooms. Please try again later.");
            }
        };

        fetchRooms();
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formattedStartDate = formatDate(dateRange[0].startDate);
    const formattedEndDate = formatDate(dateRange[0].endDate);

    const handleRoomChange = (e) => {
        setSelectedRoom(e.target.value);
    };

    const handleRoomQuantityChange = (e) => {
        setRoomQuantity(e.target.value);
    };

    const handleSearch = async () => {
        if (!selectedRoom) {
            toast.error("Please select a room type.");
            return;
        }
    
        if (roomQuantity < 1) {
            toast.error("Please select a valid room quantity.");
            return;
        }
    
        if (dateRange[0].startDate >= dateRange[0].endDate) {
            toast.error("Check-out date must be after check-in date.");
            return;
        }
    
        const searchData = {
            roomId: selectedRoom,
            checkInDate: dateRange[0].startDate.toISOString(),
            checkOutDate: dateRange[0].endDate.toISOString(),
            roomQuantity: parseInt(roomQuantity, 10),
        };
    
        setIsLoading(true);
    
        try {
            const response = await getAvailableRooms(searchData);
            console.log("API Response:", response.data);
    
            const mappedRooms = response.data.map((room) => ({
                id: room.id,
                name: room.name || "Unnamed Room",
                price: room.price || 0,
                adultOccupants: room.adultOccupants || 0,
                childOccupants: room.childOccupants || 0,
                imageUrl: room.imageUrl, 
                bedType: room.bedType || "N/A", 
                bathroom: room.bathroom || "N/A", 
                roomType: room.roomType || "N/A", 
                area: room.area || 0, 
            }));
    
            setAvailableRooms(mappedRooms);
            toast.success("Available rooms fetched successfully!");
        } catch (error) {
            console.error("Search failed:", error);
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Failed to fetch available rooms. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleBooking = async (roomId) => {

        // Show confirmation dialog
        const confirmBooking = window.confirm("Are you sure you want to book this room?");
        if (!confirmBooking) {
            return; // Exit if the user cancels the booking
        }

        const userId = localStorage.getItem('user');
        if (!userId) {
            toast.error("Please log in first to book a room.");
            navigate("/login")
            return;
        }
        
        // Validate inputs
        if (!selectedRoom) {
            toast.error("Please select a room type.");
            return;
        }
    
        if (roomQuantity < 1) {
            toast.error("Please select a valid room quantity.");
            return;
        }
    
        if (dateRange[0].startDate >= dateRange[0].endDate) {
            toast.error("Check-out date must be after check-in date.");
            return;
        }
    
        // Prepare booking data
        const bookingData = {
            userId: localStorage.getItem('userId'), // Ensure userId is set in localStorage
            roomId: roomId, // Use the selected room ID
            checkInDate: dateRange[0].startDate.toISOString(),
            checkOutDate: dateRange[0].endDate.toISOString(),
            roomQuantity: parseInt(roomQuantity, 10),
        };
    
        setIsLoading(true);
    
        try {
            // Call the API to create a booking
            const response = await createBookingApi(bookingData);
            toast.success("Booking created successfully!");
            navigate('/book'); // Redirect to the bookings page
        } catch (error) {
            console.error("Booking failed:", error);
    
            // Display specific error message from the backend
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Failed to create booking. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <NavContainer>
                <Nav>
                    <NavList>
                        <NavItem>
                            <Link to="/home">
                                <Icons>
                                    <IconText>
                                        <ArrowLeft size={20} color="black" />
                                        <span> Home</span>
                                    </IconText>
                                </Icons>
                            </Link>
                        </NavItem>
                        <NavItem>
                            RESORT
                        </NavItem>
                    </NavList>
                </Nav>
            </NavContainer>
            <Content>
                <Info>
                    <DateInputWrapper>
                        <DateInputContainer>
                            <Label>Booking Date:</Label>
                            <DateInput
                                type="text"
                                readOnly
                                value={`${formattedStartDate}       -       ${formattedEndDate}`}
                                onClick={() => {
                                    console.log("Toggling calendar:", !showCalendar); // Debugging
                                    setShowCalendar(!showCalendar);
                                }}
                            />
                            {showCalendar && (
                                <DatePickerWrapper>
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) => setDateRange([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dateRange}
                                        minDate={new Date()}
                                    />
                                    <button onClick={() => setShowCalendar(false)}>Confirm</button>
                                </DatePickerWrapper>
                            )}
                        </DateInputContainer>
                    </DateInputWrapper>

                    <Room>
                        <Label>Room:</Label>
                        <RoomInput as="select" value={selectedRoom} onChange={handleRoomChange}>
                            <option value="">Select Room</option>
                            {rooms.map((room) => ( // Populate dropdown with fetched rooms
                                <option key={room.id} value={room.id}>
                                    {room.name} {/* Only show the room name */}
                                </option>
                            ))}
                        </RoomInput>
                    </Room>

                    <Quantity>
                        <Label>Quantity:</Label>
                        <QuantityInput as="select" value={roomQuantity} onChange={handleRoomQuantityChange}>
                            {[...Array(10)].map((_, index) => (
                                <option key={index} value={index + 1}>
                                    {index + 1} Room{index > 0 ? 's' : ''}
                                </option>
                            ))}
                        </QuantityInput>
                    </Quantity>

                    <Button onClick={handleSearch} disabled={isLoading}>
                        {isLoading ? 'Searching...' : 'Search'}
                    </Button>
                </Info>
                <Display>
                    {availableRooms.length > 0 ? (
                        availableRooms.map((room) => (
                            <RoomCard key={room.id}>

                                <RoomImage>
                                    <img src={room.imageUrl} alt={room.name} />
                                </RoomImage>

                                <RoomInfo>
                                    <h2>{room.name}</h2>

                                    <PriceIconText>
                                        <span>Price: {room.price} NPR</span>
                                    </PriceIconText>

                                    <RoomIcons>

                                        <RoomIconText>
                                            <Bed size={20} />
                                            <span>{room.bedType}</span>
                                        </RoomIconText>

                                        {room.roomType === "Suite" && (
                                            <RoomIconText>
                                                <ExpandIcon size={20} />
                                                <span>{room.area} m²</span>
                                            </RoomIconText>
                                        )}

                                        <RoomIconText>
                                            <UsersIcon size={20} />
                                            <span>{room.adultOccupants} Adults + {room.childOccupants} Children</span>
                                        </RoomIconText>

                                        <RoomIconText>
                                            <ShowerHead size={20} />
                                            <span>{room.bathroom}</span>
                                        </RoomIconText>
                                    </RoomIcons>

                                    <Button onClick={() => handleBooking(room.id)}>Book Now</Button>
                                </RoomInfo>
                            </RoomCard>
                        ))
                    ) : (
                        <p>No available rooms found.</p>
                    )}
                </Display>
            </Content>
        </Container>
    );
}

export default Book;