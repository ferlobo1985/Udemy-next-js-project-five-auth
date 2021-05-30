import { connectToDb } from 'utils/database/mongo-db'
import { passwordHash } from 'utils/tools';

const handler = async(req,res) => {
  const {email,password} = req.body;

  /// validation

  const mongoClient = await connectToDb();

  try {
    const db = mongoClient.db();
    const hashedPass = await passwordHash(password)
    await db.collection('users').insertOne({
      email,
      password:hashedPass
    });
    res.status(200).json({ message: 'Registered successfully'})
  } catch(error){
    res.status(500).json({ message: 'Error'})
  }

  mongoClient.close();
}

export default handler;