import { useAppDispatch } from "state";
import { useNavigate } from "react-router-dom";
import { LOG_OUT } from "state/actions";
import { useEffect } from "react";

export const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(LOG_OUT());
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);
  return null;
};

export default Logout;
