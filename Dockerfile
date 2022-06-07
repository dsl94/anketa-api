# Using Node:10 Image Since it contains all 
# the necessary build tools required for dependencies with native build (node-gyp, python, gcc, g++, make)
# First Stage : to install and build dependences

FROM node:16 AS builder
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN npm run build


# Second Stage : Setup command to run your app using lightweight node image
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app ./
COPY --from=builder /app/dist ./dist
EXPOSE 3001
CMD ["npm", "run", "start:prod"]

