# task-manager
# Task Management App

## Overview

The Task Management App is a simple web application that allows users to create, manage, and organize their tasks. It supports adding, editing, deleting, and marking tasks as completed. The app uses server-side rendering for initial task loading and persists tasks using `localStorage`, ensuring that user data remains intact across sessions.

## Features

- **Add Tasks**: Create new tasks with a title, description, and priority (high, medium, low).
- **Edit Tasks**: Update existing tasks.
- **Delete Tasks**: Remove tasks from your list.
- **Mark as Completed**: Toggle the completion status of tasks.
- **Search**: Filter tasks by title or description.
- **Persistent Storage**: Tasks are saved in the browser's `localStorage`, so they remain even after refreshing the page.
- **Server-Side Rendering**: Initial tasks are fetched from the server for faster load times and better SEO.

## Tech Stack

- **Frontend**: React, Next.js, TypeScript
- **Styling**: CSS
- **State Management**: React's built-in state hooks
- **Data Storage**: Local Storage

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Namahsivaya7/task-manager.git
   cd task-manager/josh-talks
   npm run dev    --> start the project
