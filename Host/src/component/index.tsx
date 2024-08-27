import { Box } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";

// const RemoteComponent = lazy(() => import("mfe/MFE"));

export const Dashboard = () => {
  const [RemoteComponent, setRemoteComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        console.log("Loading remote module...");

        // Dynamically import the remote module
        const appModule = await import("mfe/MFE");

        console.log("Remote module loaded successfully", appModule);


        if (!appModule || !appModule.default) {
          throw new Error("Failed to load the remote module.");
        }

        console.log("Remote module loaded successfully", appModule);
        setRemoteComponent(() => appModule.default);
      } catch (err) {
        console.error("Error loading remote module:", err);
        setError(err.message || "Unknown error occurred");
      }
    };

    loadComponent();
  }, []);

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
          {RemoteComponent ? <RemoteComponent /> : `Failed to Load`}
        </Suspense>
      </Box>
    </>
  );
};
