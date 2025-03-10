---
title: Websocket
description: Documentation about the websocket server
---


The Mailpit user interface refreshes in real time as messages and tags are received, deleted, or marked as read.
This feature enables multiple browser clients to connect to the same mailbox and view the same updates simultaneously.
Mailpit provides a websocket endpoint (`/api/events`, typically `ws://localhost/api/events`) which delivers this information to the UI, and as new features are added or existing ones are modified,
the data sent through the websocket can also change.

{{< tip "warning" >}}
Given the fluid nature of the data, the websocket endpoint is not part of the official API.
{{< /tip >}}

The websocket will broadcast a firehose of different JSON object, all in the form of:

```json
{
    "Type": "<string>",
    "Data": <object>
}
```
The `Type` can represent several options, including `stats`, `update`, `delete`, or `new`,  with the `Data` object varying based on the selected type. 
This documentation will focus solely on the "new" (message) type, as it is the least likely to change and is likely the primary interest for developers. 
To ensure you are only processing these messages from the stream, you will need to specifically filter by Type: "new".


## Using the websocket to detect new messages

When messages are received, the websocket broadcasts a `Type` `new`, and 
the `Data` is a [message summary](https://mailpit.axllent.org/docs/api-v1/view.html#get-/api/v1/message/-ID-)
(see Response -> Schema) of the received message.

For example:
```json
{
    "Type": "new",
    "Data": {
        "ID": "YsABjkFERuPyq8XC6WaKs2",
        "MessageID": "LDBnLCzbh3LQGbHb6d2B8H@mailpit",
        "Read": false,
        "From": {
            "Name": "Mailpit",
            "Address": "mailpit@example.com"
        },
        "To": [
            {
                "Name": "Test user",
                "Address": "test@example.com"
            }
        ],
        "Cc": [],
        "Bcc": [
            {
                "Name": "",
                "Address": "test@test"
            }
        ],
        "ReplyTo": [],
        "Subject": "Hello from Mailpit SMTP API!",
        "Created": "2025-03-08T23:58:34.665934146+13:00",
        "Tags": [],
        "Size": 935,
        "Attachments": 0,
        "Snippet": "Mailpit is a small, fast, low memory, zero-dependency, multi-platform email testing tool \u0026 API for developers."
    }
}
```
