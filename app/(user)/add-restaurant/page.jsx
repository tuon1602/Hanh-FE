import React from 'react'
import IndividualForm from '@/app/components/individualAddRestaurant/IndividualForm'

const RestaurantAddPage = () => {
  return (
    <div className='mt-32 m-auto'>
        <h1 className='text-3xl text-center'>Thêm nhà hàng mà bạn yêu thích vào hệ thống của chúng tôi </h1>
        <IndividualForm/>
    </div>
  )
}

export default RestaurantAddPage