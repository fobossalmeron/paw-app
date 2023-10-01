import { useCallback, useContext, useState } from "react";
import { Fade } from "react-awesome-reveal";

import { produce } from "immer";

import FORM_STATE from "./form_state";
import FormStateContext from "./FormStateContext";

import PetNameForm from "./PetNameForm";
import SpecsForm from "./SpecsForm";
import Results from "./Results";

const FORM_STEPS = [
  {
    label: `Nombre de mascota`,
  },
  {
    label: `Specs de mascota`,
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
  return <button onClick={onClick}>{children} </button>;
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

  const setSpecie = useCallback(
    (specie: string) => {
      console.log(specie);
      setForm(
        produce((form) => {
          form.specie = specie;
        })
      );
    },
    [setForm]
  );

  return (
    <>
      <div className="mientras">
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
      </div>

      {form.selectedIndex <= 1 && (
        <Fade>
          <p className="welcome">
            Te ayudaremos a elegir los mejores productos para tu amigo peludo
          </p>
        </Fade>
      )}
      {form.selectedIndex === 0 && (
        <Fade>
          <div className="form">
            <PetNameForm onNext={next} />
          </div>
        </Fade>
      )}

      {form.selectedIndex === 1 && (
        <Fade>
          <div className="form">
            <SpecsForm onNext={next} onPrev={prev} setSpecie={setSpecie} />
          </div>
        </Fade>
      )}

      {/* {form.selectedIndex === 2 && (
        <Fade>
          <div className="form">
            <MailForm onNext={next} onPrev={prev} />
          </div>
        </Fade>
      )} */}

      {form.selectedIndex === 2 && <Results />}
    </>
  );
};

export default Stepper;
