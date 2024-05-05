import { Styles } from "@/styles/types";
import { Fingerprint } from "@mui/icons-material";
import { Button, Divider, Stack, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
  onRegister: (email: string) => void;
  onLogin: () => void;
}

const LoginForm: React.FC<Props> = () => {
  const [email, setEmail] = useState('');

  return (
    <Stack spacing={4} style={styles.container}>
      <h4>Logowanie</h4>

      <Stack spacing={3} divider={<Divider />}>
        <Stack spacing={2}>
          <TextField label="Adres email" value={email} onChange={e => setEmail(e.target.value)} fullWidth={true} />

          <Button variant="contained" startIcon={<Fingerprint />} fullWidth={true}>
            Utwórz konto
          </Button>
        </Stack>

        <Button variant="contained" startIcon={<Fingerprint />} fullWidth={true}>
          Logowanie przy pomocy passkey
        </Button>
      </Stack>
    </Stack>
  );
};

const styles: Styles = {
  container: {
    backgroundColor: '#fff',
    padding: 50,
    borderRadius: 25,
    width: 400,
  }
}

export default LoginForm;
