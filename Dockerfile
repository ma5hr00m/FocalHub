# 使用 Golang 1.22 的 Alpine 作为构建阶段的基础镜像
FROM golang:1.22-alpine AS builder

# 创建应用程序目录
RUN mkdir /app
WORKDIR /app

# Go 依赖
COPY go.mod go.sum ./
RUN go mod download

COPY . .

# 构建前端项目
WORKDIR /app/client
RUN apk update
RUN apk add --no-cache nodejs npm
RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps
RUN npm run build

# 构建可执行文件
WORKDIR /app
# 设置环境变量，构建 Linux 可执行文件
RUN CGO_ENABLED=0 GOOS=linux go build -o focalhub ./main.go  # 更新此行

# 运行阶段
FROM alpine:3.20
# 复制配置文件和可执行文件
COPY ./config.toml /config.toml
COPY --from=builder /app/focalhub /usr/local/bin/focalhub
# 设置可执行权限
RUN chmod +x /usr/local/bin/focalhub
# 暴露端口
EXPOSE 2050
# 启动命令
CMD ["/usr/local/bin/focalhub"]
