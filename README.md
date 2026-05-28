# AI Productivity Assistant

## Project Overview

AI Productivity Assistant is a web application designed to improve workplace and student productivity using Artificial Intelligence. The system helps users generate professional emails, summarize meeting notes, organize tasks, and interact with an AI chatbot assistant.

## Features

* **Smart Email Generator** - Create professional emails in various tones (Formal, Friendly, Persuasive)
* **Meeting Notes Summarizer** - Extract summaries, action items, deadlines, and decisions from meeting notes
* **AI Task Planner** - Prioritize tasks and create daily or weekly schedules
* **Responsive Dashboard Design** - Works seamlessly on desktop and mobile devices
* **Real-time AI Processing** - Powered by OpenAI API for intelligent responses

## Technologies Used

* **Frontend**: HTML, CSS, JavaScript
* **Backend**: Node.js, Express.js
* **AI**: OpenAI API (GPT-3.5-turbo)
* **Package Manager**: npm
* **Development**: nodemon (for development hot-reload)

## Project Structure

```
AI-Productivity-Assistant/
├── frontend/
│   ├── index.html          # Main HTML template
│   ├── styles.css          # Responsive styling
│   └── app.js              # Frontend logic and API calls
├── backend/
│   ├── server.js           # Express server setup
│   ├── routes/             # API route definitions
│   │   ├── emailRoutes.js
│   │   ├── notesRoutes.js
│   │   └── plannerRoutes.js
│   └── controllers/        # Request handlers
│       ├── emailController.js
│       ├── notesController.js
│       └── plannerController.js
├── README.md               # This file
├── package.json            # Dependencies
└── .env                    # Environment variables
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API Key (get one from https://platform.openai.com/api-keys)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd AI-Productivity-Assistant
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create/edit the `.env` file and add your OpenAI API key:
```
PORT=3000
NODE_ENV=development
OPENAI_API_KEY=your_actual_api_key_here
```

### 4. Run the server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### 5. Open the application

Navigate to `http://localhost:3000` in your web browser

## Feature Documentation

### 1. Smart Email Generator

**How it works:**
1. Enter the purpose of your email (e.g., "Request for meeting with team lead")
2. Select the tone: Formal, Friendly, or Persuasive
3. Optionally add additional details
4. Click "Generate Email" and get a professional email instantly

**API Endpoint:** `POST /api/generate-email`

### 2. Meeting Notes Summarizer

**How it works:**
1. Paste your entire meeting notes into the text area
2. Click "Summarize"
3. Get:
   - Quick summary of the meeting
   - List of action items
   - Any mentioned deadlines
   - Key decisions made

**API Endpoint:** `POST /api/summarize-notes`

### 3. AI Task Planner

**How it works:**
1. List all your tasks (one per line)
2. Choose between Daily Schedule or Weekly Plan
3. Click "Create Plan"
4. Receive:
   - Priority ranking of tasks
   - Detailed schedule with time allocations

**API Endpoint:** `POST /api/plan-tasks`

## API Endpoints

### Email Generator
- **POST** `/api/generate-email`
- **Request Body:**
  ```json
  {
    "purpose": "Request for meeting with team lead",
    "tone": "formal",
    "details": "Discuss Q3 goals"
  }
  ```

### Notes Summarizer
- **POST** `/api/summarize-notes`
- **Request Body:**
  ```json
  {
    "notes": "Meeting notes content here..."
  }
  ```

### Task Planner
- **POST** `/api/plan-tasks`
- **Request Body:**
  ```json
  {
    "tasks": "Task 1\nTask 2\nTask 3",
    "period": "daily"
  }
  ```

## Responsible AI Disclaimer

⚠️ **Important**: This application uses AI-generated responses which may occasionally contain inaccuracies, biases, or incomplete information. Always verify important information before acting on AI-generated content, especially for:
- Sensitive communications
- Important decisions
- Deadline-critical tasks
- Professional correspondence

The user is responsible for reviewing and validating all AI-generated output.

## Development

### Running in Development Mode
```bash
npm run dev
```
This will start the server with nodemon, which auto-reloads on file changes.

### Project Structure Conventions
- Controllers handle business logic and OpenAI API calls
- Routes define API endpoints
- Frontend files are served statically from `/frontend`

### Adding New Features
1. Create a new controller in `backend/controllers/`
2. Create a new route file in `backend/routes/`
3. Import and use the route in `server.js`
4. Add frontend UI in `index.html`
5. Add event listeners in `app.js`

## Troubleshooting

### OpenAI API Error
- Ensure your API key is correctly set in `.env`
- Check that your OpenAI account has available credits
- Verify API key permissions

### Port Already in Use
```bash
# Change PORT in .env file or use different port:
PORT=3001 npm start
```

### Module Not Found
If you see a `Cannot find module` error, make sure you are inside the project root and run:
```bash
npm install
```
If the issue persists, reinstall dependencies completely:

- macOS / Linux:
```bash
rm -rf node_modules package-lock.json
npm install
```
- Windows PowerShell:
```powershell
Remove-Item -Recurse -Force .\node_modules, .\package-lock.json
npm install
```

## Team Members

* Your Name

## License

MIT - Feel free to use this project for personal or commercial purposes

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Last Updated:** May 28, 2026

