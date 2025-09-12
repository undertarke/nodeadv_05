import React from 'react'

const page = (props) => {
    const { id } = props.params;

    return (
        <div>BLog có Id param

            <h1>
                Id: {id}
            </h1>
        </div>
    )
}

export default page