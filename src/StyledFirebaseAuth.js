
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'; 

const firebaseUIConfig = {
  signInOptions: [ 
    GoogleAuthProvider.PROVIDER_ID,
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
  ],
  signInFlow: 'popup',
  credentialHelper: 'none', 
  callbacks: { 
    signInSuccessWithAuthResult: () => {
      return false; 
    }
  }
};

const Login = () => {
    const auth = getAuth();
    return <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />;
  };
  
  export default Login;


