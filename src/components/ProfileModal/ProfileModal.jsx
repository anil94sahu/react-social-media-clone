import { Modal, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../api/UploadRequest';
import { useParams } from 'react-router-dom';
import { updateUser } from '../../actions/UserAction';

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onImageChange =(event) =>{
    if(event.target.files && event.target.files[0]){
      let img = event.target.files[0];
      event.target.name === 'profilePicture'?
      setProfileImage(img):setCoverImage(img)
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const UserData = formData;
    if(profileImage){
      const data = new FormData();
      const filename = Date.now() + profileImage.name;
      data.append("name", filename);
      data.append("file", profileImage.name);
      UserData.image = filename;
      console.log(data.values);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if(coverImage){
      const data = new FormData();
      const filename = Date.now() + coverImage.name;
      data.append("name", filename);
      data.append("file", coverImage.name);
      UserData.image = filename;
      console.log(data.values);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(params.id, UserData));
    setModalOpened(false);
  }

  return (
    <Modal
      title=""
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}

    >
      <form className="infoform">
        <h3>Your info</h3>
        <div>
          <input className="infoInput" type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange}/>
          <input className="infoInput" type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange}/>
        </div>
        <div>
          <input className="infoInput" type="text" name="worksAt" placeholder="Works At" value={formData.worksAt} onChange={handleChange}/>
        </div>
        <div>
          <input className="infoInput" type="text" name="livesin" placeholder="Lives In" value={formData.livesin} onChange={handleChange}/>
          <input className="infoInput" type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange}/>
        </div>
        <div>
          <input className="infoInput" type="text" name="relationship" placeholder="Relationship Status" value={formData.relationship} onChange={handleChange}/>
        </div>
        <div>
          Profile Image
          <input type="file" name="profilePicture" id=""  onChange={onImageChange}/>
          Cover Image
          <input type="file" name="coverPicture" id="" onChange={onImageChange} />
        </div>
        <button className="button infoButton" onClick={handleSubmit}>Update</button>
      </form>
    </Modal>

  );
}
export default ProfileModal;