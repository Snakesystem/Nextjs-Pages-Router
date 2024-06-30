import { useSession } from 'next-auth/react'
import React from 'react'

export default function ProfilePage() {

    const { data }: any = useSession()

  return (
    <div>
        <h1>ProfilePage</h1>
        {data && <p>{data.user.fullname}</p>}
    </div>
  )
}
