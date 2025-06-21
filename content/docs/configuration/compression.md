---
title: Data compression
description: Tuning Mailpit's compression levels, RAM & CPU usage
section: configuration
---

By default, Mailpit compresses messages stored in the database to save space, and compresses network traffic for supported HTTP clients to minimize data transfer.
However, this compression can lead to increased CPU and memory (RAM) usage within Mailpit, especially when handling large emails or attachments, which may not be ideal for systems with limited memory or lower hardware specifications.

## Message compression

Attachments in emails are stored using [MIME encoding](https://en.wikipedia.org/wiki/MIME), which is not efficient in terms of message size.
As a result, the size of encoded attachments increases by roughly 37%.
Therefore, when you add a 1MB attachment, it effectively adds around 1.4MB to the overall size of the email.

By default, Mailpit compresses raw messages in the database using zstd, a lossless compression algorithm known for its efficient performance in both compression and decompression.
This process helps to minimize database size and enhances the speed of database reads and writes.

However, it's important to note that compression introduces additional CPU and RAM overhead due to the processes of compressing and decompressing the data.
Depending on your specific needs, you may want to adjust certain settings in Mailpit to better align with your requirements.

{{< tip >}}
Message compression, along with RAM and CPU usage, can vary greatly based on the types of messages you store and the size and file types of the attachments in those emails.
{{< /tip >}}

Mailpit's message compression can be set using the `--compression <level>` flag (or environment variable `MP_COMPRESSION=<level>`) to a value between `0` and `3`, with the default being `1`.

**Note:** Changing the message compression level will not modify the compression of any existing messages in the database, only new messages.

### Level `0`

Setting the compression level to `0` turns off message compression altogether, meaning messages are stored in plain text in the database.
Disabling compression can result in a significantly larger database size, but it has almost no RAM or CPU overhead (compared to when using compression).

Please note that this does not actually speed up reading and writing data from the database; in fact, it can slow it down slightly due to the larger data being read from and written to the database.
If RAM usage is a concern, then this is possibly the best option for you.

### Level `1` (default)

Mailpit's default message compression level is `1`, which uses the fastest zstd compression and thus the lowest level of compression. This still provides a reasonable level of compression without adding too much CPU and RAM overhead.

### Level `2`

Level `2` uses the standard zstd compression level. Compared to level `1`, this can slightly increase compression, but uses approximately double the RAM of level 1.

### Level `3`

Level `3` uses the maximum zstd compression. This can significantly improve compression (resulting in a smaller database size), but requires much more CPU and RAM, resulting in slower processing.

### Compression benchmarks

{{< tip >}}
The following benchmarks are relative to the message content, size, and the frequency at which these messages are received. These benchmarks are provided to give some indication of requirements.
{{< /tip >}}

In this benchmark, 2,500 regular emails were ingested via SMTP in quick succession to compare the differences.
These messages are a complete mix of regular emails, about half containing small attachments.

While Mailpit will free unused memory after a while, this benchmark illustrates the immediate requirements for this test.
RAM usage would be lower if the messages were received less frequently, and would be higher if those emails contained very large attachments.

| Compression level | Time to ingest | DB size | RAM usage after ingest |
| ----------------- | -------------- | ------- | ---------------------- |
| 0                 | 16.1s          | 147.5MB | 50MB                   |
| 1                 | 14.3s          | 99.5 MB | 290MB                  |
| 2                 | 14.6s          | 97.1MB  | 485MB                  |
| 3                 | 22.4s          | 88.6MB  | 1.2GB                  |

## HTTP compression

Both the web UI and API provide HTTP compression (gzip) for clients that support it, including web browsers.
This leads to quicker remote HTTP requests since less data is transmitted over the network.

Gzip compression operates in real time, meaning each HTTP request is compressed, which can increase CPU usage.
In Mailpit, HTTP compression can be explicitly turned off by using the `--disable-http-compression` flag (or environment variable `MP_DISABLE_HTTP_COMPRESSION=true`).
