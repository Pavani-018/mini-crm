const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://pavani123:Pavani23127892@minicrm.iurvpv2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  serverSelectionTimeoutMS: 5000
});

async function run() {
  try {
    console.log("🔄 Trying to connect to MongoDB...");

    await client.connect();

    await client.db("admin").command({ ping: 1 });

    console.log("🎉 Connected successfully to MongoDB!");
  } catch (err) {
    console.log("❌ ERROR:");
    console.log(err.message);
  } finally {
    await client.close();
  }
}

run();