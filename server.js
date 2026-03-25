import express from 'express'
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync, copyFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = join(__dirname, 'db.json')
const BACKUPS_DIR = join(__dirname, 'backups')
const app = express()

app.use(express.json({ limit: '10mb' }))

if (!existsSync(DB_PATH)) {
  writeFileSync(DB_PATH, JSON.stringify({ campaigns: [] }, null, 2))
}

// --- Backup system ---

mkdirSync(BACKUPS_DIR, { recursive: true })

function timestamp() {
  return new Date().toISOString().replace(/:/g, '-').replace(/\.\d{3}Z$/, '')
}

function createBackup(type) {
  if (!existsSync(DB_PATH)) return
  const content = readFileSync(DB_PATH, 'utf-8')
  if (!content.trim()) return
  const filename = `${type}_${timestamp()}.json`
  writeFileSync(join(BACKUPS_DIR, filename), content)
  console.log(`Backup created: backups/${filename}`)
}

function pruneBackups(type, keep) {
  const files = readdirSync(BACKUPS_DIR)
    .filter(f => f.startsWith(`${type}_`) && f.endsWith('.json'))
    .sort()
  const toDelete = files.slice(0, Math.max(0, files.length - keep))
  for (const file of toDelete) {
    unlinkSync(join(BACKUPS_DIR, file))
    console.log(`Backup pruned: backups/${file}`)
  }
}

// Startup backup
createBackup('startup')
pruneBackups('startup', 10)

// Edit-count backup
let saveCount = 0

app.get('/api/data', (_req, res) => {
  const data = JSON.parse(readFileSync(DB_PATH, 'utf-8'))
  res.json(data)
})

app.post('/api/data', (req, res) => {
  writeFileSync(DB_PATH, JSON.stringify(req.body, null, 2))
  saveCount++
  if (saveCount % 5 === 0) {
    createBackup('autosave')
    pruneBackups('autosave', 30)
  }
  res.json({ ok: true })
})

// Shutdown backup
function onShutdown() {
  console.log('\nShutting down...')
  createBackup('shutdown')
  pruneBackups('shutdown', 10)
  process.exit(0)
}

process.on('SIGINT', onShutdown)
process.on('SIGTERM', onShutdown)

// Serve Vite build in production
const distPath = join(__dirname, 'dist')
if (existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('*', (_req, res) => res.sendFile(join(distPath, 'index.html')))
}

app.listen(3001, '0.0.0.0', () => console.log('Server on http://localhost:3001'))
