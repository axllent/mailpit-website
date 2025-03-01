---
title: Unix domain sockets
description: Configuring Mailpit to listen on Unix domain sockets instead of network interfaces
section: configuration
---
{{< tip "warning" >}}
This feature was added in Mailpit v.1.21.0.

This article describes a new (still somewhat experimental) way to use Unix domain sockets rather than network interfaces and ports.

This is not the recommended approach for general use, and is aimed at advanced users managing mass hosting.
{{< /tip >}}


Mailpit traditionally listens on designated network interfaces and ports for both the web UI/ API (HTTP server) as well as mail (SMTP server). 
This means that the ports must be available in order to start Mailpit, which can be inconvenient when running dozens of Mailpit instances on the same server.
In situations like this, it may be far more convenient to listen on Unix sockets instead when using a proxy server.

Mailpit can be configured to listen via a Unix domain socket for both the HTTP and SMTP servers.

The syntax to listen on a Unix socket instead of an `<ip>:<port>` is `unix:<path>:<permissions>`, where
 - `<path>` is the path to the socket file, eg: `/var/run/mailpit/http.sock`
 - `<permissions>` is the unix permissions to assign the socket, such as `600`

Socket files are created with the same ownership as the process starting Mailpit, and the permissions must allow read & write permissions to whatever process is going to be reading that process (eg: NginX proxy).
The folder where the socket is going to be written to must also have read, write & executable permissions by the user starting the Mailpit service, and read & executable permissions by the service that will be connecting to the socket.

The HTTP and SMTP services cannot share a socket, and every Mailpit instance must use their own sockets. Mailpit's Unix domain sockets do not support TLS encryption (if you require HTTPS then you add that to your proxy).

Example:
```shell
mailpit --listen unix:/var/run/mailpit/http.sock:666 --smtp unix:/var/run/mailpit/smtp.sock:666
```

This will allow global read & write access to both `/var/run/mailpit/http.sock` & `/var/run/mailpit/smtp.sock` sockets, provided the process also has read/execute access to `/var/run/mailpit/`.


## Reverse web proxy using a Unix socket

Unix sockets are not connectable over a network, so require a proxy to communicate with the socket.


### Nginx

```nginx
server {
    listen       80;
    server_name  localhost;

    location / {
        proxy_pass http://unix:/var/run/mailpit/http.sock;

        # enable the websocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```

### Apache
Apache support for reverse websockets connections to unix sockets requires version `>= 2.4.47` and the `proxy` & `proxy_http` modules must be enabled.

Also note the syntax should always include a `|http://<anything>` (even though it is completely unused!), and include the `upgrade=websocket` to support the websockets (web UI).


```apache
<VirtualHost *:80>
    ServerName localhost
    
    ProxyPass "/" "unix:/var/run/mailpit/http.sock|http://ignore.this/" upgrade=websocket
</VirtualHost>
```


## Sending mail via a Unix socket

To do this you will need to use Mailpit's sendmail (which supports Unix domain sockets). The SMTP socket should be set as the SMTP server address `-S unix:<path>` or by setting the global environment variable `MP_SENDMAIL_SMTP_ADDR=unix:<path>`.

For example:
```shell
mailpit sendmail -S unix:/var/run/mailpit/smtp.sock < message
```

If using something like the Symfony mailer, you can configure your mailer to something like

```shell
MAILER_DSN="sendmail://default?command=mailpit%20sendmail%20-S%20unix:/var/run/mailpit/smtp.sock%20-bs"
```
