FROM golang:latest

WORKDIR /app

ADD . ./
RUN go mod download

RUN go build -o build/program/app main.go

ENV ENVIRONMENT="development"

CMD ["/app/build/program/app"]