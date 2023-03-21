FROM node:16-alpine AS deps
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build
CMD ["node","/app/server.js"]
