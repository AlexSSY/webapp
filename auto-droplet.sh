#!/bin/bash
set -e

DOMAIN="bninka.duckdns.org"
APP_PORT=3000

echo "=== Обновляем систему ==="
sudo apt update -y && sudo apt upgrade -y

echo "=== Устанавливаем Nginx и Certbot ==="
sudo apt install -y nginx certbot python3-certbot-nginx ufw

echo "=== Настраиваем Firewall ==="
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "=== Создаем Nginx конфиг для $DOMAIN ==="
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"
sudo bash -c "cat > $NGINX_CONF" <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        

        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location ~* \.(ico|png|jpg|jpeg|gif|svg|css|js|woff2?|ttf|eot|mp4|webm)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public";
        try_files \$uri @app;
    }

    location @app {
        proxy_pass http://127.0.0.1:$APP_PORT;
    }
}
EOF

echo "=== Включаем конфиг и проверяем синтаксис ==="
sudo ln -sf $NGINX_CONF /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

echo "=== Получаем SSL сертификат Let's Encrypt ==="
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m your@email.com

echo "=== Настраиваем автоматическое обновление сертификатов ==="
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

echo "=== Готово! ==="
echo "Ваш сайт доступен по адресу: https://$DOMAIN"
