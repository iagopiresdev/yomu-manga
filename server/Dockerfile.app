FROM node:18.16.0
WORKDIR /src
COPY package*.json ./
RUN npm install
RUN npm install -g ts-node
COPY . .
RUN chmod +x /src/wait-for-it.sh
RUN npx prisma generate
CMD sh -c "./wait-for-it.sh db:5432 -- npx prisma migrate deploy && ts-node src/server.ts"
