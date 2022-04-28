import React from "react";
import { IMaskInput } from "react-imask";
type CoordInputProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const CoordInput = React.forwardRef<HTMLElement, CoordInputProps>(
  ({ onChange, ...props }, ref) => {
    const handleAccept = (value: any) => {
      onChange({ target: { name: props.name, value } });
    };
    return (
      <IMaskInput
        {...props}
        mask="-?\d{1,4},-?\d{1,4}"
        inputRef={ref as any}
        onAccept={handleAccept}
        overwrite
      />
    );
  }
);

export default CoordInput;
