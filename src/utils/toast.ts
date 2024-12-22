import Swal from "sweetalert2";

export type ToastPosition =
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end";

export type ToastVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

export type ToastConfig = {
  // Message content
  message: string;

  // Visual configuration
  variant?: ToastVariant;
  position?: ToastPosition;
  duration?: number;

  // Interaction settings
  showCloseButton?: boolean;
  onDismiss?: () => void;

  // Container settings
  containerId?: string;

  // RTL support
  isRTL?: boolean;
};

const DEFAULT_CONFIG: Partial<ToastConfig> = {
  variant: "default",
  position: "bottom-start",
  duration: 3000,
  showCloseButton: true,
  isRTL: false,
};

const getAdjustedPosition = (
  position: ToastPosition,
  isRTL: boolean
): ToastPosition => {
  if (!isRTL) return position;

  const rtlPositionMap: Record<ToastPosition, ToastPosition> = {
    "top-start": "top-end",
    "top-end": "top-start",
    "bottom-start": "bottom-end",
    "bottom-end": "bottom-start",
    top: "top",
    bottom: "bottom",
  };

  return rtlPositionMap[position];
};

export const showToast = async (config: ToastConfig): Promise<void> => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const {
    message,
    variant,
    position,
    duration,
    showCloseButton,
    onDismiss,
    containerId,
    isRTL,
  } = finalConfig;

  const adjustedPosition = getAdjustedPosition(position!, isRTL!);

  const toastConfig = {
    toast: true,
    position: adjustedPosition,
    showConfirmButton: false,
    timer: duration,
    showCloseButton,
    target: containerId ? `#${containerId}-toast` : "body",
    ...(variant !== "default" && {
      customClass: {
        popup: `color-${variant}`,
      },
    }),
  };

  const toast = Swal.mixin(toastConfig);

  const result = await toast.fire({
    title: message,
  });

  if (result.dismiss && onDismiss) {
    onDismiss();
  }
};

// Optional: Convenience functions for common use cases
export const successToast = (message: string, config?: Partial<ToastConfig>) =>
  showToast({ message, variant: "success", ...config });

export const errorToast = (message: string, config?: Partial<ToastConfig>) =>
  showToast({ message, variant: "danger", ...config });

export const warningToast = (message: string, config?: Partial<ToastConfig>) =>
  showToast({ message, variant: "warning", ...config });

export const infoToast = (message: string, config?: Partial<ToastConfig>) =>
  showToast({ message, variant: "info", ...config });
