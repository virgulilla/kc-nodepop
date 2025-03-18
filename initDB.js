import connectMongoose from './lib/connectMongoose.js'
import { Product } from './models/Product.js'
import { User } from './models/User.js'
import bcrypt from 'bcrypt'
import Chance from 'chance'
import readline from 'node:readline/promises'

async function initDB() {
  const connection = await connectMongoose()

  const answer = await ask('Are you sure you want to delete database collections? (n)')
  if (answer.toLowerCase() !== 'y') {
    console.log('Operation aborted.')
    connection.close()
    process.exit()
  }

  await Promise.all([
    Product.deleteMany(),
    User.deleteMany()
  ])

  const passwordHash = await bcrypt.hash('1234', 10)
  const users = await User.insertMany([
    { email: 'user1@example.com', password: passwordHash },
    { email: 'user2@example.com', password: passwordHash }
  ])

  const products = []
  const chance = new Chance()
  for (let i = 0; i < 100; i++) {
    const randomId = Math.floor(Math.random() * 1000);
    const imageUrl = `https://picsum.photos/id/${randomId}/300/200`;
    products.push({
      name: chance.sentence({ words: 3 }),
      price: chance.integer({ min: 10, max: 1000 }),
      image: imageUrl,
      tags: chance.pickset(['mobile', 'motor', 'lifestyle'], 2),
      owner: chance.pickone([users[0]._id, users[1]._id])
    })
  }

  
  await Product.insertMany(products)

  console.log('Base de datos inicializada correctamente')
  connection.close()
  process.exit()
}

initDB().catch(err => {
  console.error('Error inicializando la base de datos', err)
})

async function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const result = await rl.question(question)
  rl.close()
  return result
}
