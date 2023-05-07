import useApi from "@/components/hooks/useApi";

export const Repo = async (name: string): Promise<any> => {
  const { getApi } = useApi();

  const result = await getApi(
    "https://api.github.com/users/" + name + "/repos?ref=codesnippet.io",
    {
      method: "GET",
    }
  );

  return result;
};

export const Profile = async (name: string): Promise<any> => {
  const { getApi } = useApi();

  const result = await getApi("https://api.github.com/users/" + name, {
    method: "GET",
  });

  return result;
};
export const GithubService = {
  Repo,
  Profile,
};
