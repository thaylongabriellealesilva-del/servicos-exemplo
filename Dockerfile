# Usado pelo Railway para publicar o site.
# Não precisa mexer neste arquivo.
FROM caddy:2-alpine
COPY . /srv
CMD caddy file-server --root /srv --listen :${PORT:-8080}
