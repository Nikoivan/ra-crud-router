import { Link } from "react-router-dom";
import "./CRUD-Header.css";

export default function CRUDHeader() {
  return (
    <header className="CRUD-Header">
      <div className="CRUDHeader-Form">
        <Link to="/posts/new" className="Form-Button">
          Cоздать пост
        </Link>
      </div>
    </header>
  );
}
