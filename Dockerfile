# 前端构建阶段
FROM node:20-alpine AS frontend-builder

WORKDIR /app/client
COPY ./client ./
RUN npm install --legacy-peer-deps
RUN npm run build

# 后端构建阶段
FROM golang:1.22-alpine AS backend-builder

# 创建应用程序目录
RUN mkdir /app
WORKDIR /app

# Go 依赖
COPY go.mod go.sum ./
RUN go mod download

COPY . .

# 确保前端构建的输出目录存在
COPY --from=frontend-builder /app/client/dist /app/client/dist

# 构建可执行文件
RUN CGO_ENABLED=0 GOOS=linux go build -o focalhub ./main.go

# 运行阶段
FROM alpine:3.20

# 安装时区数据
RUN apk add --no-cache tzdata

# 设置时区为中国上海
ENV TZ=Asia/Shanghai

COPY ./config.toml /config.toml
COPY ./docs /docs
COPY --from=backend-builder /app/focalhub /usr/local/bin/focalhub

# 设置环境变量
ARG ACCESS_KEY_ID
ARG ACCESS_KEY_SECRET
ARG ENDPOINT
ARG BUCKET_NAME
ARG OAUTH_GITHUB_TOKEN
ARG APP_PORT

ENV ACCESS_KEY_ID=${ACCESS_KEY_ID}
ENV ACCESS_KEY_SECRET=${ACCESS_KEY_SECRET}
ENV ENDPOINT=${ENDPOINT}
ENV BUCKET_NAME=${BUCKET_NAME}
ENV OAUTH_GITHUB_TOKEN=${OAUTH_GITHUB_TOKEN}
ENV APP_PORT=${APP_PORT}

# 设置可执行权限
RUN chmod +x /usr/local/bin/focalhub

# 暴露端口
EXPOSE 2050

# 启动命令
CMD ["/usr/local/bin/focalhub"]
