import { Loading } from "@/store/utilStore";
import store from "../../store/index";
const useApi = () => {
  const getApi = async (url: string, option: any) => {
    store.dispatch(Loading(true));
    let res: any;
    const result = await fetch(url, option)
      .then((result: any) => {
        const json = result.json();

        res = json;
        return res;
      })
      .catch((error) => {
        return (res = error.message);
      })
      .finally(() => {
        store.dispatch(Loading(false));
      });

    return res;
  };

  return { getApi };
};

export default useApi;
