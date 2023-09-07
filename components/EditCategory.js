import React, { useState } from "react";

const EditCategory = ({ setPopup,c,cat }) => {
  const [name, setName] = useState(c.name);
  const [parentcategory, setParentcategory] = useState(c?.parentcategory?.name);
  return (
    <div className="fixed inset-0 bg-[#5D5FEF]/[0.09] z-50 grid place-items-center px-3.5 py-1 border-none">
      <div className="flex flex-col items-center justify-center gap-5 h-2/6 w-4/12  rounded-xl bg-[#7173e0c8] shadow-2xl">
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
            <option value={c._id} key={c._id}>{c.name}</option>
          ))}
        </select>
        <button onClick={() => setPopup(false)}>Hi</button>
      </div>
    </div>
  );
};

export default EditCategory;
