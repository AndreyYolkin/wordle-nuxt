import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dir = path.join(__dirname, '..', '.data')

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}
