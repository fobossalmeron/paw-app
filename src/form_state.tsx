const FORM_STATE = {
  selectedIndex: 0,
  steps: {
    petName: {
      valid: false,
      dirty: false,
      value: {
        name: undefined,
      },
    },
    specs: {
      valid: false,
      dirty: false,
      value: {
        breed: undefined,
        age: undefined,
        weight: undefined,
      },
    },
    email: {
      valid: false,
      dirty: false,
      value: {
        email: undefined,
      },
    },
  },
};

export default FORM_STATE;
