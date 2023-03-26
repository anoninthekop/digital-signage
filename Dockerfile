FROM node:18-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
ENV MONGODB_URI=mongodb://mongo:27017/digitaldisplay
RUN npm run build
CMD ["npm","start"]
