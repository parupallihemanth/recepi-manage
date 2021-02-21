import React from "react";
import axios from "axios";

export const register = (user) => {
  console.log(user);
  return fetch("http://localhost:5001/api/auth/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
