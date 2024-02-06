
# Task Manager API

This is a task manager API designed to help users manage their day-to-day tasks efficiently. The API is built using Node.js and Express, with MongoDB as the underlying database.


## Table of Contents

* Prerequisites
* Installation
* Configuration
* Usage
* Security
* Documentation
* Middleware
* Endpoints
* Error Handling
* Contribution
* License
## Prerequisites

* Node.js installed
* MongoDB installed and running
* API Key for external services (if applicable)
## Installation

Clone the repository:

```bash
git clone https://github.com/shann592/Task-Manager-API.git
```

Install dependencies:

```bash
npm install
```
    
## Configuration

1. Create a .env file in the root directory and configure the following variables:

* MONGO_URI
* JWT_SECRET
* JWT_LIFETIME

2. Update the swagger.yaml file with accurate API documentation.
## Usage

1. Start the server:

```bash
npm start
```

2. The API will be accessible at http://localhost:3000 by default.


## Security

The API utilizes various security packages and practices to ensure a secure environment:

* Helmet for HTTP header security
* CORS to handle cross-origin requests
* XSS-clean to sanitize user input
* Rate limiting to prevent abuse