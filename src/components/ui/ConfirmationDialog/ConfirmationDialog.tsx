import { Button, Dialog, Spinner } from "@/components/ui";
import { ReactNode } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  deleteDetails?: string | ReactNode; // <-- allow ReactNode
  isLoading?: boolean;
  width?: number;
  cancelButtonTestId?: string;
  confirmButtonTestId?: string;
}

const ConfirmationDialog = ({
  isOpen,
  onClose,
  handleConfirm,
  deleteDetails,
  isLoading = false,
  width = 1000,
  cancelButtonTestId,
  confirmButtonTestId,
}: ConfirmationModalProps) => {
  console.log(isLoading, "isLoading");
  return (
    <div>
      <Dialog width={width} isOpen={isOpen} onClose={onClose} onRequestClose={onClose}>
        <h5 className="mb-4">Please Confirm</h5>

        <span>{deleteDetails}</span>
        <div className="flex justify-end mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            data-testid={cancelButtonTestId}
            variant="default"
            disabled={isLoading}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            className="bg-amber-500"
            type="submit"
            disabled={isLoading}
            data-testid={confirmButtonTestId}
            onClick={isLoading ? undefined : handleConfirm}
          >
            {isLoading ? <Spinner className="w-4 h-4 text-white" /> : "Confirm"}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
