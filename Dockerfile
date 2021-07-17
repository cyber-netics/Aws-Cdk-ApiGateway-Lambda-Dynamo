FROM node:14.15.4 as builder
WORKDIR /app

COPY . ./

RUN npm install --prefix ./src/cdk
RUN npm run build --prefix ./src/cdk
RUN npm run test --prefix ./src/cdk

CMD [ "npm", "run", "deploy"]
