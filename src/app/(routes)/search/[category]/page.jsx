"use client";
import BussinessList from "@/app/_components/BussinessList";
import GlobalApi from "@/app/_services/GlobalApi";
import { useEffect, useState } from "react";

const buisnessCategory = ({ params }) => {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    params && getBusinessList();
  }, []);
  const getBusinessList = () => {
    GlobalApi.getBusinessListByCategory(params.category)
      .then((res) =>{
        setBusinessList(res?.businessLists)
      })
      .catch((error) => console.log(error));
  };

  return <div>
    <BussinessList title={params.category} businessList={businessList} />
  </div>;
};

export default buisnessCategory;
