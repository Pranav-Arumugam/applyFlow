#Stage-1 Build 

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


#Stage-2 Production

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json  ./

#removing devDependencies and install only production 
RUN npm ci --omit=dev

#Copying only the compied js from dist folder
COPY --from=builder /app/dist ./dist    

EXPOSE 3000

CMD [ "node","dist/server.js" ]