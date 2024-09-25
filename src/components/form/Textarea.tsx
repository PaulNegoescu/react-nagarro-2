import {
  forwardRef,
  type ForwardedRef,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
} from 'react';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  id: string;
  labelText: string;
  name: string;
  errorMessage?: string;
}

export const Textarea = forwardRef(
  (
    { id, labelText, errorMessage, children, ...props }: Props,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <>
        <label htmlFor={id}>{labelText}</label>
        <textarea id={id} {...props} ref={ref}>{children}</textarea>
        {errorMessage && (
          <p className="errorMessage">{errorMessage}</p>
        )}
      </>
    );
  }
);
