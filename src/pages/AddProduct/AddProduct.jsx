import "./AddProduct.css";

export default function AddProduct() {
  return (
    <div className="add-product-container">
      <div className="add-product-page">
        <h1 className="page-title">Add Product</h1>
        <form className="add-product-form">
          <div className="product-name">
            <label htmlFor="product-name">Product Name</label>
            <input type="text" name="productName" id="productName" />
          </div>
          <div className="product-description">
            <label htmlFor="product-description">Product Description</label>
            <textarea name="productDescription" id="productDescription" cols="20" rows="10"></textarea>
          </div>
          <div className="product-image">
            <label htmlFor="product-image">Product Photos</label>
            <input type="file" name="productImage" id="productImage" multiple/>
          </div>
          <div className="product-base-price">
            <label htmlFor="product-base-price">Base Price</label>
            <input type="number" name="basePrice" id="basePrice" />
          </div>
          <div className="auction-duration">
            <label htmlFor="auction-duration">Duration for Auction</label>
            <input type="date" name="duration" id="duration" />
          </div>

          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}
