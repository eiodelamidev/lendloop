"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Field, { inputStyles } from "@/components/ui/Field";

type LoanRequestDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function LoanRequestDialog({ open, onClose }: LoanRequestDialogProps) {
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Preview only — loan requests arrive with the loan functions.");
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Request a tool"
      description="Choose the dates you need it. The owner will see your request."
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="loan-request-form">
            Send request
          </Button>
        </>
      }
    >
      <form id="loan-request-form" onSubmit={onSubmit} className="grid gap-4">
        <Field label="Start date">
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="startDate"
              type="date"
              required
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputStyles}
            />
          )}
        </Field>
        <Field label="End date">
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="endDate"
              type="date"
              required
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputStyles}
            />
          )}
        </Field>
        {message ? (
          <p role="status" className="text-small text-muted-foreground">
            {message}
          </p>
        ) : null}
      </form>
    </Dialog>
  );
}
