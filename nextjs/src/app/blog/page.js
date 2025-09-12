"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {

    const router = useRouter();

    return <div>BLOG
        <br />
        <button onClick={
            () => {
                router.push("/about?id=1&hoTen=abc")
            }
        }>
            chuyển qua about
        </button>
    </div>

}

export default page