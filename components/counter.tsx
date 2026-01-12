"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  const {isLoaded, userId, sessionId, getToken, isSignedIn} = useAuth();
  // const {isLoaded, userId, sessionId, user} = useUser();

  if(!isLoaded || !isSignedIn ) return null;
  return (
    <div className="self-center">
      <p>Counter Value: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  );
}
