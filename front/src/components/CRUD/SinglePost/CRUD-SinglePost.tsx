import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Preloader from "../../Preloader/Preloader";
import CRUDPost, { CRUDPostProps } from "../Post/CRUD-Post";
import Context from "../../../assets/services/Context";
import imgUrl from "../../../assets/images/avatar.jpg";
import http from "../../../assets/services/http";
import "./CRUD-SinglePost.css";

export default function CRUDSinglePost() {
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<string>("read");
  const [postData, setData] = useState<CRUDPostProps>({ id: 0, content: "" });
  const [inputState, setInput] = useState<string>(postData.content);
  const { baseUrl } = useContext(Context);
  const { postId } = useParams();
  const subUrl = "/posts/";
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClick = async () => {
    setLoading(true);
    const response = await http(
      baseUrl + subUrl + postId,
      {
        method: "PUT",
        body: JSON.stringify({ id: postId, content: inputState }),
      },
      true
    );
    if (response.ok) {
      setData((prev) => ({ ...prev, content: inputState }));
      setState("read");
    }
    setLoading(false);
  };

  const onEditClick = (e: FormEvent) => {
    e.preventDefault();
    setState("edit");
  };

  const onRemoveClick = async (e: FormEvent) => {
    e.preventDefault();
    const res = await http(
      `${baseUrl}/posts/${postId}`,
      { method: "DELETE" },
      true
    );
    if (res.ok) {
      navigate(-1);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (state === "read") {
      window.setTimeout(async () => {
        try {
          setLoading(true);
          const jsonResponse = await fetch(`${baseUrl}${subUrl}${postId}`);
          const response = await jsonResponse.json();

          if (response) {
            setData(response.post);
            setInput(response.post.content);
          }
          setLoading(false);
        } catch (e) {
          console.error(e);
        }
      }, 1000);
    }
    setLoading(false);
  }, []);

  return (
    <div className="CRUD-SinglePost">
      {loading ? <Preloader /> : null}

      {state === "read" ? (
        <>
          <CRUDPost {...postData} />
          <footer className="Post-Footer">
            <form className="Post-FooterActions">
              <button onClick={onEditClick} className="FooterActions-EditBtn">
                Изменить
              </button>
              <button
                onClick={onRemoveClick}
                className="FooterActions-RemoveBtn"
              >
                Удалить
              </button>
            </form>
          </footer>
        </>
      ) : (
        <div className="CRUD-PostChange">
          <div className="PostChange-Header">
            <div className="Header-Top">
              <span className="Header-Title">Редактировать публикацию</span>
              <span
                onClick={() => {
                  setState("read");
                }}
                className="Header-CloseBtn"
              >
                &#65794;
              </span>
            </div>
            <div className="Header-Mid">
              <img src={imgUrl} alt="avatar" className="Header-Image" />
              <form
                onSubmit={(e: FormEvent) => {
                  e.preventDefault();
                }}
              >
                <input
                  onChange={onChange}
                  type="text"
                  value={inputState}
                  className="PostChange-Input"
                />
              </form>
            </div>
          </div>
          <div className="PostChange-Main">
            <span className="PostChange-Btn">Фото/видео</span>
            <span className="PostChange-Btn">Отметить друзей</span>
            <span className="PostChange-Btn">Чувства/действия</span>
            <span className="PostChange-Btn">Отметить посещение</span>
            <span className="PostChange-Btn">GIF</span>
          </div>
          <div className="PostChange-Footer">
            <form
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
              }}
              className="Footer-Form"
            >
              <button onClick={onClick} className="Form-Button">
                Сохранить
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
