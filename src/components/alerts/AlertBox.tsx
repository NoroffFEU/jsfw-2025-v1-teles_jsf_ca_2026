import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button/Button";

type AlertBoxProps = {
  open: boolean;
  action: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
};

export const AlertBox = ({
  open,
  action,
  title,
  description,
  onConfirm,
  onCancel,
}: AlertBoxProps) => {
  if (!open) return null;

  return (
    <Alert variant="destructive">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>

      {action && (
        <div className="mt-2 flex gap-2 justify-self-end">
          <Button onClick={onConfirm}>Confirm</Button>
          <Button variant="destructive" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      )}
    </Alert>
  );
};
