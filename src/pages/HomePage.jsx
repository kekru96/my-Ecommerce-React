import React from 'react'
import ItemListContainer from '../components/ItemListContainer/ItemListContainer'


function HomePage() {
  return (
    <div className='container '>
    <div className='col mt-5 p-1 text-center' style={{color:'rgb(104, 104, 104)', textDecoration:'underline'}}>
    <h4>Todos los productos</h4>
    </div>
    <ItemListContainer></ItemListContainer>
    </div>
  )
}

export default HomePage
