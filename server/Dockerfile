FROM node:18-alpine
WORKDIR /app
COPY ./package.json ./package.json
COPY ./app.js ./app.js
COPY ./components/ ./components/ 
COPY ./helper/ ./helper/
COPY ./model/ ./model/
COPY ./routes/ ./routes/
RUN npm install 
EXPOSE 3001
CMD ["npm", "start"]
