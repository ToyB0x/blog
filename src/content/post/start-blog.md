---
title: ブログはじめました
description: ChakraとMDXとcontentlayerでブログを作りました。MDX部分は自作のOSSを利用しています。
publishDate: 2022-4-17
---

ChakraとMDXとcontentlayerでブログを作りました。MDX部分は自作のOSSを利用しています。

以下のマークダウンが [サンプル記事](/blog/markdown-elements) のようにレンダリングされます。

```markdown
# H1

## H2

### H3

#### H4

paragraph

**bold text**

_italicized text_

> blockquote

1. First item
2. Second item
3. Third item

- First item
- Second item
- Third item

`code`

---

[link](https://link)

![alt text](/logo.png)

'''json
{
"firstName": "John",
"lastName": "Smith",
"age": 25
}
'''

### My Great Heading \{#custom-id\}

---

# TODO: GitHub Flavored Markdown

(when esm available in next.config.js, add remark-gfm as plugin)

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

term
: definition

~~The world is flat.~~

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

That is so funny! :joy:

I need to highlight these ==very important words==.

H~2~O

X^2^

---

Ref: https://www.markdownguide.org/cheat-sheet/
```
