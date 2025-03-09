
import { toast as sonnerToast } from "sonner";

// Simple toast implementation that can be used when the components/ui/toast is not being used
export const toast = sonnerToast;

export function useToast() {
  return {
    toast: sonnerToast,
    dismiss: sonnerToast.dismiss,
    error: sonnerToast.error,
    success: sonnerToast.success,
  };
}
