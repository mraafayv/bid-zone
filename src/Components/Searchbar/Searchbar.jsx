import './Searchbar.css'

export default function Searchbar() {
  return (
    <div className='searchbar'>
        <input type="search" name="search" id="search" placeholder='Search for Auctions here'/>
        <span><i class="fa-solid fa-magnifying-glass"></i></span>
    </div>
  )
}
