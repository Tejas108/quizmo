import React from 'react';
import Main from './containers/Main/Main';
import './app.module.scss';
import { ChakraProvider } from "@chakra-ui/react";


function App() {
  return (
    <ChakraProvider>
      <Main/>
    </ChakraProvider>
  );
}

export default App;
