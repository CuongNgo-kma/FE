import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from "../api/url"
function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(()=>{
        const getCategories = async ()=>{
          const res = await axios.get(`${url}/api/category`)
            console.log(res);
            setCategories(res.data)
        }
        getCategories()
    },[])

  return {
    categories: [categories, setCategories],
      callback: [callback, setCallback]
}
}

export default CategoriesAPI