import './Card.css'
import ProductImage from '../../assets/product.jpeg'
import Timer from '../Timer/Timer'

export default function Card() {
    

  return (
    <div className='card'>
        <div className="image-container">
            <img src={ProductImage} alt="product" />
        </div>
        <div className="card-content">
            <div className="product-name">
                <h3>Product Name</h3>
            </div>
            <div className="current-bid">
                <h4 className='price-label'>Current Bid:</h4>
                <h4 className='amount'>Rs. 7500</h4>
            </div>
            <div className="location">
                <h4 className='location-label'>Location: </h4>
                <h4 className='pin-location'>Pakistan </h4>
            </div>
        </div>
        <div className="card-footer">
        <button className='view-details-button'>View Details</button>
        <Timer />
        </div>
    </div>
  )
}
