import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import React from "react";
import { Authenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TaskBoard from "./components/TaskBoard";

Amplify.configure(awsExports);

function App() {
  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Authenticator>
              {({ signOut, user }) => (
                  <div style={{ backgroundColor: "#1A1A1A" }}>
                      <TaskBoard handleSignOut={ signOut } user={ user }/>
                  </div>
              )}
          </Authenticator>
      </LocalizationProvider>
  );
}

export default App;
