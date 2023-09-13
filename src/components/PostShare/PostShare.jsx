import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery, UilTimes } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import ProfileImage from "../../img/profileImg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";
const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  // console.log(process);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const loading  = useSelector((state) => state.postReducer.uploading);
  // const user = data;
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image.name);
      newPost.image = filename;
      console.log(data.values);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
  };
  return (
    <div className="PostShare">
      <img src={user.profilePicture?serverPublic+ user.profilePicture : serverPublic+"defaultCover.png"} alt="" />
        <div>
          <input type="text" placeholder='What"s happening?' ref={desc} />
          <div className="postOptions">
            <div className="option" onClick={() => imageRef.current.click()}>
              <UilScenery style={{ color: "var(--photo)" }} />
            </div>
            <div className="option">
              <UilPlayCircle style={{ color: "var(--video)" }} />
            </div>
            <div className="option">
              <UilLocationPoint style={{ color: "var(--location)" }} />
            </div>
            <div className="option">
              <UilSchedule style={{ color: "var(--shedule)" }} />
            </div>
            <div className="option">
              <button className="button fc-button" disabled = {loading} onClick={handleSubmit}>
                {loading?'Iploading...':'Share'}
              </button>
              <div style={{ display: "none" }}>
                <input
                  type="file"
                  name="file"
                  ref={imageRef}
                  onChange={onImageChange}
                />
              </div>
            </div>
          </div>
          {image && (
            <div className="previewImage">
              <UilTimes onClick={() => setImage(null)} />
              <img src={URL.createObjectURL(image)} alt="" />
            </div>
          )}
        </div>
    </div>
  );
};

export default PostShare;
