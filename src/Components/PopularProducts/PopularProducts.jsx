import './PopularProducts.css'

import Card from '../Card/Card'

export default function PopularProducts() {
  return (
    <div className="popular-products-container">
      <div className="popular-section">
        <h1>Popular Products</h1>
        <div className="carousel">
          
        <Card /> 
        <Card /> 
        <Card /> 
        <Card /> 

        </div>
      </div>
    </div>
  )
}
