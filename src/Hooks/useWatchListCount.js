import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth"; 

const useWatchlistCount = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: count = 0,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["watchlistCount"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users/watchlist/count");
      return data.count;
    },

    enabled: !loading && !!user,
  });

  return { count, isLoading, isError, refetch };
};

export default useWatchlistCount;