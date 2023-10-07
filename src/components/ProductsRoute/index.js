import Header from '../Header'
import PrimeDeals from '../PrimeDeals'
import ProductsSection from '../ProductsSection'

import './index.css'

const ProductsRoute = () => (
  <>
    <Header />
    <div className="products-route-main-container">
      <PrimeDeals />
      <ProductsSection />
    </div>
  </>
)

export default ProductsRoute
