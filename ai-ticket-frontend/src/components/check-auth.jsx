import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckAuth({ children, protected: isProtected, protectedRoute }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const shouldProtect = typeof isProtected === "boolean" ? isProtected : protectedRoute;
    if (shouldProtect) {
      if (!token) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    } else {
      if (token) {
        navigate("/");
      } else {
        setLoading(false);
      }
    }
  }, [navigate, isProtected, protectedRoute]);

  if (loading) {
    return <div>loading...</div>;
  }
  return children;
}

export default CheckAuth;