import { trpc } from "@/lib/trpc";
import { buildQualificationMessage, getQualificationStep, qualificationGoals, qualificationStages, validateQualifiedName, validateQualifiedWorkEmail, type QualificationGoal, type QualificationStage } from "@/lib/contactQualification";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ContactFormValues = {
  fullName: string;
  email: string;
  note: string;
  formWebsite: string;
};

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [goal, setGoal] = useState<QualificationGoal | null>(null);
  const [stage, setStage] = useState<QualificationStage | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const step = getQualificationStep(goal, stage);
  const reduceMotion = useReducedMotion();
  const form = useForm<ContactFormValues>({
    defaultValues: { fullName: "", email: "", note: "", formWebsite: "" },
    mode: "onBlur",
  });
  const submit = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
    },
  });

  const chooseGoal = (value: QualificationGoal) => {
    setDirection(1);
    setGoal(value);
    setStage(null);
  };

  const chooseStage = (value: QualificationStage) => {
    setDirection(1);
    setStage(value);
  };

  const stepMotion = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, x: direction * 22, y: 6 },
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: direction * -16, y: -3 },
        transition: { duration: 0.24, ease: [0.23, 1, 0.32, 1] as const },
      };

  if (submitted) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <CheckCircle2 size={26} aria-hidden="true" />
        <div><strong>Your request is in.</strong><p>Thank you. We will review your answers and reply with a useful next step.</p></div>
      </div>
    );
  }

  return (
    <form className="contact-form qualification-flow" onSubmit={form.handleSubmit(values => {
      if (!goal || !stage) return;
      submit.mutate({
        fullName: values.fullName,
        email: values.email,
        message: buildQualificationMessage(goal, stage, values.note),
        formWebsite: values.formWebsite,
      });
    })} noValidate>
      <div className="form-honeypot" aria-hidden="true"><label htmlFor="form-website">Leave this field empty</label><input id="form-website" tabIndex={-1} autoComplete="off" {...form.register("formWebsite")} /></div>
      <div className="qualification-progress" aria-label={`Step ${step} of 3`}>
        {["Your focus", "Your stage", "Where to reply"].map((label, index) => <span key={label} className={index + 1 === step ? "is-current" : index + 1 < step ? "is-complete" : ""}><b>{String(index + 1).padStart(2, "0")}</b>{label}</span>)}
      </div>

      <AnimatePresence mode="wait" initial={false}>
      {step === 1 && <motion.section key="step-1" className="qualification-step" aria-labelledby="goal-question" {...stepMotion}>
        <p className="page-kicker">A quick first question</p>
        <h2 id="goal-question">What would make this conversation useful?</h2>
        <p>Choose the closest fit. You can add context later if it helps.</p>
        <div className="qualification-options" role="group" aria-label="Conversation goal">
          {qualificationGoals.map(option => <button type="button" className="qualification-option" key={option} onClick={() => chooseGoal(option)} aria-pressed={goal === option}><span>{option}</span><ArrowRight size={17} aria-hidden="true" /></button>)}
        </div>
      </motion.section>}

      {step === 2 && <motion.section key="step-2" className="qualification-step" aria-labelledby="stage-question" {...stepMotion}>
        <button className="step-back" type="button" onClick={() => { setDirection(-1); setGoal(null); setStage(null); }}><ArrowLeft size={14} /> Change focus</button>
        <p className="page-kicker">One more question</p>
        <h2 id="stage-question">Where are you today?</h2>
        <p>This helps us suggest the right kind of next step—not a generic sales sequence.</p>
        <div className="qualification-options" role="group" aria-label="Current stage">
          {qualificationStages.map(option => <button type="button" className="qualification-option" key={option} onClick={() => chooseStage(option)} aria-pressed={stage === option}><span>{option}</span><ArrowRight size={17} aria-hidden="true" /></button>)}
        </div>
      </motion.section>}

      {step === 3 && <motion.section key="step-3" className="qualification-step" aria-labelledby="contact-question" {...stepMotion}>
        <button className="step-back" type="button" onClick={() => { setDirection(-1); setStage(null); }}><ArrowLeft size={14} /> Change stage</button>
        <p className="page-kicker">Last step</p>
        <h2 id="contact-question">Where should we send the next step?</h2>
        <p>We only need a name and work email. An optional note is there if the choices did not tell the full story.</p>
        <div className="form-grid">
          <label className="form-field" htmlFor="fullName"><span>Name <b>*</b></span><input id="fullName" className="contact-input" autoComplete="name" aria-invalid={!!form.formState.errors.fullName} {...form.register("fullName", { validate: validateQualifiedName })} />{form.formState.errors.fullName && <em>{form.formState.errors.fullName.message}</em>}</label>
          <label className="form-field" htmlFor="email"><span>Work email <b>*</b></span><input id="email" className="contact-input" type="email" autoComplete="email" aria-invalid={!!form.formState.errors.email} {...form.register("email", { validate: validateQualifiedWorkEmail })} />{form.formState.errors.email && <em>{form.formState.errors.email.message}</em>}</label>
        </div>
        <label className="form-field" htmlFor="note"><span>Anything else we should know? <i>Optional</i></span><textarea id="note" className="contact-textarea qualification-note" rows={3} placeholder="A useful deadline, system, or question is plenty." maxLength={1000} {...form.register("note")} /></label>
        {submit.error && <div className="form-alert" role="alert">{submit.error.message}</div>}
        <div className="qualification-actions"><button className="button button-primary" type="submit" disabled={submit.isPending || !goal || !stage}>{submit.isPending ? <><LoaderCircle className="spin" size={16} /> Sending</> : <>Send my answers <ArrowRight size={16} /></>}</button><p className="form-note">No sales sequence. You will hear back from a person.</p></div>
      </motion.section>}
      </AnimatePresence>
    </form>
  );
}
