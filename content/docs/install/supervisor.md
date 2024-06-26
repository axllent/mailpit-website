---
title: Supervisor integration
description: Configure your Mailpit service to start automatically using supervisor
weight: 15
---

Mailpit can be easily configured via supervisor to automatically start when your computer starts. 
There are few points worth noting before you do:
1. It is advisable not to run the service as "root" for security purposes. For this example we will use a user and group called "mailpit", but this could be any existing user on your machine.
2. The database store must be read/writable by this user otherwise Mailpit will fail to start. For this example we use `/var/lib/mailpit/mailpit.db`


Create a supervisor service configuration file in `/path/to/your/supervisor-configs/mailpit.ini`

```shell
[program:mailpit]

[Service]
command=/usr/local/bin/mailpit -d /var/lib/mailpit/mailpit.db
user=mailpit
numprocs=1
startsecs=0
autostart=true
autorestart=true
startretries=10
process_name=%(program_name)s_%(process_num)02d

#define you environments
# environment=MP_SMTP_RELAY_HOST="/path/tp/your/smtp-relay.conf",MP_SMTP_RELAY_PORT="587"

```

## Enable the service

```shell
supervisorctl reread
```

## Start the service

```shell
supervisorctl update
```


## Verify Mailpit is running

```shell
supervisorctl status
```
