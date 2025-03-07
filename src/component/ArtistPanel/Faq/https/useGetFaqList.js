import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../services/axios";
import { faqendpoints } from "../../../../services/apis";

async function FAQList() {
  const { data } = await axiosInstance.get(faqendpoints.FAQ_LIST);
  return data.data;
}

export const useGetFaqList = () => {
  return useQuery({
    queryKey: [faqendpoints.FAQ_LIST],
    queryFn: FAQList,
  });
};
