import connectMongoose from './lib/connectMongoose.js'
import Product from './models/Product.js'
import User from './models/User.js'
import bcrypt from 'bcrypt'
import Chance from 'chance'

async function initDB() {
  await connectMongoose()

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
    products.push({
      name: chance.sentence({ words: 3 }),
      price: chance.integer({ min: 10, max: 1000 }),
      image: chance.pickone(['iphone12.jpg', 'bmwx5.jpg']),
      tags: chance.pickset(['mobile', 'motor', 'lifestyle'], 2),
      owner: chance.pickone([users[0]._id, users[1]._id])
    })
  }

  
  await Product.insertMany(products)

  console.log('Base de datos inicializada correctamente')
  process.exit()
}

initDB().catch(err => {
  console.error('Error inicializando la base de datos', err)
})
