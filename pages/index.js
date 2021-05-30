import { useSession } from 'next-auth/client';


export default function Home() {
  const [ session,loading ] = useSession();

  console.log(session)


  return (
    <div className="container">
      <h1>
        Home
      </h1>
      { session && !loading &&(
        <div>
          User logged in
        </div>
      )}

    </div>
  )
}
