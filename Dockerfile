# build stage
# 获取node镜像:稳定版最小版本
FROM node:lts-alpine as build-stage
# 创建根目录
WORKDIR /app
# 项目配置文件拷贝到app目录中
# 先拷贝配置文件安装依赖的原因是： 项目更新package未更新时会缓存依赖不用重新安装
COPY package*.json ./
# 安装依赖
RUN npm install --registry=https://registry.npm.taobao.org 
# 拷贝代码到app目录中
COPY . .
# 编译项目
RUN npm run build

# production stage
# 获取nginx镜像
FROM nginx:stable-alpine as production-stage
# 将vue项目打包结果拷贝到nginx根目录
COPY --from=build-stage /app/dist /usr/share/nginx/html
# 容器暴漏的端口是80
EXPOSE 80
# 容器命令 nginx -g 启动nginx; daemon off 后台运行
CMD ["nginx", "-g", "daemon off;"]