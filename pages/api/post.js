import { getSession } from 'next-auth/client'

const handler = async(req,res)=>{
    const session = await getSession({req:req});

    if(!session){
        return res.status(401).json({message:'Bro you need to be auth'});
    }

    //
    res.status(200).json({message:'here are the admin posts'});

}


export default handler;