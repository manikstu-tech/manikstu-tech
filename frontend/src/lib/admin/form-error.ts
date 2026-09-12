import "server-only";
import { AdminApiError } from "./api";
import type { FormState } from "./types";

/** Turn an API error into form state; anything else (incl. redirects) is rethrown. */
export function toFormState(e: unknown): FormState {
  if (e instanceof AdminApiError) {
    const message =
      e.status === 403
        ? "You don't have permission to do this."
        : e.status === 422 && Object.keys(e.errors).length
          ? "Please fix the highlighted fields."
          : e.message;
    return { message, errors: e.errors };
  }
  throw e;
}
