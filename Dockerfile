FROM node:14-alpine

RUN mkdir -p /app/src

#copy files
COPY package.json package-lock.json tsconfig.json /app/
COPY /src /app/src

# Install all Packages 
RUN cd /app && npm install

#build
RUN cd /app && npm run build

WORKDIR /app

EXPOSE 3000

CMD ["npm", "start"]