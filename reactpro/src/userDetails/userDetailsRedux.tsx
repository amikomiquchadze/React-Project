import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "./userDetails.scss"; // Reuse existing SCSS

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }
  
  

export default function (){
  const users = useSelector((state: RootState) => state.users.users);
  const user = users[6];

  if (!user) {
    return <div className="error">7th user not found in the Redux store.</div>;
  }

  return (
    <div className="first-api-container">
      <h2 className="first-api-header">{user.name}'s Details</h2>
      <ul className="user-list">
        <li className="user-item">
          <span className="user-name">Email:</span>
          <span>{user.email}</span>
        </li>
        <li className="user-item">
          <span className="user-name">Phone:</span>
          <span>{user.phone}</span>
        </li>
        <li className="user-item">
          <span className="user-name">Website:</span>
          <span>
            <a
              href={`http://${user.website}`}
              target="_blank"
              rel="noreferrer"
              className="user-name"
            >
              {user.website}
            </a>
          </span>
        </li>
        <li className="user-item">
          <span className="user-name">Address:</span>
          <span>
            {user.address.street}, {user.address.suite}, {user.address.city},{" "}
            {user.address.zipcode}
          </span>
        </li>
        <li className="user-item">
          <span className="user-name">Company:</span>
          <span>{user.company.name}</span>
        </li>
        <li className="user-item">
          <span className="user-name">Catch Phrase:</span>
          <span>{user.company.catchPhrase}</span>
        </li>
      </ul>
    </div>
  );
};

