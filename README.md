# Kanban Board with Dashboard — Project 2

A full-stack **Next.js + MongoDB** task management application, extending the Kanban Board concept from Project 1 into a database-backed REST API application. Features Kanban workflow, analytics dashboard, category management, and team member management.

## Team members
- Soe Thinzar Tun — Project 1: https://github.com/lulue196/kanban-board
- Shwe Wa Thone — add personal repository URL here

> Update the members and individual repository links to match the actual submitted proposal and contributors. Do not claim work that a member did not do.

## Stack
- Next.js App Router, React, TypeScript
- MongoDB Community Server, MongoDB Node.js driver
- Recharts for dashboard
- REST API (Node.js runtime)
- Self-hosted VM deployment (not serverless)

## 3 complete CRUD entities
| Entity | Collection endpoint | Item endpoint |
|---|---|---|
| Task | `GET/POST /api/tasks` | `GET/PUT/DELETE /api/tasks/:id` |
| Category | `GET/POST /api/categories` | `GET/PUT/DELETE /api/categories/:id` |
| Member | `GET/POST /api/members` | `GET/PUT/DELETE /api/members/:id` |

Task fields: title, description, categoryId, memberId, startDate, dueDate, completedDate, status.
Category fields: name, color. Member fields: name, email, role.

## Quick start
1. Install Node.js 20+ and MongoDB Community Server.
2. `npm install`
3. `cp .env.example .env.local` (Windows: copy manually).
4. Start MongoDB locally on port 27017 or edit `MONGODB_URI`.
5. `npm run dev`
6. Open http://localhost:3000.

## Basic usage
1. Create categories and team members using the sidebar.
2. Create tasks on the Kanban Board and assign category/member.
3. Change task status between TODO, DOING and DONE.
4. Edit or delete tasks and other records.
5. Visit Dashboard to see totals, overdue tasks and status/category/completion charts.
6. Refresh the page: records persist in MongoDB.

## Screenshots
Add screenshots of the *running* application before submitting:
- `screenshots/kanban.png`
- `screenshots/dashboard.png`
- `screenshots/categories.png`
- `screenshots/members.png`

## Production deployment (Ubuntu VM)
See `DEPLOY.md`. Deployment URL: **add real verified URL**.

## Video demo
Upload your own 5-minute usage demo to YouTube (Unlisted). Add its real URL here.

## Important
This is an implementation starter, not a verified production deployment. Validate behavior, security, and compatibility before submitting. There is no authentication or authorization; use for a controlled course demonstration, not an open public service without securing the API.
