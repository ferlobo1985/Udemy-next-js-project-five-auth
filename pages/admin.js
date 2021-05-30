import {  getSession } from 'next-auth/client'

const Admin = () => {
    return(
        <>
            <h1>Admin</h1>
        </>
    )
}

export async function getServerSideProps(context){
    const session = await getSession({req:context.req})

    if(!session){
        return{
            redirect:{
                destination:'/sign_in',
                permanent:false
            }
        }
    }

    return {
        props:{ifNeeded:session}
    }
}


export default Admin;