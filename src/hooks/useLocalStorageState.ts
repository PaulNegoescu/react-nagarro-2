import { SetStateAction, useCallback, useEffect, useState } from 'react';

export function useLocalStorageState<S>(
  key: string,
  initialValue: S | (() => S)
) {
  const [value, setValue] = useState<S>(() => {
    const fromStorage = localStorage.getItem(key);

    if (fromStorage) {
      return JSON.parse(fromStorage);
    }

    let firstValue;

    if (isStateFunction(initialValue)) {
      firstValue = initialValue();
    } else {
      firstValue = initialValue;
    }
    
    localStorage.setItem(key, JSON.stringify(firstValue));
    return firstValue;
  });

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
    }
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    }
  }, []);

  function isStateFunction(fct: any): fct is () => S {
    return typeof fct === 'function';
  }

  const updateValue = useCallback((newValue: SetStateAction<S>) => {
    function isSetStateFunction(fct: any): fct is (prevState: S) => S {
      return typeof fct === 'function';
    }

    setValue((oldValue: S) => {
      let updatedValue;

      if (isSetStateFunction(newValue)) {
        updatedValue = newValue(oldValue);
      } else {
        updatedValue = newValue;
      }

      localStorage.setItem(key, JSON.stringify(updatedValue));
      return updatedValue;
    });
  }, [key]);

  return [value, updateValue] as const;
}
