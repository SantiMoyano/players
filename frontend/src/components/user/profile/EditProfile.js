import { useState } from "react";
import { Profile } from "./Profile";

export function EditProfile({ userData, handleUpdateProfile }) {
  const [username, setUsername] = useState(userData.username);
  const [profileImageUrl, setProfileImageUrl] = useState(
    userData.profileImageUrl
  );
  const [profileBio, setProfileBio] = useState(userData.profileBio);
  const [profileBannerColor, setBannerColor] = useState(
    userData.profileBannerColor
  );

  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  function handleChangeImageUrl(e) {
    setProfileImageUrl(e.target.value);
  }

  function handleChangeBio(e) {
    setProfileBio(e.target.value);
  }

  function handleChangeColor(e) {
    setBannerColor(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { username, profileImageUrl, profileBio, profileBannerColor };
    handleUpdateProfile(data);
  }

  return (
    <section
      className="form-section"
      style={{ padding: "10px", minHeight: "10px" }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={userData.username}
              onChange={handleChangeUsername}
            />
          </div>
          <div>
            <label htmlFor="name">Bio:</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={userData.profileBio}
              onChange={handleChangeBio}
            />
          </div>
          <div>
            <label htmlFor="name">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="name"
              defaultValue={userData.profileImageUrl}
              onChange={handleChangeImageUrl}
              onPaste={handleChangeImageUrl}
            />
          </div>
          <div>
            <label htmlFor="name">Banner color:</label>
            <input
              type="color"
              id="colorPicker"
              defaultValue={userData.profileBannerColor}
              onChange={handleChangeColor}
            />
          </div>
          <div className="button-submit">
            <button type="submit">Update profile</button>
          </div>
        </div>
      </form>
    </section>
  );
}
export default EditProfile;
