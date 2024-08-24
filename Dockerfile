FROM golang:1.22-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o focalhub ./cmd/main.go

EXPOSE 2060

CMD ["focalhub"]