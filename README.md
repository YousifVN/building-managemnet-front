# Building Management Frontend

This is the frontend for the Building Management System. It is built using Vue.js and integrates with Firebase for real-time device management.

### Related Repositories
This project works in conjunction with the [Building Management ESP Code](https://github.com/YousifVN/building-managemnet-esp32) repository, which contains the ESP32 code for device management.

## Project Overview

The Building Management System is designed to provide an efficient way to control and monitor devices in a building. The system allows users to toggle devices ON/OFF, track their usage time, and calculate the associated costs. This is achieved through a combination of a web-based interface and physical buttons on a breadboard, offering flexibility and ease of use.

## Usage

The project allows you to control devices either through the website or using physical buttons on a breadboard. The buttons perform the following actions:

- **Button 1**: Toggles the Air Conditioner ON/OFF.
- **Button 2**: Toggles the Refrigerator ON/OFF.
- **Button 3**: Toggles the Smart Curtain ON/OFF.
- **Button 4**: Toggles all devices ON/OFF.
- **Button 5**: Toggles both the Air Conditioner and Smart Curtain ON/OFF simultaneously.

You can customize the buttons and their actions based on your project requirements.

## Features
- Manage devices like Air Conditioner, Refrigerator, and Smart Curtain.
- Real-time synchronization with Firebase.

## Project Structure
```
/Users/yousifmahmood/coding-projects/my-building-managemnet-front
├── src/
│   ├── components/       # Vue components
│   ├── layouts/          # Layout files
│   ├── locale/           # Localization files
│   ├── pages/            # Page components
│   ├── plugins/          # Vue plugins
│   ├── router/           # Vue Router configuration
│   ├── stores/           # Pinia stores
│   ├── styles/           # SCSS and CSS files
│   └── utils/            # Utility functions
├── public/               # Static assets
├── package.json          # Project dependencies
└── vite.config.mts       # Vite configuration
```

## Setup

### Prerequisites
- Node.js (>= 16.x)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YousifVN/building-managemnet-front
   cd building-managemnet-front
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
Start the development server:
```bash
npm run dev
```

### Build for Production
Build the project for production:
```bash
npm run build
```

### Linting
Run linting:
```bash
npm run lint
```

## Environment Variables

The frontend project uses a `.env` file to store sensitive information. Below is a description of the environment variables required:

- `VITE_FIREBASE_EMAIL`: The email address for Firebase authentication.
- `VITE_FIREBASE_PASSWORD`: The password for Firebase authentication.
- `VITE_FIREBASE_API_KEY`: The API key for your Firebase project.
- `VITE_BASE_URL`: The base URL of your Firebase Realtime Database.
- `VITE_FIREBASE_PROJECT_ID`: The project ID of your Firebase project.
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: The messaging sender ID for Firebase Cloud Messaging.
- `VITE_FIREBASE_APP_ID`: The app ID for your Firebase project.

### Important
- **Do not commit the `.env` file to version control.**
- Replace the placeholder values with your own Firebase project credentials.

## Schema

Below is a placeholder schema that can be adapted to your specific project needs:

```json
{
  "leds": {
    "led1": false,
    "led2": false,
    "led3": false
  },
  "devices": {
    "device1": {
      "name": "Device 1",
      "state": false,
      "wattage": 0,
      "pricePerKwh": 0.0,
      "usage": {
        "totalHours": 0,
        "totalCost": 0.0,
        "lastOn": null,
        "lastOff": null
      }
    },
    "device2": {
      "name": "Device 2",
      "state": false,
      "wattage": 0,
      "pricePerKwh": 0.0,
      "usage": {
        "totalHours": 0,
        "totalCost": 0.0,
        "lastOn": null,
        "lastOff": null
      }
    }
  }
}
```

## Contributing
Feel free to submit issues or pull requests for improvements.
