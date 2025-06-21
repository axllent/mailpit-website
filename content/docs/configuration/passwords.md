---
title: Password files
description: Creating password files for HTTP/API, SMTP, and POP3
section: configuration
weight: 9
---

The web UI/API and SMTP services allow you to optionally set a password file for authentication. The POP3 service requires a password file.

{{< tip >}}
Although different username/password combinations can be set, these are **not** separate accounts (they all allow access to the same Mailpit instance).
The same password file can be reused for any of the services, or you can use a separate one for each (it's up to you).
{{< /tip >}}

Mailpit supports multiple users and passwords in a single password file (plain text file), and the passwords can be encoded in the following formats:

-   Plain text
-   SSHA
-   MD5Crypt
-   APR1Crypt
-   SHA
-   Bcrypt
-   Crypt with SHA-256 and SHA-512

A plain text password file would look like:

```text
user1:password1
user2:password2
```

or encrypted like:

```text
user1:$apr1$rja5hy8u$0DN2pENpLk1d4BqgPEho61
user2:$apr1$asfohhn3$WXNtWWEnCMRFkI75J3exy1
```

There are many online tools that allow you to encrypt a password using many of the formats listed above.

{{< tip "warning" >}}
Note that if you modify your password file while Mailpit is running, you will need to restart Mailpit.
{{< /tip >}}
