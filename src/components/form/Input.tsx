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
  id: string;
  labelText: string;
  name: string;
  labelClassName?: string;
  errorMessage?: string;
}

export const Input = forwardRef(
  (
    { id, type = 'text', labelText, errorMessage, labelClassName = '',  ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <label htmlFor={id} className={labelClassName}>{labelText}</label>
        <input type={type} id={id} {...props} ref={ref} />
        {errorMessage && (
          <p className="errorMessage">{errorMessage}</p>
        )}
      </>
    );
  }
);
