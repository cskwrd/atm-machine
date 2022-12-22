FROM node:18-alpine AS install
WORKDIR /app
COPY ./package.json ./package.json
COPY ./public ./public
COPY ./src ./src
RUN npm install

FROM install AS publish
RUN npm run build

FROM caddy:alpine AS final
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=publish /app/build/ /usr/share/caddy/
