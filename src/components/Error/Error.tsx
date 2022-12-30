import { FC } from "react";

interface Props {
  error: {
    message: string;
    stack: string;
  };
}

const Error: FC<Props> = ({ error }) => {
  return (
    <div>
      <h1>Error: {error.message}</h1>
      <pre>{error.stack}</pre>
    </div>
  );
};

export default Error;
