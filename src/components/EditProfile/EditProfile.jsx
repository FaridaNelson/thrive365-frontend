import "./EditProfile.css";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../utils/userContext";
import { useContext } from "react";

function EditProfile({ onClick, setUsername, setAvatarUrl }) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  return (
    <div className="edit-profile-page">
      <form className="edit-profile-form">
        <h1 className="edit-profile-form__title">Edit Profile</h1>
        <label htmlFor="email">Edit Username</label>
        <input
          required
          type="text"
          placeholder="Enter new username"
          onChange={(e) => {setUsername(e.target.value)}}
        />
        <label htmlFor="avatarUrl">Edit Avatar</label>
        <input
          required
          type="url"
          placeholder="Enter new image url link"
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <button
          className="edit-profile-form__button"
          type="submit"
          onClick={(e) => onClick(e)}
        >
          Save Changes
        </button>
        <button
          className="edit-profile-form__button"
          type="submit"
          onClick={() => navigate("/dashboard")}
        >
          Discard
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
