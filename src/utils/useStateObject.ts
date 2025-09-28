import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export function useStateObject(object: any): [any, Function] {
  const [state, setState] = useState(object);
  
  function setter(key: string, value: any) {
    setState((prevState : any) => ({ ...prevState, [key]: value }));
  }
  
  return [state, setter] as [any, Function];
}

export function useStateContext() {
  return useOutletContext<[any, Function]>();
}