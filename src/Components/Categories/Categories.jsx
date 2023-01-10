import CategoryOption from "../CategoryOption/CategoryOption";
import "./Categories.css";

export default function Categories() {

  const categoryOptions = ["Cars", "Art", "Coins", "Watches", "Sneakers"];


  return (
    <div className="categories-container">
      <div className="categories-section">
        <h1>Categories</h1>
        <div className="carousel">
          
          {categoryOptions.map(category => (
            <CategoryOption optionDetails={category} key={category}/>
          ))}
          
          
        </div>
      </div>
    </div>
  );
}
