FROM node:fermium-alpine as development

COPY . /origin

WORKDIR /origin

RUN npm install && \
    npm run build && \
    npm prune --production && \
    cp -r dist /app && \
    cp -r node_modules /app/node_modules && \
    rm -rf /origin

WORKDIR /app

CMD ["node", "dist/main"]