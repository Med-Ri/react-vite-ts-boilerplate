# React Vite TypeScript Boilerplate

A modern and scalable frontend boilerplate built with **React 19**, **Vite**, **TypeScript**, and **React Router v7**.
This project is designed as a reusable foundation for dashboards, admin panels, and production-ready web applications, with a focus on modern routing, performance, and scalability.

---

## 🧱 Architecture Overview

This boilerplate follows a **feature-based and modular architecture** that promotes scalability, maintainability, and a clear separation of concerns.

### Core Principles

- **Feature-oriented structure**  
  Application logic is grouped by feature inside `modules/`, making the codebase easier to scale and maintain.

- **Separation of concerns**  
  API communication, services, UI components, hooks, and utilities are organized into dedicated layers.

- **Reusable building blocks**  
  Shared components, hooks, and utilities are centralized to reduce duplication and improve consistency.

- **Type-safe by default**  
  TypeScript is used throughout the project to improve reliability and developer experience.

- **Production-ready mindset**  
  The structure is suitable for real-world applications, not just demos or prototypes.

---

## 🚀 Getting Started
 
 ### Create a new project in one command:
  ```
  npx degit Med-Ri/react-vite-ts-boilerplate my-new-project
  ```

  ```
  cd my-new-project
  ```

  ```
  npm install
  ```

  ```
  npm run dev
  ```


The application will be available at: http://localhost:5173


---

## ✅ Why Use This Boilerplate

- ⚡ Fast development with Vite
- 🧠 Clean and predictable project structure
- ♻️ High reusability of components and hooks
- 📦 Scalable for small to large applications
- 🔒 Strong typing with TypeScript
- 🧩 Easy to extend with new features
- 🎯 Ideal for dashboards, admin panels, and SaaS frontends
- 🛠 Clean foundation for long-term projects

---

## 📁 Project Structure

````text
/public
/src
 ├── api/          # API request definitions (HTTP calls, endpoints)
 ├── assets/       # Static assets (images, icons, fonts)
 ├── components/   # Reusable UI components (shared across modules)
 ├── context/      # React Context providers (auth, theme, global state)
 ├── hooks/        # Custom reusable React hooks
 ├── lib/          # External libraries setup (axios, helpers, configs)
 ├── modules/      # Feature-based modules (business logic + UI)
 ├── pages/        # Route-level pages
 ├── routes/       # Application routing configuration
 ├── services/     # Business services & data abstraction layer
 ├── types/        # Global TypeScript types and interfaces
 ├── utils/        # Utility functions and helpers
 │
 ├── App.css
 ├── App.tsx       # Root application component
 ├── index.css     # Global styles
 └── main.tsx      # Application entry point

 ---


