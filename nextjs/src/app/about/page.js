import React from 'react'
import Link from 'next/link'
// SEO

const page = (props) => {
    let {id, hoTen} = props.searchParams;

    console.log(id, hoTen);

    return <div>
        ABOUT
        <h1>
            id: {id},
            Họ tên: {hoTen}
        </h1>
        <br />
        <Link href="/blog">qua trang blog</Link>
        <Link href="/blog/191">qua trang blog param</Link>
    </div>

}

export default page