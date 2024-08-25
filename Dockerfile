# 构建阶段
FROM golang:1.22-alpine AS builder 

WORKDIR /app

COPY . .

RUN go mod download

WORKDIR /app/client

RUN apk update
RUN apk add --no-cache nodejs npm
RUN npm install -g npm@latest
RUN npm install
RUN npm run build

WORKDIR /app
RUN CGO_ENABLED=0 GOOS=linux go build -o focalhub ./cmd

# 运行阶段
FROM alpine:3.20

COPY ./config.toml /config.toml
COPY --from=builder /app/focalhub /usr/local/bin/focalhub

RUN chmod +x /usr/local/bin/focalhub

EXPOSE 2050

CMD ["/usr/local/bin/focalhub"]