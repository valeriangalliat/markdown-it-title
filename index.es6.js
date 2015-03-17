export default (md, level = 1) => {
  const originalHeadingOpen = md.renderer.rules.heading_open

  md.renderer.rules.heading_open = function (...args) {
    const [ tokens, idx, _, env, self ] = args

    if (level < 1 || tokens[idx].tag === `h${level}`) {
      env.title = tokens[idx + 1].children
        .reduce((acc, t) => acc + t.content, '')

      // Reset original rule.
      if (originalHeadingOpen) {
        md.renderer.rules.heading_open = originalHeadingOpen
      } else {
        delete md.renderer.rules.heading_open
      }
    }

    // Execute original rule.
    if (originalHeadingOpen) {
      return originalHeadingOpen.apply(this, args)
    } else {
      return self.renderToken(...args)
    }
  }
}
