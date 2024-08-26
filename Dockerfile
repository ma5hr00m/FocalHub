FROM golang:1.22-alpine AS builder

RUN mkdir /app
WORKDIR /app
# 复制 go.mod 和 go.sum 文件
COPY go.mod go.sum ./
RUN go mod download
# 复制项目文件
COPY . .

# 构建前端项目
WORKDIR /app/client
RUN apk update

# 安装 curl 和其他依赖
RUN apk add --no-cache curl

# 安装 Node.js 20.17.0
RUN curl -fsSL https://unofficial-builds.nodejs.org/download/release/v20.17.0/node-v20.17.0-linux-x64-musl.tar.xz | tar -xJ -C /usr/local --strip-components=1

# 添加 Node.js 到 PATH
ENV PATH="/usr/local/bin:$PATH"

# 验证 Node.js 和 npm 版本
RUN node -v && npm -v

# 安装项目依赖
RUN npm install -g npm@latest
RUN npm cache clean --force
RUN npm install
RUN npm run build

# 构建可执行文件
WORKDIR /app
RUN CGO_ENABLED=0 GOOS=linux go build -o focalhub ./cmd

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
