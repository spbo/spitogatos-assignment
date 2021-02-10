import React, { useState, useEffect } from "react";
import { useAsync } from "react-async";

// make the API call
const loadData = async () => {
  const res = await fetch(
    "https://run.mocky.io/v3/0b8fbded-6ce4-4cb2-bf2f-d2c39207506b"
  );
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

// rendering dropdown menus
const Dropdown = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const { data, error, isLoading } = useAsync({ promiseFn: loadData });

  // when data fetched feed state object
  useEffect(() => {
    if (data) {
      const array = data.map((category) => ({
        categoryId: category.categoryId,
        categoryName: category.name,
        subCategories: category.subCategories
          ? category.subCategories.map((subCategory) => ({
              subCategoryId: subCategory.subCategoryId,
              subCategoryName: subCategory.name,
            }))
          : [],
      }));

      setCategoryList(array);
    }
  }, [data]);

  // convert all fetced cateogries to a valid html tag
  const categoryListWithHtml = categoryList.map((category) => {
    return (
      <option key={category.categoryId} value={category.categoryName}>
        {category.categoryName}
      </option>
    );
  });

  // only for user's selected category convert fetced subcategories to a valid html tag
  const subCategoryListWithHtml = categoryList
    .filter((category) => category.categoryName === selectedCategory)
    .filter((category) => category.subCategories.length > 0)
    .map((category) => {
      return category.subCategories.map((subCategory) => {
        return (
          <option
            key={subCategory.subCategoryId}
            value={subCategory.subCategoryName}
          >
            {subCategory.subCategoryName}
          </option>
        );
      });
    });

  // get user selection
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // waiting to fetch data
  if (isLoading) return "";

  // data fetched unsuccesfully
  if (error) return `Something went wrong: ${error.message}`;

  // data fetched successfully
  if (data) {
    return (
      <div className="dropdowns">
        <select className="dropdown-1" onChange={(e) => handleChange(e)}>
          {categoryListWithHtml}
        </select>
        <select className="dropdown-2">{subCategoryListWithHtml}</select>
      </div>
    );
  } else return null;
};

export default Dropdown;
