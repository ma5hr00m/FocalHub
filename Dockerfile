# 构建阶段
FROM golang:1.20-alpine AS builder

RUN mkdir /app
WORKDIR /app
COPY . .
RUN go mod download && \
    CGO_ENABLED=0 GOOS=linux go build -o focalhub .

# 运行阶段
FROM alpine:3.20

COPY ./config.toml /config.toml
COPY --from=builder /app/focalhub /usr/local/bin/focalhub
COPY ./config.toml /config.toml
RUN chmod +x /usr/local/bin/focalhub
EXPOSE 2050

CMD ["/usr/local/bin/focalhub"]
