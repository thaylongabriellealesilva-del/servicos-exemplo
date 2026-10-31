# Usado pelo Railway para publicar o site.
# Não precisa mexer neste arquivo.
FROM caddy:2-alpine
COPY . /srv
COPY Caddyfile /etc/caddy/Caddyfile
