FROM node:latest AS build-stage

ADD . ./

RUN npm i

RUN npm run build

FROM httpd:latest

COPY --from=build-stage /dist /usr/local/apache2/htdocs
COPY --from=build-stage /.htaccess /usr/local/apache2/htdocs/