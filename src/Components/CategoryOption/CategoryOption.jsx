import "./CategoryOption.css";



export default function CategoryOption({ optionDetails }) {
  

  return (
      <div className="category-option">
        <h4 className="category-name">{optionDetails}</h4>
      </div>
  );
}
