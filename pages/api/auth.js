import { connectToDb } from 'utils/database/mongo-db'


const handler = async(req,res) => {
  const {email,password} = req.body;

  /// validation

  const mongoClient = await connectToDb();

  try {
    const db = mongoClient.db();

    await db.collection('users').insertOne({
      email,
      password
    });
    res.status(200).json({ message: 'Registered successfully'})
  } catch(error){
    res.status(500).json({ message: 'Error'})
  }

  mongoClient.close();
}

export default handler;