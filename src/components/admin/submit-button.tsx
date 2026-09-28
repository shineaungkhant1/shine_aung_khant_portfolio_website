"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingLabel,
  className,
  confirmMessage,
}: {
  children: React.ReactNode;
  pendingLabel: string;
  className: string;
  confirmMessage?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${className} disabled:cursor-wait disabled:opacity-60`}
      type="submit"
      disabled={pending}
      aria-busy={pending}
      onClick={(event) => {
        if (confirmMessage && !window.confirm(confirmMessage)) event.preventDefault();
      }}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export function PendingField({ className, ...props }: React.ComponentProps<"input">) {
  const { pending } = useFormStatus();
  return <input {...props} className={className} disabled={pending || props.disabled} />;
}
