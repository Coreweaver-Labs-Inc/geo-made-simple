import { trpc } from "@/lib/trpc";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ContactFormValues = {
  fullName: string;
  email: string;
  organization: string;
  website: string;
  message: string;
  formWebsite: string;
};

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<ContactFormValues>({
    defaultValues: { fullName: "", email: "", organization: "", website: "", message: "", formWebsite: "" },
    mode: "onBlur",
  });
  const submit = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
    },
  });

  if (submitted) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <CheckCircle2 size={26} aria-hidden="true" />
        <div><strong>Your message is in.</strong><p>Thank you. A member of the Coreweaver Labs team will review it and reply by email.</p></div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={form.handleSubmit(values => submit.mutate(values))} noValidate>
      <div className="form-honeypot" aria-hidden="true"><label htmlFor="form-website">Leave this field empty</label><input id="form-website" tabIndex={-1} autoComplete="off" {...form.register("formWebsite")} /></div>
      <div className="form-grid">
        <label className="form-field" htmlFor="fullName"><span>Name <b>*</b></span><input id="fullName" className="contact-input" autoComplete="name" aria-invalid={!!form.formState.errors.fullName} {...form.register("fullName", { required: "Please enter your name.", minLength: { value: 2, message: "Please use at least two characters." }, maxLength: 160 })} />{form.formState.errors.fullName && <em>{form.formState.errors.fullName.message}</em>}</label>
        <label className="form-field" htmlFor="email"><span>Work email <b>*</b></span><input id="email" className="contact-input" type="email" autoComplete="email" aria-invalid={!!form.formState.errors.email} {...form.register("email", { required: "Please enter your email address.", pattern: { value: /^\S+@\S+\.\S+$/, message: "Please enter a valid email address." }, maxLength: 320 })} />{form.formState.errors.email && <em>{form.formState.errors.email.message}</em>}</label>
        <label className="form-field" htmlFor="organization"><span>Organization</span><input id="organization" className="contact-input" autoComplete="organization" maxLength={160} {...form.register("organization")} /></label>
        <label className="form-field" htmlFor="website"><span>Website</span><input id="website" className="contact-input" type="url" placeholder="https://" autoComplete="url" aria-invalid={!!form.formState.errors.website} {...form.register("website", { validate: value => !value || /^https?:\/\/\S+$/i.test(value) || "Please enter a full URL, including https://." })} />{form.formState.errors.website && <em>{form.formState.errors.website.message}</em>}</label>
      </div>
      <label className="form-field" htmlFor="message"><span>What would you like to understand? <b>*</b></span><textarea id="message" className="contact-textarea" rows={7} aria-invalid={!!form.formState.errors.message} {...form.register("message", { required: "Please share a little context.", minLength: { value: 20, message: "Please add at least 20 characters so we have useful context." }, maxLength: 5000 })} />{form.formState.errors.message && <em>{form.formState.errors.message.message}</em>}</label>
      {submit.error && <div className="form-alert" role="alert">{submit.error.message}</div>}
      <button className="button button-primary" type="submit" disabled={submit.isPending}>{submit.isPending ? <><LoaderCircle className="spin" size={16} /> Sending</> : <>Send message <ArrowRight size={16} /></>}</button>
      <p className="form-note">We use these details only to respond to your inquiry.</p>
    </form>
  );
}
