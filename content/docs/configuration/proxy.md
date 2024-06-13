---
title: HTTP proxy
description: How to configure nginx, Apache or IIS to proxy to Mailpit
section: configuration
weight: 14
---

Whilst the Mailpit UI can be accessed directly when exposed to the network, you may want to configure an existing running webserver to proxy requests to Mailpit instead.
In the following examples the webserver is configured to listen on "http://localhost" and the Mailpit server can be accessed from the running webserver via
`http://172.17.0.1:8025`, however you will likely need to adjust this to suit your requirements.

## Proxy via nginx

```nginx
server {
    listen       80;
    server_name  localhost;

    location / {
        proxy_pass http://172.17.0.1:8025; # internal Mailpit address

        # configure the websocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```
If you are using a different location (such as `/mail/`) then be sure to start Mailpit with the same path set for its webroot (eg: `--webroot /mail/`).


## Proxy via Apache

For Apache you need to ensure you have the following modules enabled: `rewrite`, `proxy`, `proxy_http` and `proxy_wstunnel`.

```apache
<VirtualHost *:80>
    ServerName localhost
    
    ProxyPass "/" "http://172.17.0.1:8025/" # internal Mailpit address
    ProxyPassReverse "/" "http://172.17.0.1:8025/" # internal Mailpit address

    # configure the websocket
    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://172.17.0.1:8025/$1" [P,L] # internal Mailpit address
</VirtualHost>
```

## Proxy via Caddy

Caddy is extremely easy to configure simply by setting `reverse_proxy 172.17.0.1:8025` to the host configuration.

```text
localhost:80 {
    reverse_proxy 172.17.0.1:8025
}
```

To configure Caddy to use a subdirectory to proxy to Mailpit (eg: `http://localhost/mailpit/`) can be achieved with:

```text
localhost:80 {
    redir /mailpit /mailpit/
    handle_path /mailpit/* {
        rewrite * /mailpit{path}
        reverse_proxy 172.17.0.1:8025
    }
}
```

Ensure you start Mailpit with the `--webroot` option: `mailpit --webroot /mailpit/`


## Proxy via IIS

Please see this [Github comment](https://github.com/axllent/mailpit/issues/131#issuecomment-1641054844) for configuration instructions for IIS.


## Proxy via Træfɪk

Please see this [Github comment](https://github.com/axllent/mailpit/issues/286) for configuration instructions for Træfɪk.


## Others
{{< tip >}}
If you use any other popular proxy not mentioned above, then please [open an issue](https://github.com/axllent/mailpit/issues) on Gitlab, providing instructions of how to set it up, and it shall be added to this documentation.
Please ensure websocket connections are also working correctly. Thank you.
{{< /tip >}}
