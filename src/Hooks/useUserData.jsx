import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserData = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return {
    userInfo,
    role: userInfo?.role || null,
    isLoading,
  };
};

export default useUserData;