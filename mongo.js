const { argv } = require('process')
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = encodeURIComponent(argv[2])
const url = `mongodb+srv://fullstackopen:${password}@cluster0.l9iwhzy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
  Person.find({})
    .then((result) => {
      console.log('phonebook:')

      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })

      mongoose.connection.close()
    })
    .catch((error) => {
      console.log(error)
      mongoose.connection.close()
    })

  return
}

const newName = argv[3]
const newNumber = argv[4]

const person = new Person({
  name: newName,
  number: newNumber,
})

person
  .save()
  .then(() => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
  .catch((error) => {
    console.log(error)
    mongoose.connection.close()
  })
