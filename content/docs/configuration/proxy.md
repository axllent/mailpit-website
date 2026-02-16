---
title: HTTP proxy
description: How to configure nginx, Apache, or IIS to proxy to Mailpit
section: configuration
weight: 14
---

While the Mailpit UI can be accessed directly when exposed to the network, you may want to configure an existing web server to proxy requests to Mailpit instead.
In the following examples, the web server is configured to listen on "http://localhost" and the Mailpit server can be accessed from the running web server via
`http://172.17.0.1:8025`. You will likely need to adjust this to suit your requirements.

{{< tip "warning" >}}
For security reasons, Mailpit (`>= v1.29.0`) will block requests if the `Origin` header does not match the hostname you are connecting to your proxy server with.
Therefore, you must ensure that your proxy server is configured to **preserve** the original `Host` header when proxying requests to Mailpit.

Alternatively you can run Mailpit using `--api-cors "<host-address>,<proxy-address>"` (e.g., `--api-cors "localhost,172.17.0.1"`), however this is not the recommended approach ([see docs](../http/#cors-configuration)).
{{< /tip >}}

## Proxy via nginx

```nginx
server {
    listen       80;
    server_name  localhost;

    location / {
        proxy_set_header Host $http_host; # preserve original host header
        proxy_pass http://172.17.0.1:8025; # internal Mailpit address

        # configure the websocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```

If you are using a different location (such as `/mail/`), be sure to start Mailpit with the same path set for its webroot (e.g., `--webroot /mail/`).

## Proxy via Apache

For Apache, ensure you have the following modules enabled: `rewrite`, `proxy`, `proxy_http`, and `proxy_wstunnel`.

```apache
<VirtualHost *:80>
    ServerName localhost

    ProxyPreserveHost On # preserve original host header
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

Caddy is extremely easy to configure by simply setting `reverse_proxy 172.17.0.1:8025` in the host configuration.

```text
localhost:80 {
    reverse_proxy 172.17.0.1:8025 {
        header_up Host {host}
    }
}
```

To configure Caddy to use a subdirectory to proxy to Mailpit (e.g., `http://localhost/mailpit/`), use:

```text
localhost:80 {
    redir /mailpit /mailpit/
    handle_path /mailpit/* {
        rewrite * /mailpit{path}
        reverse_proxy 172.17.0.1:8025 {
            header_up Host {host}
        }
    }
}
```

Ensure you start Mailpit with the `--webroot` option: `mailpit --webroot /mailpit/`

## Proxy via IIS

Please see this [GitHub comment](https://github.com/axllent/mailpit/issues/131#issuecomment-1641054844) for configuration instructions for IIS.

## Proxy via Træfik

Please see this [GitHub comment](https://github.com/axllent/mailpit/issues/286) for configuration instructions for Træfik.

## Others

{{< tip >}}
If you use any other popular proxy not mentioned above, please [open an issue](https://github.com/axllent/mailpit/issues) on GitHub, providing instructions on how to set it up, and it will be added to this documentation.
Please ensure websocket connections are also working correctly. Thank you.
{{< /tip >}}
