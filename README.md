<img width="1919" height="904" alt="image" src="https://github.com/user-attachments/assets/15dbde0c-51f0-4ff2-a278-3e8a875743bb" />

# OutletOS

Welcome to the OutletOS project!  
A cutting-edge web application built with React, TypeScript, and Vite, designed to streamline management across various business outlets.

## Project Structure
- **React + TypeScript + Vite**: Leverage the speed of Vite and the robustness of TypeScript to create a modern web application.

## Features
- **Authentication**: Secure login and registration system for users
- **Dashboard**: Dynamic and interactive dashboard for quick insights and analytics
- **Outlets Management**: Manage various business outlets efficiently
- **User Management**: Control user roles and access permissions within the application
- **Settings**: Customize application settings based on user preferences
- **Dark/Light Theme Support**: Toggle between dark and light modes for optimal viewing experience
- **Responsive Design**: Beautiful UI built with Radix UI components and Tailwind CSS
- **Real-time Notifications**: Toast notifications powered by Sonner

## Tech Stack
- **Frontend**: React 19.2.0 with TypeScript 5.9.3
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 4.1.18 with animations
- **UI Components**: Radix UI, Lucide React icons, Iconify
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand
- **Routing**: React Router v7
- **Charts**: Recharts for data visualization
- **HTTP Client**: Axios
- **Code Quality**: ESLint 9.39.1 with TypeScript support

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/akashpaul404/outletos.git
   ```

2. Navigate to the project directory:
   ```bash
   cd outletos
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Build
Create an optimized production build:
```bash
npm run build
```

### Preview
Preview the production build locally:
```bash
npm run preview
```

### Linting
Run ESLint to check code quality:
```bash
npm run lint
```

## Project Architecture
```
src/
├── app/              # Application-level routing and configuration
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable UI components
├── features/         # Feature modules
│   ├── auth/         # Authentication module
│   ├── dashboard/    # Dashboard module
│   ├── outlets/      # Outlets management module
│   ├── users/        # User management module
│   ├── settings/     # Settings module
│   └── not-found/    # 404 page
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and helpers
├── services/         # API services and external integrations
├── store/            # Zustand state management
├── types/            # TypeScript type definitions
└── utils/            # General utility functions
```

## Features in Detail

### Authentication
Secure user authentication with session management and protected routes.

### Dashboard
Analytics and insights displayed through interactive charts and real-time data visualization.

### Outlet Management
Complete CRUD operations for managing multiple business outlets with detailed information and analytics.

### User Management
Admin panel for managing user accounts, roles, and permissions.

### Settings
User preferences including theme selection, notification settings, and more.

## Live Demo
Visit the live application: [https://outletos.vercel.app](https://outletos.vercel.app)

## Contributing
We welcome contributions to improve OutletOS! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Author
Developed by [akashpaul404](https://github.com/akashpaul404)

## Support
For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/akashpaul404/outletos/issues).
