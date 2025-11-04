# 🚀 Adaptive Web Monitoring Dashboard

## 🧩 Tech Stack
- **Frontend:** Nuxt 3 (TypeScript)
- **Backend:** Express.js (TypeScript)
- **Database:** MySQL + Prisma ORM
- **Cache:** Redis
- **Containerization:** Docker & Docker Compose
- **Reverse Proxy / Prod Ready:** Caddy
- **System Requirements:** Node.js ≥ 20, Docker ≥ 24

---

## 📁 Project Structure
```
.
├── client/              # Nuxt 3 frontend
├── caddy/               # Caddy Configuration
├── server/              # Express backend (TypeScript)
├── docker-compose.yaml  # Base Compose configuration
├── dev.yaml             # Development-specific overrides
└── README.md
```

---

## 🧠 Scripts

### 🔧 Development
```bash
sudo docker compose -f docker-compose.yaml -f dev.yaml up -d --build
sudo docker exec -it server-app npm run seed:dev
```

📌 Default ports:
- Frontend: http://localhost:3001 
- Backend: http://localhost:3000 
- MySQL: localhost:3306
- Redis: localhost:6379
- application : http://localhost


## 👨‍💻 Maintainer
**Rifki Saifullah** 
📧 Email: sayfunarcana@proton.me
🌐 GitHub: [@rifki-saifullah](https://github.com/rifki-saifullah)

---

## 📜 License
MIT © 2025 Rifqi
