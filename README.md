# 🛠️ Spenza Backend

This is the **backend API** for the **Spenza** finance tracker app. It powers all core functionality including user transaction management, rate-limiting, and database access.

---

## 🚀 Tech Stack

- **Express.js** (Node.js server)
- **PostgreSQL** (hosted on [Neon.tech](https://neon.tech))
- **Upstash Redis** (rate limiting)
- **Clerk** (auth validation middleware)
- **Render.com** (deployment)

---

## 🔐 Features

- Secure API with **Clerk-protected routes**
- Store and retrieve **income/expense transactions**
- **Tag support** for each transaction
- **Global rate limiting** (IP-based), with plans to migrate to **per-user limits** via Redis
- Connected to **PostgreSQL** for persistent data

---

## 📦 Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/USER1043/spenza-api.git
   ```
2. Install dependencies:
  ```bash
  npm install
  ```
3. Add a .env file with the following:
  ```ini
  DATABASE_URL=your_neon_postgres_url
  CLERK_SECRET_KEY=your_clerk_backend_key
  UPSTASH_REDIS_REST_URL=your_upstash_url
  UPSTASH_REDIS_REST_TOKEN=your_upstash_token
  ```
4. Start the server:
  ```bash
  npm run start
  ```

--- 

## 📱 Frontend

Looking for the frontend? Check it out here 👉
[Spenza Frontend Repo](https://github.com/USER1043/spenza-frontend.git)

## 🤝 Contributing

Pull requests and improvements are welcome. Feel free to fork and contribute to the backend of Spenza!

