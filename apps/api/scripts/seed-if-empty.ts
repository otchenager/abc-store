import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const count = await prisma.product.count()
if (count === 0) {
  console.log('Database empty — running seed...')
  const { execSync } = await import('child_process')
  execSync('npx prisma db seed', { stdio: 'inherit' })
} else {
  console.log(`Seed skipped — ${count} products already exist.`)
}

await prisma.$disconnect()
