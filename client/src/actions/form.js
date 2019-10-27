import axios from "axios";
import { SUBMIT_FORM } from "./types";

export const submitForm = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/users", formData, config);

    dispatch({
      type: SUBMIT_FORM,
      payload: res.data
    });

    history.push("/success");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => console.log(error.msg));

      //TODO Dispatch SUBMIT_FAIL
    }
  }
};
