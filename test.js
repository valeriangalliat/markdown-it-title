import { equal } from 'assert'
import md from 'markdown-it'
import title from './'

const env = {}

md({ typographer: true })
  .use(title)
  .render('## H2\n\n# Hello, *`world`!(c)*', env)

equal(env.title, 'Hello, world!©')

md()
  .use(title, 0)
  .render('## H2\n\n# H1', env)

equal(env.title, 'H2')

md()
  .use(title, 2)
  .render('# H1\n\n## H2', env)

equal(env.title, 'H2')
