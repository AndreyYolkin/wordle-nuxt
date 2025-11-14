export default defineCachedEventHandler(async event => {
  handleCors(event, {
    origin: '*',
  })
}, {
  getKey: () => `word-${getWarsawDateKey()}`,
  maxAge: 86_400,
})
