import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css";
import { Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
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
    Quantity,
    QuantityInput
} from "../styles/book";

function Book() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [roomQuantity, setRoomQuantity] = useState(1); // State for room quantity

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formattedStartDate = formatDate(dateRange[0].startDate);
    const formattedEndDate = formatDate(dateRange[0].endDate);

    const roomOptions = [
        { id: 1, label: 'Single Room', value: 'single' },
        { id: 2, label: 'Double Room', value: 'double' },
        { id: 3, label: 'Suite Room', value: 'suite' },
    ];

    const handleRoomChange = (e) => {
        setSelectedRoom(e.target.value);
    };

    const handleRoomQuantityChange = (e) => {
        setRoomQuantity(e.target.value); // Update room quantity
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
                                value={`${formattedStartDate}           -           ${formattedEndDate}`}
                                onClick={() => setShowCalendar(!showCalendar)}
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
                            {roomOptions.map((room) => (
                                <option key={room.id} value={room.value}>
                                    {room.label}
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
                </Info>
            </Content>
        </Container>
    );
}

export default Book;