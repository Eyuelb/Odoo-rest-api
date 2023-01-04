FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_API_USER
ARG REACT_APP_PRODUCT
ARG REACT_APP_PRESCRIPTION

ENV REACT_APP_API_USER=${REACT_APP_API_USER}
ENV REACT_APP_PRODUCT=${REACT_APP_PRODUCT}
ENV REACT_APP_PRESCRIPTION=${REACT_APP_PRESCRIPTION}

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/build/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;" ]