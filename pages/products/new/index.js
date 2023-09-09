import Layout from "@/components/Layout";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";

const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [cat, setCat] = useState([]);
  const [productProperties, setProductProperties] = useState({});

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCat(res.data);
    });
  }, []);
  const createproduct = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    await axios.post("/api/products", data);
    router.push("/products");
  };

  const uploadImage = async (e) => {
    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
  };
  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (cat.length > 0 && category) {
    let catInfo = cat.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = cat.find(({ _id }) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }
  return (
    <Layout>
      <form className="flex flex-col gap-3" onSubmit={createproduct}>
        <h1 className="text-5xl font-bold text-[#5D5FEF]">New Product</h1>
        <div className="bg-[#fff] flex gap-7  p-4 rounded-2xl mt-6 px-6">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <label className="text-xl">Product name</label>
              <input
                type="text"
                placeholder="product name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xl">Photos</label>
              <div className="flex">
                <label className="w-24 h-24 border flex items-center justify-center text-sm gap-2 text-gray-500 rounded-lg bg-gray-200">
                  <AiOutlineUpload /> Upload
                  <input
                    type="file"
                    className="hidden"
                    onChange={uploadImage}
                  />
                </label>
                <div className="flex w-24 h-24">
                  {images?.map((img) => (
                    <img src={img} alt="..." key={img}/>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-xl">Description</label>
              <textarea
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-7">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent p-2 border border-[#c2bebe] rounded-lg"
            >
              <option value="">No Category</option>
              {cat.map((c) => (
                <option value={c._id} key={c._id}>{c.name}</option>
              ))}
            </select>
            {propertiesToFill.length > 0 &&
              propertiesToFill.map((p) => (
                <div key={p.name} className="">
                  <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
                  <div>
                    <select
                      value={productProperties[p.name]}
                      onChange={(ev) => setProductProp(p.name, ev.target.value)}
                    >
                      {p.values.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            <div className="flex flex-col">
              <label className="text-xl">Price (in Rs)</label>
              <input
                type="number"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button className="bg-[#5D5FEF] p-2 rounded-2xl w-3/12">Save</button>
      </form>
    </Layout>
  );
};

export default NewProduct;
