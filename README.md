# EventsCons Conference Management System

## Description

EventsCons is a comprehensive conference and event management platform built with React. This system provides a complete solution for organizing and managing conferences, exhibitions, workshops, and other corporate events. The platform offers separate interfaces for users and administrators with extensive functionality for registration, payment processing, scheduling, and content management.

## Key Features

### User Features
- **Event Registration**: Multiple registration types (speaker, attendance, group, sponsor)
- **Payment Processing**: Integrated payment system with Stripe and PayPal
- **Conference Information**: Detailed conference pages with schedules, speakers, and pricing
- **Paper Submission**: Scientific paper submission system for conferences
- **Flight Booking**: Flight reservation system with companion options
- **Trip Management**: Tour and trip booking functionality
- **Visa Services**: Visa application assistance and processing
- **Gallery**: Event photo galleries and albums
- **Job Portal**: Job listings and application system

### Admin Features
- **Dashboard**: Comprehensive overview of system metrics
- **User Management**: Admin panel for managing all user types
- **Conference Management**: Create and manage conferences, schedules, and speakers
- **Payment Tracking**: Monitor all payment transactions
- **Booking Management**: Manage flight, trip, and accommodation bookings
- **Content Management**: Update website content, galleries, and media
- **Reports**: Generate reports on attendance, payments, and other metrics
- **Notifications**: System for sending messages to users

### Additional Services
- **Event Planning**: Corporate meetings, seminars, and workshops
- **Media Campaigns**: Marketing and promotional services
- **Logistics**: Secretarial services and event logistics
- **Travel Consulting**: Travel and accommodation planning
- **Exhibition Management**: Booth management and exhibition services

## Technology Stack

### Frontend
- **React** (v18.3.1) - Core framework
- **React Router** (v6.28.0) - Routing
- **Material-UI** (v6.4.5) - UI components
- **Bootstrap** (v5.3.3) - CSS framework
- **Sass** - CSS preprocessor
- **Axios** - HTTP client
- **Chart.js** - Data visualization

### Key Libraries
- `@mui/material` - Material Design components
- `@mui/x-data-grid` - Data grid component
- `react-icons` - Icon library
- `react-slick` - Carousel component
- `react-toastify` - Notification system
- `react-helmet` - Document head management
- `moment` - Date and time handling
- `stripe` - Payment processing

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/               # Page components
├── layouts/             # Layout components (UserLayout, AdminLayout)
├── constant/            # Configuration files
├── assets/              # Static assets (images, styles)
├── common/              # Shared utilities and context
└── style.scss           # Global styles
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with necessary environment variables:
```env
REACT_APP_BASE_URL=https://eventscons.com/backend
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development server:
```bash
npm start
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs tests
- `npm eject` - Ejects from Create React App (irreversible)

## Deployment

The app is configured to be deployed to `https://eventscons.com` as specified in the package.json file.

## Backend Integration

The frontend connects to a backend API hosted at `https://eventscons.com/backend` as defined in the config file. All API calls are made using Axios with Bearer token authentication.

## Authentication

The system implements role-based authentication with different access levels:
- **Regular Users**: Access to registration, booking, and personal dashboard
- **Admin Users**: Full access to admin panel and management features
- **Speakers**: Special access to speaker-specific features
- **Sponsors**: Sponsor-specific dashboard and options

## Responsive Design

The application is built with responsive design principles using Bootstrap and custom CSS to ensure optimal viewing experience across all devices.

## Browser Support

The application supports modern browsers including:
- Latest versions of Chrome, Firefox, Safari
- Edge (latest versions)
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is proprietary software developed for EventsCons. All rights reserved.

## Support

For support, contact the development team or refer to the documentation.
