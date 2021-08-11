import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <>
        <div
          style={{
            textAlign: "center",
            margin: "20px",
            padding: "20px",
            border: "2px dotted #000000",
            borderRadius: "1px",
          }}
        >
          <img src={user?.picture} alt={user?.nickname} />
          <h2>{user?.nickname}</h2>
          <p>{user?.email}</p>
        </div>
        <pre
          style={{
            margin: "20px",
          }}
        >
          {JSON.stringify(user, null, 2)}
        </pre>
      </>
    )
  );
};

export default Profile;
