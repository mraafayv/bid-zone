import Categories from '../../Components/Categories/Categories'
import PopularProducts from '../../Components/PopularProducts/PopularProducts'
import HomeContent from '../../Components/HomeContent/HomeContent'
import Navbar from '../../Components/Navbar/Navbar'


export default function Home() {
  return (
    <div className="homepage">
        <Navbar />
        <HomeContent />
        <Categories />
        <PopularProducts />
    </div>
  )
}
