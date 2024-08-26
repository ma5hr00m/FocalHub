FROM golang:1.22-alpine AS builder

RUN mkdir /app
WORKDIR /app
# Copy go.mod and go.sum files
COPY go.mod go.sum ./
RUN go mod download
# Copy project files
COPY . .

# Build the frontend project
WORKDIR /app/client
RUN apk update
RUN apk add --no-cache nodejs npm
RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps
RUN npm run build

# Build the executable file
WORKDIR /app
RUN CGO_ENABLED=0 GOOS=linux go build -o focalhub ./main.go  # Update this line

# Run stage
FROM alpine:3.20
# Copy configuration file and executable file
COPY ./config.toml /config.toml
COPY --from=builder /app/focalhub /usr/local/bin/focalhub
# Set executable permissions
RUN chmod +x /usr/local/bin/focalhub
# Expose port
EXPOSE 2050
# Startup command
CMD ["/usr/local/bin/focalhub"]
