---
title: HTML check
description: Test the email client support for an HTML email
section: usage
weight: 4
---

![Mailpit](/images/html-check.png)

The support for HTML/CSS messages varies greatly across email clients. HTML check attempts to calculate the overall support for your email for all selected platforms to give you some idea of the general compatibility of your HTML email.

## How does it work?

Internally the original HTML message is run against over 175 different HTML and CSS tests. All tests (except for `<script>`) correspond to a test on [caniemail.com](https://caniemail.com), and the final score is calculated using the available compatibility data.

CSS support is very difficult to programmatically test, especially if a message contains CSS style blocks or is linked to remote stylesheets. Remote stylesheets are, unless blocked via `--block-remote-css-and-fonts`, downloaded and injected into the message as style blocks. The email is then inlined to matching HTML elements. This gives Mailpit fairly accurate results.

CSS properties such as `@font-face`, `:visited`, `:hover` etc cannot be inlined however, so these are searched for within CSS blocks. This method is not accurate as Mailpit does not know how many nodes it actually applies to, if any, so they are weighted lightly (5%) as not to affect the score. An example of this would be any email linking to the full bootstrap CSS which contains dozens of unused attributes.

All warnings are displayed with their respective support, including any specific notes, and it is up to you to decide what you do with that information and how badly it may impact your message. 


## Is the final score accurate?

There are many ways to define "accurate", and how one should calculate the compatibility score of an email. There is also no way to programmatically determine the relevance of a single test to the entire email.

For each test, Mailpit calculates both the unsupported & partially-supported percentages in relation to the number of matches against the total number of nodes (elements) in the HTML. The maximum unsupported and partially-supported weighted scores are then used for the final score (ie: worst case scenario).

To try explain this logic in very simple terms: Assuming a `<script>` node (element) has 100% failure (not supported in any email client), and a `<p>` node has 100% pass (supported).

- An email containing just a single `<script>`: the final score is 0% supported.
- An email containing just a `<script>` and a `<p>`: the final score is 50% supported.
- An email containing just a `<script>` and two `<p>`: the final score is 66.67% supported. 

Mailpit will sort the warnings according to their weighted unsupported scores.


## What about invalid HTML?

HTML check does not detect if the original HTML is valid. In order to detect applied styles to every node, the HTML email is run through a parser which is very good at turning invalid input into valid output. It is what it is... 
