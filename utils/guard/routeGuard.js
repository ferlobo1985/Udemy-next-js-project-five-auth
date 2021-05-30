import {getSession, session} from 'next-auth/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


const RouteGuard = (props) => {
    const router = useRouter();
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        getSession().then( session =>{
            if(!session){
                router.push('/sign_in')
            } else{
                setLoading(false)
            }
        })
    },[])

    if(loading){
        return <div>Loading...</div>
    }

    return(
        <>
            {props.children}
        </>
    )
}

export default RouteGuard;