import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { globalState } from "../../../globalState";
import Loading from "../auth/Loading/Loading";
import url from '../../../api/url'
const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description:
    "",
  content:
    "",
  category: "",
  _id: "",
};

function CreateProduct() {
  const state = useContext(globalState);
  const [products, setProduct] = useState(initialState);
  const [categories] = state.CategoriesAPI.categories;
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.UserAPI.isAdmin;
  const [token] = state.token;

  const navigate = useNavigate();
  const param = useParams();

  const [product]= state.ProductAPI.product;

  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.ProductAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      if (product) {
        product.forEach((product) => {
          if (product._id === param.id) {
            setProduct(product);
            setImages(product.images);
          }
        });
      }
    } else {
      setOnEdit(false);
      setProduct(initialState);
      // setImages(false);
    }
  }, [param.id, product]);

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!isAdmin) return alert("You're not an admin");
  //     const file = e.target.files[0];

  //     if (!file) return alert("File not exist.");

  //     if (file.size > 1024 * 1024)
  //       // 1mb
  //       return alert("Size too large!");

  //     if (file.type !== "image/jpeg" && file.type !== "image/png")
  //       // 1mb
  //       return alert("File format is incorrect.");

  //     let formData = new FormData();
  //     formData.append("file", file);

  //     setLoading(true);
  //     const res = await axios.post(`/api/upload`, formData, {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //         Authorization: token,
  //       },
  //     });
  //     setLoading(false);
  //     setImages(res.data);
  //   } catch (err) {
  //     alert(err.response.data.msg);
  //   }
  // };

  const handleChangeInputImage = (e)=>{
    const val = e.target.value
   
    setImages(val)
    console.log(val);
  }
  // const handleDestroy = async () => {
  //   try {
  //     if (!isAdmin) return alert("You're not an admin");
  //     setLoading(true);
  //     await axios.post(
  //       `${url}/api/destroy`,
  //       { public_id: images.public_id },
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );
  //     setLoading(false);
  //     setImages(false);
  //   } catch (err) {
  //     alert(err.response.data.msg);
  //   }
  // };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...products, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      if (!images) return alert("No Image Upload");

      if (onEdit) {
        await axios.put(
          `${url}/api/products/${product._id}`,
          { ...products, images: {
              public_id: param,
              url: images       
          } },
          {
            headers: { Authorization: token },
          }
        );
      
      } else {
        await axios.post(
          `${url}/api/products`,
          {
            ...products, images: {
              public_id: param,
              url: images
            } },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <div className="create_product">
      <div className="upload">
        {/* <input type="file" name="file" id="file_up" onChange={handleUpload} /> */}
        
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
              {onEdit ? <img src={images ? images.url : ""} alt="" /> : <img src={images ? images : ""} alt="" />}
          </div>
        )}
       
      </div>
      

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product ID</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={products.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>
        {onEdit ? <div className="row">
          <label htmlFor="title">Image Link</label>
          <input
            type="text"
            name="image"
            id="title"
            required
            value={images.url}
            onChange={handleChangeInputImage}
          />
        </div> : <div className="row">
          <label htmlFor="title">Image Link</label>
          <input
            type="text"
            name="image"
            id="title"
            required
            value={images}
            onChange={handleChangeInputImage}
          />
        </div>}
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={products.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={products.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={products.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={products.content}
            rows="7"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select
            name="category"
            value={products.category}
            onChange={handleChangeInput}
          >
            <option value="">Please select a category</option>
            {categories ? categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            )):""}
          </select>
        </div>

        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default CreateProduct;
