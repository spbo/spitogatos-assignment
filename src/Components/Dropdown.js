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

const Dropdown = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const { data, error, isLoading } = useAsync({ promiseFn: loadData });

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

  const categoryListWithHtml = categoryList.map((category) => {
    return (
      <option key={category.categoryId} value={category.categoryName}>
        {category.categoryName}
      </option>
    );
  });

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

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (isLoading) return "";
  if (error) return `Something went wrong: ${error.message}`;
  if (data) {
    return (
      <div>
        <select onChange={(e) => handleChange(e)}>
          {categoryListWithHtml}
        </select>
        <select>{subCategoryListWithHtml}</select>
      </div>
    );
  }
};

export default Dropdown;
