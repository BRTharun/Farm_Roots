import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoginComponent } from "../store/Reducer/headerLoginSlice";
import { toast } from "react-toastify";

function useFetch(path, authentication, setLoader, cb) {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const callback = useCallback(
    (data) => {
      if (cb) cb(data);
    },
    [cb]
  );

  useEffect(() => {
    // console.log("Fetching data for path:", path);
    const fetchData = async () => {
      const headers = {};

      if (authentication) {
        const localIdToken = localStorage.getItem("dummyToken");
        if (!localIdToken) {
          toast.error("To perform this operation, you have to log in");
          if (setLoader) setLoader(false);
          dispatch(setLoginComponent());
          setLoading(false);
          return;
        }
        headers.idToken = localIdToken;
      }

      try {
        const response = await axios.get(path, { headers });
        const { data } = response;

        // console.log("API Response:", data);

        callback(data);

        if (data !== state) {
          setState(data);
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
        if (setLoader) setLoader(false);
      }
    };

    fetchData();
  }, [path, authentication, setLoader, dispatch, callback, state]);

  return { state, loading, error };
}

export default useFetch;
