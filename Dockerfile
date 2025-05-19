# Specify a base image
FROM node:20.11.1-alpine

# Install some dependencies
COPY ./  ./
RUN npm install
RUN ./jake.sh start-server  # need to find a way to run tests
RUN npm install pm2 -g
RUN npm install ts-node -g

# Default command
#  "pm2 start ts-node -- -P tsconfig.json ./src/server/server.ts",
CMD ["pm2-runtime", "start", "ts-node", "--", "-P", "./tsconfig.json", "./src/server/server.ts"]
