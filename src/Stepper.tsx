import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { produce } from "immer";
import { Tab } from "@headlessui/react";
import { useForm, useFormState } from "react-hook-form";

const FORM_STATE = {
  selectedIndex: 0,
  steps: {
    details: {
      valid: false,
      dirty: false,
      value: {
        name: "",
      },
    },
    preferences: {
      valid: false,
      dirty: false,
      value: {
        receiveEmails: false,
        receiveNotifications: false,
      },
    },
  },
};

const FORM_STEPS = [
  {
    label: `Details`,
  },
  {
    label: `Preferences`,
  },
  {
    label: `Complete`,
  },
];

const FormStateContext = createContext({
  form: FORM_STATE,
  setForm: (
    form: typeof FORM_STATE | ((form: typeof FORM_STATE) => typeof FORM_STATE)
  ) => {},
});

function Stepper() {
  const [form, setForm] = useState(FORM_STATE);

  return (
    <FormStateContext.Provider
      value={{
        form,
        setForm,
      }}
    >
      <CreateTaskMultiStepForm />
    </FormStateContext.Provider>
  );
}

interface StepProps {
  step: number;
  onSelect: (canSelectStep: boolean) => void;
  children?: React.ReactNode;
}

const Step = ({ children }: StepProps) => {
  return <Tab>{children} </Tab>;
};

const CreateTaskMultiStepForm = () => {
  const { form, setForm } = useContext(FormStateContext);

  const next = useCallback(() => {
    setForm(
      produce((form) => {
        form.selectedIndex += 1;
      })
    );
  }, [setForm]);

  const prev = useCallback(() => {
    setForm(
      produce((form) => {
        form.selectedIndex -= 1;
      })
    );
  }, [setForm]);

  const setSelectedIndex = useCallback(
    (index: number) => {
      setForm(
        produce((form) => {
          form.selectedIndex = index;
        })
      );
    },
    [setForm]
  );

  const selectedIndex = form.selectedIndex;

  return (
    <>
      <p>Te ayudaremos a elegir los mejores productos para tu amigo peludo</p>
      <Tab.Group selectedIndex={selectedIndex}>
        <Tab.List className={"Stepper mb-6"}>
          {FORM_STEPS.map((step, index) => {
            const canSelectStep = Object.values(form.steps)
              .slice(0, index)
              .every((step) => step.valid && !step.dirty);
            return (
              <Step
                key={index}
                step={index + 1}
                onSelect={() => {
                  if (canSelectStep) {
                    setSelectedIndex(index);
                  }
                }}
              >
                {step.label} {canSelectStep}
              </Step>
            );
          })}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <div className={"flex w-full flex-col space-y-6"}>
              <div>
                <h3>Details</h3>
              </div>

              <DetailsForm onNext={next} />
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className={"flex w-full flex-col space-y-6"}>
              <div>
                <h3>Preferences</h3>
              </div>

              <PreferencesForm onNext={next} onPrev={prev} />
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className={"flex w-full flex-col space-y-6"}>
              <div>
                <h3>Complete</h3>
              </div>

              <pre>{JSON.stringify(form, null, 2)}</pre>

              <div className={"flex space-x-2"}>
                <button>Proceed to your Dashboard</button>
                <button color={"transparent"} onClick={prev}>
                  Back
                </button>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

interface ButtonProps {
  children: string;
}
function Button({ children }: ButtonProps) {
  return <input type="submit" value={children} />;
}

function DetailsForm(
  props: React.PropsWithChildren<{
    onNext: () => void;
  }>
) {
  const { form, setForm } = useContext(FormStateContext);

  const { register, handleSubmit, control } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      name: form.steps.details.value.name,
    },
  });

  const { isDirty } = useFormState({
    control,
  });

  const nameControl = register("name", { required: true });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.details.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  return (
    <form
      onSubmit={handleSubmit((value) => {
        console.log(value);
        setForm(
          produce((formState) => {
            formState.steps.details = {
              value,
              valid: true,
              dirty: false,
            };
          })
        );
        props.onNext();
      })}
    >
      <div className={"flex flex-col space-y-4"}>
        <label>
          Pet Name
          <input {...nameControl} />
        </label>

        <input type="submit" value="Next" />
      </div>
    </form>
  );
}

function PreferencesForm(
  props: React.PropsWithChildren<{
    onNext: () => void;
    onPrev: () => void;
  }>
) {
  const { form, setForm } = useContext(FormStateContext);

  const { register, handleSubmit, control } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: form.steps.preferences.value,
  });

  const { isDirty } = useFormState({ control });

  const receiveEmailsControl = register("receiveEmails");
  const receiveNotificationsControl = register("receiveNotifications");

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.preferences.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  return (
    <form
      onSubmit={handleSubmit((value) => {
        setForm(
          produce((state) => {
            state.steps.preferences = {
              valid: true,
              dirty: false,
              value,
            };
          })
        );

        props.onNext();
      })}
    >
      <div className={"flex w-full flex-col space-y-4"}>
        <label className={"flex items-center space-x-4"}>
          <input
            type={"checkbox"}
            className={"Toggle"}
            {...receiveEmailsControl}
          />

          <span>Receive Emails</span>
        </label>

        <label className={"flex items-center space-x-4"}>
          <input
            type={"checkbox"}
            className={"Toggle"}
            {...receiveNotificationsControl}
          />

          <span>Receive Notifications</span>
        </label>

        <div className={"flex space-x-2"}>
          <button>Next</button>

          <button color={"transparent"} onClick={props.onPrev}>
            Back
          </button>
        </div>
      </div>
    </form>
  );
}

export default Stepper;
