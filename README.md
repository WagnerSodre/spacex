# 🚀 SpaceX Launch Tracker  

Aplicação fullstack que consome a API da SpaceX e exibe os lançamentos futuros e passados. Também conta com um chatbot integrado usando IA (Gemini), com cache em Redis para respostas.

## 🧱 Tecnologias Utilizadas

### Backend

- Node.js + TypeScript
- Express.js
- Redis (cache)
- LangChain (chatbot)
- Gemini AI (chatbot)
- Docker  

### Frontend

- React + Vite
- TypeScript
- Hotjar (monitoramento)

## 🚀 Como Executar Localmente

### Pré-requisitos

- Docker + Docker Compose

### Passos

```bash

docker  compose  up  --build

```

- Frontend: http://localhost:5173
- Backend (API): http://localhost:3000

## 🧪 Funcionalidades

- Lista do próximo e último lançamento da SpaceX
- Detalhes como data, foguete e webcast
- Chatbot com IA usando Gemini
- Cache de perguntas/respostas com Redis
- Hotjar embutido no frontend (via script)
