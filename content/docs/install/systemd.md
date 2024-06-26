---
title: Systemd integration
description: Configure your Mailpit service to start automatically using systemd
aliases:
- /docs/install/systemd-integration/
weight: 15
---

Mailpit can be easily configured via systemd to automatically start when your computer starts. 
There are few points worth noting before you do:
1. It is advisable not to run the service as "root" for security purposes. For this example we will use a user and group called "mailpit", but this could be any existing user on your machine.
2. The database store must be read/writable by this user otherwise Mailpit will fail to start. For this example we use `/var/lib/mailpit/mailpit.db`


Create a systemd service configuration file in `/etc/systemd/system/mailpit.service`

```shell
[Unit]
Description=Mailpit server

[Service]
ExecStart=/usr/local/bin/mailpit -d /var/lib/mailpit/mailpit.db
Restart=always
# Restart service after 10 seconds service crashes
RestartSec=10
SyslogIdentifier=mailpit
User=mailpit
Group=mailpit

[Install]
WantedBy=multi-user.target
```

## Enable the service

```shell
systemctl enable mailpit.service
Created symlink /etc/systemd/system/multi-user.target.wants/mailpit.service → /etc/systemd/system/mailpit.service.
```

## Start the service

```shell
systemctl start mailpit.service
```


## Verify Mailpit is running

```shell
systemctl status mailpit.service
● mailpit.service - Mailpit server
     Loaded: loaded (/etc/systemd/system/mailpit.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2023-12-08 16:46:29 NZDT; 6s ago
   Main PID: 41913 (mailpit)
      Tasks: 10 (limit: 18768)
     Memory: 3.3M
        CPU: 27ms
     CGroup: /system.slice/mailpit.service
             └─41913 /usr/local/bin/mailpit -d /tmp/mailpit.db

Dec 08 16:46:29 mailpit systemd[1]: Started Mailpit server.
Dec 08 16:46:29 mailpit mailpit[41913]: INFO[2023/12/08 16:46:29] [smtpd] starting on [::]:1025
Dec 08 16:46:29 mailpit mailpit[41913]: INFO[2023/12/08 16:46:29] [http] starting on [::]:8025
Dec 08 16:46:29 mailpit mailpit[41913]: INFO[2023/12/08 16:46:29] [http] accessible via http://localhost:8025/
```
