FROM node:18-alpine
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./app.js ./app.js
COPY ./components/ ./components/ 
COPY ./helper/ ./helper/
COPY ./model/ ./model/
COPY ./routes/ ./routes/
RUN npm ci
EXPOSE 3001
CMD ["npm", "start"]
