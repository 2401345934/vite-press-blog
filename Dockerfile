FROM nginx
COPY docs/.vitepress/dist/ /usr/share/nginx/vite-press-blog/html/
COPY default.conf /etc/nginx/conf.d/default.conf