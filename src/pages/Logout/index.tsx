import { useAppDispatch } from "state";
import { useNavigate } from "react-router-dom";
import { logOut } from "state/actions";
import { useEffect } from "react";

export const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logOut());
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);
  return null;
};

export default Logout;
