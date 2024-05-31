import React from 'react';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

function AuthStatus() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Initializing user...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (user) {
    return <p>Welcome, {user.displayName}!</p>;
  } else {
    return <p>Please sign in</p>;
  }
}

export default AuthStatus;
