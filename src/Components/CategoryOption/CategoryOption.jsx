import { Link } from "react-router-dom";
import "./CategoryOption.css";

export default function CategoryOption({ optionDetails }) {
  return (
    <Link to={`/auction/${optionDetails}`}>
      <div className="category-option">
        <h4 className="category-name">{optionDetails}</h4>
      </div>
    </Link>
  );
}
