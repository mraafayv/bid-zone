import './Searchbar.css'
import { useAuth } from '../../hooks/useAuth';
export default function Searchbar() {
  const { setSearch, search } = useAuth();

  const searchInput = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className='searchbar'>
            
        <input type="search" name="search" id="search" placeholder='Search for Auctions here' onChange={searchInput} />
        <span><i class="fa-solid fa-magnifying-glass"></i></span>
    </div>
   
  )
}
