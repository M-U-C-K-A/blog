import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// Cette variable stockera notre instance PrismaClient
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // En développement, on réutilise la même instance
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['error', 'warn'],
    })
  }
  prisma = global.prisma
}

// Fonction pour gérer la déconnexion proprement
async function disconnect() {
  try {
    await prisma.$disconnect()
  } catch (error) {
    console.error('Error disconnecting from database:', error)
  }
}

// Gérer la déconnexion lors de l'arrêt de l'application
process.on('beforeExit', disconnect)
process.on('SIGTERM', disconnect)
process.on('SIGINT', disconnect)

export { prisma as db } 
