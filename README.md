# markdown-it-title [![npm version](http://img.shields.io/npm/v/markdown-it-title.svg?style=flat-square)](https://www.npmjs.org/package/markdown-it-title)

> Extract title during [markdown-it] parsing.

[markdown-it]: https://github.com/markdown-it/markdown-it

## Overview

This plugin is useful if you want to write plain markdown files, e.g.
without YAML front matter, and want to extract the document title to
populate a HTML `<title>` tag, Open Graph and so on.

Additionally, markdown-it-title supports extracting the contents of the
first paragraphs if you want to use them as meta description, post
excerpt and so forth.

## Usage

```js
const opts = {
  level: 1,
  excerpt: 2
}

const md = require('markdown-it')()
  .use(require('markdown-it-title'), opts)

const env = {}

md.render(`# [Hello](#hello), *world*!

This is the **first** paragraph.

## Hi, I'm a title

Another one.

And another one.
`, env)

env.title === 'Hello, world!'
env.excerpt[0] === 'This is the first paragraph.'
env.excerpt[1] === 'Another one.'
```

The `opts` object can contain:

| Name      | Description                                                                                    | Default |
|-----------|------------------------------------------------------------------------------------------------|---------|
| `level`   | Heading level to look for the title. Use 0 to take whichever heading comes first.              | 1       |
| `excerpt` | Number of paragraphs to extract from the beginning of the document to be used as page excerpt. | 0       |

Setting `level` to 1 (the default) will extract the contents of the
first `<h1>` to `env.title`. If set to 0, markdown-it-title will take
the first heading it encounters.

Also, the first `excerpt` paragraphs will be extracted in the
`env.excerpt` array (not enabled by default).

Both title and excerpt text won't include any markup.
