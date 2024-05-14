"use client";

import GlobalApi from "@/app/_services/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CategorySidebar = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const params = usePathname();
  params.split("/")[2];

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    params && setSelectedCategory(params.split("/")[2]);
  }, [params]);

  const getCategoryList = () => {
    GlobalApi.getCategory()
      .then((res) => {
        setCategoryList(res.categories);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2 className="font-bold mb-3 text-lg text-primary">Categories</h2>
      <div>
        {categoryList.map((category, index) => (
          <Link
            href={"/search/" + category.name}
            key={index}
            className={`flex gap-2 p-3 
          border rounded-lg mb-3
          md:mr-10 cursor-pointer
          hover:bg-purple-50
          hover:shadow-md
          items-center
          hover:text-primary
           hover:border-primary
           ${
             selectedCategory == category.name &&
             "border-primary text-primary shadow-md bg-purple-50"
           }
           `}
          >
            <Image src={category.icon.url} alt="icon" width={30} height={30} />
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
