import { useEffect, useState } from "react";
import { CRUDPostProps } from "../../components/CRUD/Post/CRUD-Post";

type OptionsTypes = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: {
    "Content-Type": "application/json";
  };
  body?: string;
};

export default function useReq(
  url: string,
  options: OptionsTypes = { method: "GET" }
): { posts: CRUDPostProps[]; loading: boolean; error: string } {
  const [posts, setPosts] = useState<CRUDPostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const jsonResponse = await fetch(url, options);

        if (!(jsonResponse.status >= 200 && jsonResponse.status < 300)) {
          setError(jsonResponse.statusText);
        }
        const response = jsonResponse.json();
        if (!response) {
          setError("Отсуствует ответ от сервера");
        }
        setPosts(await response);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return { posts, loading, error };
}
