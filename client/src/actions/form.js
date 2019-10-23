import axios from "axios";
import { SUBMIT_FORM } from "./types";

export const submitForm = formData => async dispatch => {
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

    //redirect or something
  } catch (err) {
    const errors = err.response.data.errors; //not correct

    if (errors) {
      errors.forEach(error => console.log(error.msg)); //FIX LATER

      //TODO Dispatch SUBMIT_FAIL
    }
  }
};
