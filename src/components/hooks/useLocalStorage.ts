const useLocalStorage = () => {
  const getLocalStorage = async (key: string, option: any): Promise<any> => {
    let result: any;
    if (key !== "" && option !== "get" && option !== "get_string") {
      await localStorage.setItem(key, JSON.stringify(option));
      result = [];
    } else if (key !== "" && option == "get") {
      result = await JSON.parse(String(localStorage.getItem(key)));
    } else if (key !== "" && option == "get_string") {
      result = await String(localStorage.getItem(key));
    }

    return result;
  };

  return { getLocalStorage };
};

export default useLocalStorage;
