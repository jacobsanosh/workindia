# Railway Management System

## Overview

The Railway Management System is a Node.js application designed to manage train schedules, bookings, and seat availability. This system allows users to book tickets, check train availability, and provides administrative features for train management.

## Features

- **Add Train**: Admins can add new trains with specified routes and bogies.
- **Get Seat Availability**: Users can search for available trains between specific routes.
- **Book Ticket**: Users can book a seat on a train.
- **Retrieve User Bookings**: Users can view their booking details.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework for Node.js
- **Sequelize**: ORM for database interactions
- **MySQL**: Relational database management system
- **jsonwebtoken**: For handling JWT authentication

## Setup

### Prerequisites

- Node.js and npm installed
- MySQL server running

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/railway-management-system.git
   cd railway-management-system

## install all dependencies
    npm install
    

then set the env file contents

MYSQL_USERNAME=
MYSQL_PASSWORD=
DB_NAME=
MYSQL_HOST= 
NODE_ENV=
JWT_SECRET_KEY=
PORT=
ADMIN_KEY=

## Run the application
    npm start

## all the routes are protected

## end points are
- auth/login
- auth/register

# to access the add route the admin has to pass the auth key in the header
- train/add
- train/availability
- train/book
- train/bookingsDetails




