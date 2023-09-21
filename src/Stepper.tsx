import { useCallback, useContext, useState } from "react";
import { Fade } from "react-awesome-reveal";

import { produce } from "immer";
import { Tab } from "@headlessui/react";

import FORM_STATE from "./form_state";
import FormStateContext from "./FormStateContext";

import PetNameForm from "./PetNameForm";
import SpecsForm from "./SpecsForm";
import MailForm from "./MailForm";
import Results from "./Results";

const FORM_STEPS = [
  {
    label: `Nombre de mascota`,
  },
  {
    label: `Specs de mascota`,
  },
  {
    label: `Email`,
  },
  {
    label: `Completado`,
  },
];

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
  onClick?: () => void;
  children?: React.ReactNode;
}

const Step = ({ children, onClick }: StepProps) => {
  return <Tab onClick={onClick}>{children} </Tab>;
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
      <Tab.Group selectedIndex={selectedIndex}>
        <Tab.List className="mientras">
          {FORM_STEPS.map((step, index) => {
            return (
              <Step
                key={index}
                step={index + 1}
                onClick={() => {
                  setSelectedIndex(index);
                }}
              >
                {step.label}
              </Step>
            );
          })}
        </Tab.List>
        <Fade>
          <p className="welcome">
            Te ayudaremos a elegir los mejores productos para tu amigo peludo
          </p>
        </Fade>
        <Tab.Panels>
          <Tab.Panel>
            <Fade>
              <div className="form">
                <PetNameForm onNext={next} />
              </div>
            </Fade>
          </Tab.Panel>

          <Tab.Panel>
            <Fade>
              <div className="form">
                <SpecsForm onNext={next} onPrev={prev} />
              </div>
            </Fade>
          </Tab.Panel>

          <Tab.Panel>
            <Fade>
              <div className="form">
                <MailForm onNext={next} onPrev={prev} />
              </div>
            </Fade>
          </Tab.Panel>

          <Tab.Panel>
            <Fade>
              <div>
                <Results />
              </div>
            </Fade>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default Stepper;
