# Notification Service

A backend service for managing and sending notifications to users. Built for scalability and easy integration with other services.

## Features

- Send notifications via a RESTful API
- Store notifications in MongoDB
- Use RabbitMQ for background processing
- Retry mechanism for failed notifications
- Retrieve user-specific notifications

## Tech Stack

- Node.js (Express)
- MongoDB
- RabbitMQ
- Mocked Email & SMS services

## Assumptions
- Email & SMS are mocked — No real emails/SMS are sent.
- MongoDB and RabbitMQ are assumed to be running locally or available via environment variables during deployment.
- Notifications are simple JSON structures; no templates or user-specific routing are implemented.
- The consumer and server must share the same `.env` file.
