import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customersData, searchCustomer } from "../features/customerSlice";

export const useGetCustomer = (keys) => {
  const dispatch = useDispatch();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 30,
    page: 0,
  });

  const handlePagination = (e) => {
    console.log(e);
    const { page, pageSize } = e;
    const obj = { ...paginationModel };
    obj["page"] = page;
    obj["pageSize"] = pageSize;
    setPaginationModel(obj);
  };

  const customers = useSelector(customersData);
  const count = customers?.count;
  const updatedCustomer = customers?.data?.map((item) => ({
    ...item,
    id: item._id,
  }));

  useEffect(() => {
    const payload = {
      keys,
      limit: paginationModel.pageSize,
      skip: paginationModel.pageSize * paginationModel.page,
    };
    dispatch(searchCustomer(payload));
  }, [keys, dispatch, paginationModel]);

  return {
    data: updatedCustomer,
    count,
    paginationModel,
    setPaginationModel,
    handlePagination,
  };
};
