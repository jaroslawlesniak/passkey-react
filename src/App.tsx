import { Fingerprint } from "@mui/icons-material"
import { Box, Button, Input } from "@mui/material"
import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import { useState } from "react"

function App() {
  const [userName, setUserName] = useState('jarek9244@gmail.com');

  async function register() {
    try {
      const response = await fetch('http://localhost:3000/passkey/register/begin', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName }),
      });

      console.log(response)

      // Check if the registration options are ok.
      if (!response.ok) {
          throw new Error('User already exists or failed to get registration options from server');
      }

      // Convert the registration options to JSON.
      const { options, token } = await response.json();
      console.log(options)

      // This triggers the browser to display the passkey / WebAuthn modal (e.g. Face ID, Touch ID, Windows Hello).
      // A new attestation is created. This also means a new public-private-key pair is created.
      const attestationResponse = await startRegistration(options);

      // Send attestationResponse back to server for verification and storage.
      const verificationResponse = await fetch('http://localhost:3000/passkey/register/finish', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ ...attestationResponse, token })
      });

      if (verificationResponse.ok) {
          console.log('Registration successful');
      } else {
          console.log('Registration failed', true);
      }
    }
    catch (e) {}
  }

  async function login() {
    try {
        // Get login options from your server. Here, we also receive the challenge.
        const response = await fetch('http://localhost:3000/passkey/login/begin', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userName })
        });
        // Check if the login options are ok.
        if (!response.ok) {
            throw new Error('Failed to get login options from server');
        }
        // Convert the login options to JSON.
        const { options, token } = await response.json();
        console.log(options)

        // This triggers the browser to display the passkey / WebAuthn modal (e.g. Face ID, Touch ID, Windows Hello).
        // A new assertionResponse is created. This also means that the challenge has been signed.
        const assertionResponse = await startAuthentication(options);

        // Send assertionResponse back to server for verification.
        const verificationResponse = await fetch('http://localhost:3000/passkey/login/finish', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ ...assertionResponse, token })
        });

        if (verificationResponse.ok) {
            console.log('Login successful');
        } else {
            console.log('Login failed', true);
        }
    } catch (error) {
        
    }
}

  return (
    <Box alignItems="center" justifyContent="center" width="100%" height="100vh" display="flex">
      <Input name="userName" value={userName} onChange={e => setUserName(e.target.value)} />

      <Button type="submit" startIcon={<Fingerprint />} onClick={register}>
        Zarejestruj się
      </Button>

      <Button type="submit" startIcon={<Fingerprint />} onClick={login}>
        Zaloguj się
      </Button>
    </Box>
  )
}

export default App
