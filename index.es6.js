const title = (tokens, level = 1) => {
  const isClosing = t => t.type === 'heading_close'
  const isLevel = level > 0 ? t => t.tag === `h${level}` : () => true
  const index = Array.findIndex(tokens, t => isClosing(t) && isLevel(t))

  return index && tokens[index - 1].children
    .reduce((acc, t) => acc + t.content, '')
}

export default (md, level) => {
  const originalParse = md.parse

  md.parse = function (src, env) {
    const tokens = originalParse.call(this, src, env)
    env.title = title(tokens, level)
    return tokens
  }
}
