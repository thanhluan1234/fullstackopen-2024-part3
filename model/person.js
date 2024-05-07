const moongose = require("mongoose");

const url = process.env.MONGODB_URI;
moongose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect MongoDB:", error.message);
  });

const personSchema = new moongose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = moongose.model("Person", personSchema);
