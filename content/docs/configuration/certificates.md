---
title: TLS certificates
description: Creating a self-signed HTTPS/TLS certificate for HTTP/API, SMTP, and POP3
section: configuration
weight: 7
keywords: [tls, ssl, security, https]
---

While services such as [Let's Encrypt](https://letsencrypt.org/) allow you to generate authenticated TLS (HTTPS) certificates for publicly accessible domain names you manage, it is sometimes necessary to generate self-signed certificates for testing purposes.

Self-signed certificates are just as secure, but they are not signed by an official authority, so web browsers and email clients will display warnings (you will have to allow the insecure connection/certificate).

It is important to set the "Common Name" (when asked) to the same hostname you are using to access the Mailpit service (e.g., `localhost`).

The following command will generate a self-signed certificate and key (both needed for Mailpit) which is valid for 10 years:

```shell
openssl req -x509 -newkey rsa:4096 \
-nodes -keyout key.pem -out cert.pem \
-sha256 -days 3650
```

Additionally, some SMTP clients may require the SAN (Subject Alt Name) to also match the hostname you are using to access Mailpit in your client. In this case, append `-addext "subjectAltName = DNS:<hostname>"` to the command above, e.g.:

```shell
openssl req -x509 -newkey rsa:4096 \
-nodes -keyout key.pem -out cert.pem \
-sha256 -days 3650 \
-addext "subjectAltName = DNS:localhost"
```
