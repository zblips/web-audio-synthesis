yarn build && docker run --name gdg2018 -v dist:/usr/share/nginx/html -d nginx -p 80:80
