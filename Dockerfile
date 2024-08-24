FROM golang:1.22-alpine

RUN mkdir /app
WORKDIR /app
COPY . .
RUN go mod download && \
    CGO_ENABLED=0 GOOS=linux go build -o focalhub .

FROM alpine:3.20

COPY ./conf /conf
COPY --from=builder /app/focalhub /usr/local/bin/focalhub
COPY ./config.toml /config.toml
RUN chmod +x /usr/local/bin/focalhub
EXPOSE 2050

CMD ["/usr/local/bin/focalhub"]