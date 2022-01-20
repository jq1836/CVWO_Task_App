import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import React from "react";
import { Authenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { Button } from "react-bootstrap";
import TaskBoard from "./components/TaskBoard";

Amplify.configure(awsExports);

const App: React.FC = () => {
  return (
      <Authenticator>
        {({ signOut, user }) => (
            <div>
              <TaskBoard />
              <Button onClick={ signOut }> Sign Out </Button>
            </div>
        )}
      </Authenticator>
  );
}

export default App;
