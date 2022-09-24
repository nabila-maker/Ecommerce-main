FROM node:16
WORKDIR /app
COPY . .
RUN yarn
COPY /src .
EXPOSE 8080
CMD ["yarn","start"]