AI UI Generator

An AI-powered UI generator built with React + Vite + TypeScript that converts natural language prompts into structured UI components with live preview, versioning, rollback, and incremental refinement.

✨ Features

Prompt-based UI generation
Describe a UI in plain English and generate React components.

Typed UI schema
AI output is parsed into a strongly typed component tree before rendering.

Live Preview
Generated UIs are rendered immediately with runtime safety checks.

Version Snapshots
Each generation creates an immutable snapshot containing:

prompt

generated code

UI plan

timestamp

Rollback & Iteration
Users can roll back to any previous snapshot.
Future generations build on the selected snapshot, enabling true incremental edits.

Graceful error handling
API failures (e.g. rate limits) do not crash the UI and are clearly communicated.

🧠 How It Works

User enters a UI description

The app calls an AI planner to generate a UI plan

The plan is validated and converted into typed components

A snapshot is stored in generation history

Users can roll back to any snapshot and continue iterating

Each generation is aware of the currently active snapshot, enabling iterative refinement instead of full rewrites.

🏗️ Architecture Overview
Frontend (React + Vite)
│
├─ Prompt Input
├─ AI Agent Orchestrator
│   ├─ Planner
│   ├─ Generator
│   └─ Explainer
│
├─ Snapshot History (immutable)
├─ Rollback Logic
└─ Live Preview Renderer (type-safe)

🛠️ Tech Stack

React

Vite

TypeScript

OpenAI API

CSS (no UI frameworks)

🚀 Getting Started
Install dependencies
npm install

Run locally
npm run dev

⚠️ API Usage Note

OpenAI API calls are made client-side for demo purposes.

Rate limits (HTTP 429) may occur

Errors are handled gracefully in the UI

In a production system, API calls should be proxied through a backend to protect the API key and enforce rate limiting

📌 Design Decisions

Frontend-only architecture for simplicity and clarity

No UI frameworks to keep styling lightweight and readable

Explicit rollback semantics instead of implicit version switching

Type-safe rendering to prevent invalid AI output from crashing the app