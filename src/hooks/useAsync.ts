import { SetStateAction, useCallback, useEffect, useState } from "react";

interface Callback {
  (): Promise<any>;
  (): Promise<SetStateAction<undefined>>;
}

const useAsync = (callback: Callback, dependencies = []) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, value };
};

export default useAsync;
