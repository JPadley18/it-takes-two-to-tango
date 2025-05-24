FROM node:latest AS build-stage

ADD . ./

RUN npm i

RUN npm run build

FROM nginx:latest

COPY --from=build-stage /nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /dist /usr/share/nginx/html