# IMDB Clone Microservices

<p align="left">
    <a href="https://www.python.org/">
        <img src="https://img.shields.io/badge/Python-3.8%2B-blue?logo=python&logoColor=white" alt="Python 3.8+">
    </a>
    <a href="https://nodejs.org/">
        <img src="https://img.shields.io/badge/Node.js-14%2B-green?logo=node.js&logoColor=white" alt="Node.js 14+">
    </a>
    <a href="https://fastapi.tiangolo.com/">
        <img src="https://img.shields.io/badge/FastAPI-0.95%2B-009688?logo=fastapi&logoColor=white" alt="FastAPI">
    </a>
    <a href="https://expressjs.com/">
        <img src="https://img.shields.io/badge/Express.js-4.x-black?logo=express&logoColor=white" alt="Express.js">
    </a>
    <a href="https://www.docker.com/">
        <img src="https://img.shields.io/badge/Docker-optional-blue?logo=docker&logoColor=white" alt="Docker">
    </a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License">
    </a>
</p>

This project is an IMDB clone built using a microservices architecture. It consists of two main services:

- **Auth Service**: Handles user authentication and authorization (built with FastAPI).
- **Movies Service**: Manages movie data and related operations (built with Express.js).

## Services

### 1. Auth Service

- **Framework**: FastAPI (Python)
- **Responsibilities**: User registration, login, JWT authentication, and user management.

### 2. Movies Service

- **Framework**: Express.js (Node.js)
- **Responsibilities**: CRUD operations for movies, movie details, and related endpoints.

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- Docker (optional, for containerization)

### Running the Services

#### Auth Service

```bash
cd auth-service
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Movies Service

```bash
cd movies-service
npm install
npm start
```

## Folder Structure

```
imdb-clone-microservices/
├── auth-service/      # FastAPI authentication service
├── movies-service/    # Express.js movies service
└── README.md
```

## License

MIT