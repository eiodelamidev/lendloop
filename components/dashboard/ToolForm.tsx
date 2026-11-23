"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Field, { inputStyles } from "@/components/ui/Field";
import type { PublicCategory } from "@/components/public/PublicToolsGrid";

const categories: PublicCategory[] = [
  "power-tools",
  "garden",
  "kitchen",
  "camping",
  "cleaning",
  "other",
];

const conditions = ["new", "good", "fair", "worn"] as const;

export default function ToolForm() {
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Preview only — tool saving arrives with the tool functions.");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field label="Tool name">
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            name="name"
            required
            maxLength={80}
            aria-describedby={describedBy}
            aria-invalid={invalid}
            className={inputStyles}
            placeholder="Cordless drill"
          />
        )}
      </Field>

      <Field label="Category">
        {({ id, describedBy, invalid }) => (
          <select
            id={id}
            name="category"
            defaultValue="power-tools"
            aria-describedby={describedBy}
            aria-invalid={invalid}
            className={inputStyles}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.replace("-", " ")}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field label="Condition">
        {({ id, describedBy, invalid }) => (
          <select
            id={id}
            name="condition"
            defaultValue="good"
            aria-describedby={describedBy}
            aria-invalid={invalid}
            className={inputStyles}
          >
            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field label="Description" hint="One short sentence is enough.">
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            name="description"
            required
            maxLength={160}
            aria-describedby={describedBy}
            aria-invalid={invalid}
            className={inputStyles}
            placeholder="Includes two batteries and a charger."
          />
        )}
      </Field>

      <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
        <Button type="submit">Add tool</Button>
        {message ? (
          <p role="status" className="text-small text-muted-foreground">
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
