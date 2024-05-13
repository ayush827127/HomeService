"use client";
import { useEffect, useState } from "react";
import BussinessList from "./_components/BussinessList";
import CategoryList from "./_components/CategoryList";
import Hero from "./_components/Hero";
import GlobalApi from "./_services/GlobalApi";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]); 
  const [businessList, setBusinesslist] = useState([]);

  useEffect(() => {
    getCategoryList();
    getAllBusinessList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory()
      .then((res) => setCategoryList(res.categories))
      .catch((err) => console.log(err));
  };

  const getAllBusinessList = () =>{
    GlobalApi.getAllBusinessList()
    .then((res) => setBusinesslist(res.businessLists))
    .catch((err) => console.log(err));
  }

  return (
    <>
      <div>
        <Hero />
        <CategoryList categoryList={categoryList} />
        <BussinessList businessList={businessList} title={"Popular Business"} />
      </div>
    </>
  );
}
