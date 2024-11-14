FROM registry.cn-hangzhou.aliyuncs.com/zapt/node:20-alpine
LABEL authors="11017"

# 创建工作目录
RUN mkdir -p /app
WORKDIR /app

# 复制构建阶段生成的输出到运行时阶段
COPY .output /app/.output
COPY ./package.json /app/

# 设置环境变量
ENV NITRO_PORT=3000

# 暴露端口
EXPOSE 3000

# 设置入口点为启动脚本
ENTRYPOINT [ "node", "/app/.output/server/index.mjs" ]