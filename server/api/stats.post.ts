export default defineEventHandler(async event => {
  handleCors(event, {
    origin: '*',
  })
})
