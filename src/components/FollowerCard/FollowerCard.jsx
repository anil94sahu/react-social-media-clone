import React, { useEffect, useState } from 'react'
import './FollowerCard.css';
import {Followers} from '../Data/FollowerData';
import User from '../User/User';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../api/UserRequest';
const FollowerCard = () => {
  const [person, setPerson] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(()=>{
    const fetchPerson = async () => {
      try {
        const res = await getAllUser();
        console.log(res);
        if(res){
          setPerson(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPerson();
  },[])
  return (
    <div className="FollowerCard">
      <h3>Who is following you?</h3>
      {person.map((person,i) => {
        return(
          <User  person = {person} key = {i}/>
        )
      })}
    </div>
    )
}

export default FollowerCard