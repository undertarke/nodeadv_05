import { Col, Row } from 'antd'
import React from 'react'
import Product from './Product'
import CartProduct from './CartProduct'

export default function ProductDetail(props: any) {
  let { id } = props.searchParams;

  return (
    <div className='bg-white'>
      <div className='container mx-auto'><Row gutter={25} >
        <Col span={18}>
          <Product id={id} />
        </Col>
        <Col span={6}>
          <CartProduct />
        </Col>
      </Row></div>

    </div>
  )
}
