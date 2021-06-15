const { strictEqual, deepStrictEqual } = require('assert')
const md = require('markdown-it')
const title = require('./')

const render = (engine, src) => {
  const env = {}
  engine.render(src, env)
  return env
}

const engine = md({ typographer: true })
  .use(title)

strictEqual(
  render(engine, '## H2\n\n# Hello, *`world`!(c)*').title,
  'Hello, world!©'
)

strictEqual(
  render(engine, '## H2\n\n# Instance reuse').title,
  'Instance reuse'
)

strictEqual(
  render(md().use(title, { level: 0 }), '## H2\n\n# H1').title,
  'H2'
)

strictEqual(
  render(md().use(title, { level: 2 }), '# H1\n\n## H2').title,
  'H2'
)

// For backwards compatibility.
strictEqual(
  render(md().use(title, 2), '# H1\n\n## H2').title,
  'H2'
)

strictEqual(
  render(engine, '# [Title](#title)').title,
  'Title'
)

deepStrictEqual(
  render(md({ typographer: true }).use(title, { excerpt: 2 }), '# Title\n\nFirst [paragraph](#paragraph) with some `code`.\n\nSecond *paragraph* including typography(c).\n\nThird paragraph.').excerpt,
  ['First paragraph with some code.', 'Second paragraph including typography©.']
)
