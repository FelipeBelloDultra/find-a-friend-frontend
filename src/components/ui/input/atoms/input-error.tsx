interface InputErrorProps {
  message?: string;
}

export function InputError({ message }: InputErrorProps) {
  if (message) {
    return <small className="text-red-400 font-bold ml-2">{message}</small>;
  }
}
