import React, {useContext, useState} from 'react'
import {globalState} from '../../../globalState'
import ProductItem from '../ultils/ProductItem/ProductItem';
import Loading from '../auth/Loading/Loading';
import Filters from './Filters';


function Products() {
    const state = useContext(globalState)
    const [product] = state.ProductAPI.product
    const [isAdmin] = state.UserAPI.isAdmin 
    const [search, setSearch] = useState()
    return (
        <>
        <Filters/>
        <div className="products">
            {
                    product ? product.map(product1 => {
                        return <ProductItem key={product1._id} product={product1} isAdmin={isAdmin} />
                    }):""
            }
        

        </div>
            {product ? product.length === 0 && <Loading /> : ""}
        </>
    )
}

export default Products