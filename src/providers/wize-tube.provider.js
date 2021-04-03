import React, { createContext, useContext, useReducer } from 'react';
import wizeTubeReducer from '../reducers/wize-tube-reducer';

const initState = {
  videos: { items: [] },
};

const WizeTubeContext = createContext({
  videos: { items: [] },
});

function useWizeTube() {
  const context = useContext(WizeTubeContext);
  if (!context) {
    throw new Error(`Can't use "useWizeTube" without an WizeProvider!`);
  }
  return context;
}

function WizeTubeProvider({ children }) {
  const [state, dispatch] = useReducer(wizeTubeReducer, initState);

  return (
    <WizeTubeContext.Provider value={{ state, dispatch }}>
      {children}
    </WizeTubeContext.Provider>
  );
}

export { useWizeTube };

export default WizeTubeProvider;
