FROM node:latest as build-stage

ADD . ./

RUN npm i

RUN npm run build

FROM busybox:1.35
RUN adduser -D static
USER static
WORKDIR /home/static
COPY --from=build-stage /dist .
CMD ["busybox", "httpd", "-f", "-v", "-p", "5173"]