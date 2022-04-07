FROM node:12.20.1-alpine3.11

# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages

RUN echo "//registry.npmjs.org/:_authToken=6bd0fd51-927a-4519-94aa-6fdceb1d243e" >.npmrc

RUN echo "Installing Dependencies"
RUN npm install
# Copy all other source code to work directory
ADD . /usr/src/app
# TypeScript
RUN npm run build
# Start
CMD [ "npm", "start" ]