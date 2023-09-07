import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LuEdit3 } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

const Categories = () => {
  const [edit, setEdit] = useState(null);
  const [name, setName] = useState("");
  const [cat, setCat] = useState([]);
  const [parentcategory, setParentcategory] = useState("");
  const [properties, setProperties] = useState([]);


  const CreateCategory = async (e) => {
    e.preventDefault();
    if (edit) {
      await axios.put("/api/categories", {
        name,
        parentcategory,
        _id: edit._id,
        properties: properties.map((pr) => ({
          name: pr.name,
          values: pr.values.split(","),
        })),
      });
      setEdit(null);
    } else {
      await axios.post("/api/categories", {
        name,
        parentcategory,
        properties: properties.map((pr) => ({
          name: pr.name,
          values: pr.values.split(","),
        })),
      });
    }

    setName("");
    setParentcategory("");
    setProperties([]);
    fetchCat();
  };

  useEffect(() => {
    fetchCat();
  }, []);
  const fetchCat = () => {
    axios.get("/api/categories").then((res) => {
      setCat(res.data);
    });
  };
  const EditCategory = (c) => {
    setEdit(c);
    setName(c.name);
    setParentcategory(c?.parentcategory?._id);
    setProperties(c?.properties?.map(({name,values}) => ({
      name,
      values:values.join(',')
    })));
  };

  const DeleteCategory = async (c) => {
    const { _id } = c;
    await axios.delete("/api/categories?_id=" + _id);
    fetchCat();
  };

  const Addproperty = () => {
    setProperties(prev => {
      return [...prev, { name: "", values: "" }];
    });
  };
  function handleNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handleValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }
  function remove(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  const ClearInput = ()=>{
    setName('');
    setParentcategory('');
    setProperties([]);
    setEdit(null);

  }
  return (
    <Layout>
      <h1 className="text-3xl font-semibold tracking-wider ">Categories</h1>
      <div className="text-sm mt-7">
        {edit ? `Edit Category ${edit.name}` : "New Category name"}
      </div>
      <form onSubmit={CreateCategory} className="w-full flex flex-col gap-3">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Category name"
            className="w-5/12 bg-transparent border border-[#c2bebe]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={parentcategory}
            onChange={(e) => setParentcategory(e.target.value)}
            className="bg-transparent border border-[#c2bebe] rounded-lg"
          >
            <option value="">No Parent Category</option>

            {cat?.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <button
            onClick={Addproperty}
            type="button"
            className="bg-[#6e6e76] mb-2 rounded-lg w-40 p-1 font-semibold text-white"
          >
            Add new Property
          </button>
          {properties?.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex gap-1 mb-2">
                <input
                  type="text"
                  value={property.name}
                  className="mb-0"
                  onChange={(ev) =>
                    handleNameChange(index, property, ev.target.value)
                  }
                  placeholder="property name (example: color)"
                />
                <input
                  type="text"
                  className="mb-0"
                  onChange={(ev) =>
                    handleValuesChange(index, property, ev.target.value)
                  }
                  value={property.values}
                  placeholder="values, comma separated"
                />
                <button
                  onClick={() => remove(index)}
                  type="button"
                  className="bg-[#6e6e76] rounded-lg w-40 p-1 font-semibold text-white"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-3">
          {edit && (
            <button
              onClick={ClearInput}
              className="bg-[#6d6d76] p-2 rounded-lg w-20 font-semibold text-white"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-[#5D5FEF] p-2 rounded-lg  w-20 font-semibold text-white"
          >
            Save
          </button>
        </div>
      </form>
      <div>
        <h1>Category name</h1>
        {cat?.map((c) => (
          <div className="flex gap-8" key={c._id}>
            <h1>{c.name}</h1>
            <p>{c?.parentcategory?.name}</p>
            <button onClick={() => EditCategory(c)}>
              <LuEdit3 />
            </button>

            <button className="text-red-500" onClick={() => DeleteCategory(c)}>
              <RiDeleteBin6Line />
            </button>
            {/* {deletepopup && (
              <div className="fixed inset-0 bg-[#5D5FEF]/[0.09] z-50 grid place-items-center px-3.5 py-1 border-none">
                <div className="flex flex-col items-center justify-center gap-2 h-1/6 w-3/12  rounded-xl bg-[#7173e0c8] shadow-2xl">
                  <h1 className="text-lg text-white tracking-wide">Do you want to delete {c.name} ?</h1>
                  <div className="flex gap-5">
                  <button className="bg-[#64646a] text-white p-2 rounded-lg px-6" onClick={() => DeleteCategory(c)}>Yes</button>
                  <button className="bg-[#64646a] text-white p-2 rounded-lg px-6" onClick={()=>setDeletepopup(false)}>No</button>
                  </div>

                </div>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
