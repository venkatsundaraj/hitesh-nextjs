"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ProfileId({ params }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUserDetails = async function () {
      try {
        const response = await axios.get("/api/profile");
        console.log(response.data);
        setUser(response.data.filteredUser);
      } catch (err) {
        console.log(err);
      }
    };
    getUserDetails();
  }, []);

  return <h1>{user.userName}</h1>;
}

export default ProfileId;
