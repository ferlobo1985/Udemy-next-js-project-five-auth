import { connectToDb } from 'utils/database/mongo-db'
import { passwordHash } from 'utils/tools';
import { authSchema }  from 'utils/validations';

const handler = async(req,res) => {
  const {email,password} = req.body;

  /// validation
  try{
    await authSchema.validate({
      email,
      password
    },{ abortEarly: false});
  } catch(error){
    res.status(500).json({message:'something wrong', error})
    return
  }


  const mongoClient = await connectToDb();

  /// check 
  const checkUser = await mongoClient.db().collection('users').findOne({email});
  if(checkUser){
    res.status(400).json({message:'User exists'})
    return;
  }


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