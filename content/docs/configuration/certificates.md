---
title: TLS certificates
description: Creating a self-signed HTTPS/TLS certificate for HTTP/API, SMTP and POP3
section: configuration
weight: 7
keywords: [tls, ssl, security, https]
---

Whilst services such as [Let's Encrypt](https://letsencrypt.org/) allow you to generate authenticated TLS (HTTPS) certificates for publicly accessible domain names you manage, it is sometimes necessary to generate self-signed certificates for testing purposes.

Self-signed certificates are just as good, however they are not signed by an official authority, so web browsers and email clients will display warnings (so you will have to allow the insecure connection/certificate).

It is also important that you set the "Common Name" (when asked) to the same hostname you are accessing the Mailpit service as (eg: `localhost`).

The following command will generate a self-signed certificate and key (both needed for Mailpit) which is valid for 10 years:

```shell
openssl req -x509 -newkey rsa:4096 \
-nodes -keyout key.pem -out cert.pem \
-sha256 -days 3650
```

In addition, some SMTP clients may also require the SAN (Subject Alt Name) to also match the hostname you are using to access Mailpit with in your client, in which case you should append `-addext "subjectAltName = DNS:<hostname>"` to the argument above, eg:

```shell
openssl req -x509 -newkey rsa:4096 \
-nodes -keyout key.pem -out cert.pem \
-sha256 -days 3650 \
-addext "subjectAltName = DNS:localhost"
```
