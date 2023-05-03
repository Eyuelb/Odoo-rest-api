FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_USER_API
ARG VITE_ORDER_API 
ARG VITE_ORDER_BY_PRESCRIPTION_API

ENV VITE_USER_API=${VITE_USER_API}
ENV VITE_ORDER_API=${VITE_ORDER_API}
ENV VITE_ORDER_BY_PRESCRIPTION_API=${VITE_ORDER_BY_PRESCRIPTION_API}

RUN echo "VITE_USER_API=${VITE_USER_API}"
RUN echo "VITE_ORDER_API=${VITE_ORDER_API}"
RUN echo "VITE_ORDER_BY_PRESCRIPTION_API=${VITE_ORDER_BY_PRESCRIPTION_API}"
# RUN npm run build

# FROM nginx:stable-alpine

# COPY --from=builder /app/dist/ /usr/share/nginx/html/

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;" ]

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview" ]