import useAPIQuery from "./useApiQuery";

const useCurrentUser = () => {
  const query = useAPIQuery({
    url: "user/current",
    options: { refetchOnMount: false },
  });

  return query;
};

export default useCurrentUser;
