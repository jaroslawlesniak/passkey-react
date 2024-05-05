import { withGuard } from "@/hoc/auth"
import { Button, Paper, Stack, Typography } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import { Loading } from "../components";
import { useAuth } from "@/contexts/auth";

const DashboardScreen = () => {
  const loading = false;

  const { user, setUser } = useAuth();

  return (
    <Paper elevation={3} style={{ padding: 50, margin: 150 }}>
      <Stack spacing={10}>
        <Typography variant="h4">
          Witaj, {user.token}
        </Typography>

        {loading ? (
          <Loading />
        ) : (
          <BarChart
            series={[
              { data: [35, 44, 24, 34] },
              { data: [51, 6, 49, 30] },
              { data: [15, 25, 30, 50] },
              { data: [60, 50, 15, 25] },
            ]}
            height={290}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        )}

        <Button variant="contained" onClick={() => setUser({ token: '' })}>
          Wyloguj się
        </Button>
      </Stack>
    </Paper>
  )
}

export default withGuard(DashboardScreen);