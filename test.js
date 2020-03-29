const { strictEqual: equal } = require('assert')
const md = require('markdown-it')
const title = require('./')

const render = (engine, src) => {
  const env = {}
  engine.render(src, env)
  return env
}

const engine = md({ typographer: true })
  .use(title)

equal(
  render(engine, '## H2\n\n# Hello, *`world`!(c)*').title,
  'Hello, world!©'
)

equal(
  render(engine, '## H2\n\n# Instance reuse').title,
  'Instance reuse'
)

equal(
  render(md().use(title, 0), '## H2\n\n# H1').title,
  'H2'
)

equal(
  render(md().use(title, 2), '# H1\n\n## H2').title,
  'H2'
)
