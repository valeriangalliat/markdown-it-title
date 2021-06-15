function getRawText (tokens) {
  let text = ''

  for (const token of tokens) {
    switch (token.type) {
      case 'text':
      case 'code_inline':
        text += token.content
        break
      case 'softbreak':
      case 'hardbreak':
        text += ' '
        break
    }
  }

  return text
}

function markdownItTitle (md, opts) {
  // Backwards compatibility for previous versions.
  if (Number.isInteger(opts)) {
    opts = { level: opts }
  }

  opts = Object.assign({}, markdownItTitle.defaults, opts)

  const originalHeadingOpen = md.renderer.rules.heading_open
  const originalParagraphOpen = md.renderer.rules.paragraph_open

  md.renderer.rules.heading_open = function (...args) {
    const [tokens, idx, , env, self] = args

    if (!env.title && (opts.level < 1 || tokens[idx].tag === `h${opts.level}`)) {
      env.title = getRawText(tokens[idx + 1].children)
    }

    if (originalHeadingOpen) {
      return originalHeadingOpen.apply(this, args)
    } else {
      return self.renderToken(...args)
    }
  }

  if (opts.excerpt < 1) {
    return
  }

  md.renderer.rules.paragraph_open = function (...args) {
    const [tokens, idx, , env, self] = args

    if (!env.excerpt) {
      env.excerpt = []
    }

    env.excerpt.push(getRawText(tokens[idx + 1].children))

    if (env.excerpt.length >= opts.excerpt) {
      md.renderer.rules.paragraph_open = originalParagraphOpen
    }

    if (originalParagraphOpen) {
      return originalParagraphOpen.apply(this, args)
    } else {
      return self.renderToken(...args)
    }
  }
}

markdownItTitle.defaults = {
  level: 1,
  excerpt: 0
}

module.exports = markdownItTitle
