# Pass 1 and Pass 2 Assembler

This project implements a two-pass assembler using React for the frontend and Flask (or Express) for the backend. Users can upload assembly input files, and the application processes them to generate outputs for Pass 1 and Pass 2, including the Symbol Table.

## Features

- Upload assembly input files (`input.txt` and `optab.txt`).
- Display results for:
  - Pass 1 (Intermediate Code)
  - Pass 2 (Object Code)
  - Symbol Table Output
- Responsive UI with Tailwind CSS for styling.
- File upload functionality with feedback on processing status.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask (or Express), Python
- **Deployment**: Can be hosted on any platform supporting Flask/Express and React.

## Getting Started

### Prerequisites

- Node.js
- npm
- Python 3.x
- Flask (if using Flask backend)
- Express (if using Express backend)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jeffinjk/pass1pass2-assembler.git
   cd pass1pass2-assembler
2. Install the required Python packages:
   ```bash
   pip install flask flask-cors
3. Navigate to the React app directory:
   ```bash
   cd ../client  # Assuming your React app is in a 'client' folder
4. Install the required Node.js packages:
   ```bash
   npm install
5. Running the Application

6. Start the backend server:
   If using Flask:

       
       python app.py
  If using Express:

    
       node server.js
Start the React application:

    npm start
Open your browser and go to http://localhost:3000 to access the application.

## Usage

1. Navigate to the Upload Files page.
2. Upload your `input.txt` and `optab.txt` files.
3. After uploading, view the results for Pass 1, Pass 2, and the Symbol Table in their respective pages.
