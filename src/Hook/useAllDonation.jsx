import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllDonation = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: allDonation = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["petDonation"],
    queryFn: async () => {
      const res = await axiosPublic.get("/petDonation");
      return res.data;
    },
  });

  return [allDonation, isLoading, refetch];
};

export default useAllDonation;
