---
title: HTML check
description: Test the email client support for an HTML email
section: usage
weight: 4
---

![Mailpit](/images/html-check.png)

Support for HTML/CSS messages varies greatly across email clients. HTML check attempts to calculate the overall support for your email across all selected platforms to give you some idea of the general compatibility of your HTML email.

## How does it work?

The HTML message is tested against over 175 HTML and CSS checks. All checks (except `<script>`) map to a test on [caniemail.com](https://caniemail.com), and the final score is derived from that compatibility data.

**Remote stylesheets** are automatically downloaded and injected as inline styles (unless blocked via `--block-remote-css-and-fonts`), which gives Mailpit reasonably accurate CSS results. Note that internal IP addresses are blocked by default - to test emails that reference stylesheets on internal servers, enable `--allow-internal-http-requests` (env: `MP_ALLOW_INTERNAL_HTTP_REQUESTS=true`).

**CSS that cannot be inlined** - properties like `@font-face`, `:visited`, and `:hover` - cannot be applied to specific elements, so Mailpit searches for them within CSS blocks instead. Since it cannot determine how many elements they actually affect, these checks are weighted lightly (5%) to limit their impact on the score. This is particularly relevant for emails that include large frameworks like Bootstrap, which typically contain many unused rules.

Warnings are shown with their compatibility details and any relevant notes. How much weight you give them is up to you.

## Is the final score accurate?

There are many ways to define "accurate" and how one should calculate the compatibility score of an email. There is also no way to programmatically determine the relevance of a single test to the entire email.

For each test, Mailpit calculates both the unsupported and partially-supported percentages in relation to the number of matches against the total number of nodes (elements) in the HTML. The maximum unsupported and partially-supported weighted scores are then used for the final score (i.e., worst-case scenario).

To explain this logic in very simple terms: Assuming a `<script>` node (element) has 100% failure (not supported in any email client), and a `<p>` node has 100% pass (supported).

- An email containing just a single `<script>`: the final score is 0% supported.
- An email containing just a `<script>` and a `<p>`: the final score is 50% supported.
- An email containing just a `<script>` and two `<p>`: the final score is 66.67% supported.

Mailpit will sort the warnings according to their weighted unsupported scores.

## What about invalid HTML?

HTML check does not detect if the original HTML is valid. In order to detect applied styles to every node, the HTML email is run through a parser that is very good at turning invalid input into valid output. It is what it is...
