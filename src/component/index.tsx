import { Box } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import loadRemoteModule from "@originjs/vite-plugin-federation";

// const RemoteComponent = lazy(() => import("mfe/MFE"));
const MyComponent = React.lazy(() => import("mfe/MFE"));

export const Dashboard = () => {
  const [componentSet, setComponentSet] = useState(null);

  const RemoteComponent = async () => {
    try {
      console.log("Loading remote module...");

      const appModule = loadRemoteModule({
        remoteName: "mfe",
        exposedModule: "./MFE",
      });

      console.log("Remote module loaded successfully", appModule);
      setComponentSet(appModule.default);
      return appModule.default;
    } catch (error) {
      return console.error("Error loading remote module:", error);
    }
  };

  useEffect(() => {
    console.log("updated", componentSet);
  }, [componentSet]);

  return (
    <>
      <Box
        component="section"
        sx={{
          p: 2,
          border: "2px solid green",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        Welcome to The CoreSteps
      </Box>
      <Box
        component="section"
        sx={{
          my: 3,
          p: 2,
          border: "2px solid green",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          {componentSet ? (
            <RemoteComponent />
          ) : (
            `Failed to Load,${componentSet} `
          )}
        </Suspense>
      </Box>

      <Box
        component="section"
        sx={{
          my: 3,
          p: 2,
          border: "2px solid green",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          {componentSet ? <MyComponent /> : `Failed to Load 2,${componentSet} `}
        </Suspense>
      </Box>
    </>
  );
};
