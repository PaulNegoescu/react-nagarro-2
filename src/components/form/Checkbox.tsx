import {
  forwardRef,
  type ForwardedRef,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
} from 'react';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelText: string;
  name: string;
  errorMessage?: string;
}

export const Checkbox = forwardRef(
  (
    { labelText, errorMessage, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <label>
          <input type="checkbox" {...props} ref={ref} />
          {labelText}
        </label>
        {errorMessage && (
          <p className="errorMessage">{errorMessage}</p>
        )}
      </>
    );
  }
);
