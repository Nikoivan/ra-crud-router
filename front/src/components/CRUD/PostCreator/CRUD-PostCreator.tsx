import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";

import Context, { ContextProps } from "../../../assets/services/Context";
import pencilUrl from "../../../assets/images/pencil.png";
import photoCamUrl from "../../../assets/images/photocamera.png";
import videoCamUrl from "../../../assets/images/videocamera.png";
import folderUrl from "../../../assets/images/folder.png";
import http from "../../../assets/services/http";

import "./CRUD-PostCreator.css";

export default function CRUDPostCreator() {
  const [inputState, setInState] = useState<string>("");
  const { baseUrl, currentId, setId } = useContext<ContextProps>(Context);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInState(e.target.value);
  };

  const onClickBtn = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputState) {
      return;
    }
    await http(
      baseUrl + "/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: currentId, content: inputState }),
      },
      true
    );
    setId(currentId + 1);
    setInState("");
    console.log;
  };

  return (
    <div className="CRUD-PostCreator">
      <div className="PostCreator-Header">
        <div className="Header-ActionList">
          <div className="List-ActionItem">
            <img src={pencilUrl} alt="" className="ActionItem-Image" />
            <span className="ActionItem-Title">Публикация</span>
          </div>
          <div className="List-ActionItem">
            <img src={photoCamUrl} alt="" className="ActionItem-Image" />
            <span className="ActionItem-Title">Фото/видео</span>
          </div>
          <div className="List-ActionItem">
            <img src={videoCamUrl} alt="" className="ActionItem-Image" />
            <span className="ActionItem-Title">Прямой эфир</span>
          </div>
          <div className="List-ActionItem">
            <img src={folderUrl} alt="" className="ActionItem-Image" />
            <span className="ActionItem-Title">Ещё</span>
          </div>
        </div>
        <div className="Header-ItemAction">
          <Link className="ActionItem-Exit" to="/">
            &times;
          </Link>
        </div>
      </div>
      <div className="PostCreator-Main">
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            return;
          }}
          className="PostCreator-Form"
        >
          <input
            onChange={onChange}
            type="text"
            className="PostCreator-Input"
            value={inputState}
          />
          <button onClick={onClickBtn} className="PostCreator-Button">
            <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
              Опубликовать
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
}
