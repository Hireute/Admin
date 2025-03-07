import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../services/axios";
import { blogEndpoints, faqendpoints } from "../../../../services/apis";

async function blogList() {
  const { data } = await axiosInstance.get(blogEndpoints.ALL_BLOG);
  return data.data;
}

export const useGetBlogList = () => {
  return useQuery({
    queryKey: [blogEndpoints.ALL_BLOG],
    queryFn: blogList,
  });
};
