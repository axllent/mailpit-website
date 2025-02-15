---
title: Integration testing
description: Mailpit contains a REST API for integration testing
weight: 5
---

Depending on your requirements, integration testing can be achieved via different methods:

1. Integrate your application with the Mailpit API (see [API documentation](../api-v1/)).
2. Return a rendered HTML or text version of a message (see below).
3. Test your application's handling of (some) unexpected SMTP responses by invoking Mailpit's [Chaos](chaos/) feature.


## Return a rendered text or HTML message part

To view either only the HTML or text versions of an email, append a `.html` or `.txt` to the URL generated via the frontend. This would typically be something like 
`http://localhost:8025/view/B79PgsotENzGwk4CCbAcAq.html` or `http://localhost:8025/view/B79PgsotENzGwk4CCbAcAq.txt`

The format is `<Mailpit URL>/view/<ID>.(html|txt)`

Please [see this](#embedding-the-html-message-in-an-iframe) is you intend on embedding the HTML message in an iframe.


## Return the latest text or HTML message part

For ease of use, you can also substitute the `<ID>` with `latest` to return the latest message instead, eg: `http://localhost:8025/view/latest.html` or `http://localhost:8025/view/latest.txt`.

You can optionally apply a [search filter](../usage/search-filters/) to return the latest message matching a search by appending `?query=<search>`, for example `http://localhost:8025/view/latest.html?query=from:user@example.com`.

{{< tip "warning" >}}
1. The HTML & text versions only return the message part, not any other data such as mail headers or attachments (you need to use the API for that).
2. Inline images paths in the HTML part are modified to reference the Mailpit API so they load correctly on the frontend.
3. If no message is found then a 404 is returned.
4. If requesting the HTML part for an existing message without an HTML part, then a 404 is returned.
{{< /tip >}}


## Cypress Mailpit Package

For those using Cypress for integration testing, there is a convenient [Cypress Mailpit package](https://www.npmjs.com/package/cypress-mailpit) available. This package allows you to easily interact with Mailpit within your Cypress tests, providing seamless integration and simplifying your testing workflows.


## Embedding the HTML message in an iframe

If you are intending to embed the HTML message within an iframe, then append `?embed=1` to the URL (eg: `http://localhost:8025/view/B79PgsotENzGwk4CCbAcAq.html?embed=1`)
which will modify all links to open in `target="_blank"` and also set `rel="noreferrer noopener"` for security purposes.

In addition to this, a small snippet of JavaSCript is added to the message to send the page height to its parent page via [postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) which contains the height of the page via the `messageHeight` property.
This can be used by the parent page to adjust the iframe height, for example:
```html
<iframe src="http://localhost:8025/view/B79PgsotENzGwk4CCbAcAq.html?embed=1" style="width: 100%" id="preview-html"></iframe>

<script type="application/javascript">
	window.addEventListener("message", (event) => {
		// Check sender origin to be trusted
		// if (event.origin !== "http://example.com") { return }
		const data = event.data
		if (data.messageHeight) {
			document.getElementById("preview-html").style.height = data.messageHeight + 50 + "px"
		}
	}, false)
</script>
```

{{< tip "warning" >}}
For browser security reasons, no JavaScript interaction is allowed between the parent page and the embedded page.
{{< /tip >}}
