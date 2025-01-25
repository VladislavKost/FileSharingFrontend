FROM node:20-alpine as builder
WORKDIR /usr/frontend
COPY . /usr/frontend
RUN npm install
RUN npm run build

FROM nginx:1.26.0-alpine as proxy
COPY /etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/frontend/dist /usr/share/nginx/html
EXPOSE 80/tcp
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
