import CRUDPost, { CRUDPostProps } from "../Post/CRUD-Post";

import Preloader from "../../Preloader/Preloader";
import { useContext, useEffect, useState } from "react";
import Context from "../../../assets/services/Context";
import http from "../../../assets/services/http";

const CRUDMain = () => {
  const [posts, setPosts] = useState<CRUDPostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { baseUrl } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    window.setTimeout(async () => {
      const data = await http(baseUrl + "/posts");

      if (!data) {
        setError("Ошибка загрузки данных");
      }
      setPosts(data);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="CRUD-Main">
      {loading ? (
        <Preloader />
      ) : (
        <ul className="CRUD-Posts">
          {posts.map((post) => (
            <CRUDPost {...post} key={post.id} />
          ))}
        </ul>
      )}
      {error ? <div>{error}</div> : null}
      {error || null}
    </div>
  );
};

export default CRUDMain;
