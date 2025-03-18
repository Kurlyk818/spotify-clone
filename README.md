
This is a Spotify clone built with React, Tailwind CSS, Express, and MongoDB. The project includes both frontend and backend components.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Clone the repository

\`\`\`bash
git clone https://github.com/your-username/spotify-clone.git
cd spotify-clone
\`\`\`

### Install dependencies

\`\`\`bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
\`\`\`

## Environment Variables

### Backend
Create a \`.env\` file in the \`backend\` directory and add the following variables:

\`\`\`ini
PORT=5000
MONGODB_URI=your_mongodb_uri
ADMIN_EMAIL=your_admin_email
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NODE_ENV=development    
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
\`\`\`

### Frontend
Create a \`.env.local\` file in the \`frontend\` directory and add the following variable:

\`\`\`ini
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
\`\`\`

## Running the Project

### Start the Backend
\`\`\`bash
cd backend
npm start
\`\`\`

### Start the Frontend
\`\`\`bash
cd frontend
npm run dev
\`\`\`

Once started, open your browser and go to [http://localhost:3000](http://localhost:3000).

## Project Structure

\`\`\`
spotify-clone/
│── backend/   # Server-side (Express, MongoDB)
│── frontend/  # Client-side (React, Vite, Tailwind CSS)
│── .gitignore
│── README.md
│── package.json
\`\`\`

## Features

- 🎵 **User authentication** with Clerk
- 🎛 **Admin panel** for managing songs and albums
- 📂 **Upload and manage** audio and image files with Cloudinary
- 🔄 **Real-time updates** with Socket.io
- 📱 **Responsive design** with Tailwind CSS

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the **MIT License**.
`;