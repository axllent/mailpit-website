---
title: Testing Mailpit
description: Instructions for sending a test email via the command line to Mailpit
weight: 5
---

These instructions provide an easy way to "send" a test email to Mailpit to ensure it is working. 
This assumes Mailpit is running, and is listening on port 1025 (default).

Create a text file `email.txt` with the following contents.

```text
From: sender@example.com
To: recipient@example.com
Subject: Email Subject

This is the body of the email.
It can contain multiple lines of text.
```

Then run the following command to "send" your test email:
```shell
mailpit sendmail < email.txt
```

If you are using a system-installed version of sendmail, your command may look like this:
```shell
sendmail -t -S localhost:1025 < email.txt
```

{{< tip "warning" >}}
Please note that various packages provide different implementations of sendmail, and they all work slightly different to each other, 
so please refer to the help of your version of sendmail.
{{< /tip >}}


## Test using telnet

You can also send an email directly to Mailpit using telnet:
```shell
{
  echo "EHLO localhost"
  echo "MAIL FROM: <from@example.com>"
  echo "RCPT TO: <recipient@example.com>"
  echo "DATA"
  echo "From: <from@example.com>"
  echo "To: <recipient@example.com>"
  echo "Subject: Your Subject"
  echo ""
  echo "Your message body"
  echo "."
  echo "QUIT"
} | telnet localhost 1025
```
