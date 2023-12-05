import { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import imgUrl from "../../../assets/images/avatar.jpg";

import "./CRUD-Post.css";

export type CRUDPostProps = {
  content: string;
  id: number;
};

export default function CRUDPost({ content, id }: CRUDPostProps) {
  return (
    <div className="CRUD-Post">
      <Link style={{ textDecoration: "none" }} to={`/posts/${id}`}>
        <div className="Post-Header">
          <div className="Header-ImageContainer">
            <img src={imgUrl} alt="avatar" className="Header-Image" />
          </div>
          <div className="Header-InfoContainer">
            <div className="Header-AuthorName">Ilnaz Gilyazov</div>
            <div className="Header-AuthorAdditionInfo">
              <span className="AuthorAdditionInfo-Status">
                Основатель группы
              </span>
              <span className="AuthorAdditionInfo-Time">
                {Date.now() % 30} мин
              </span>
            </div>
          </div>
        </div>
        <div className="Post-Main">
          <p className="Post-Content">{content}</p>
        </div>
      </Link>
    </div>
  );
}
