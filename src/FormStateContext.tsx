import { createContext } from "react";

import FORM_STATE from "./form_state";

const FormStateContext = createContext({
  form: FORM_STATE,
  setForm: (
    form: typeof FORM_STATE | ((form: typeof FORM_STATE) => typeof FORM_STATE)
  ) => {},
});

export default FormStateContext;
