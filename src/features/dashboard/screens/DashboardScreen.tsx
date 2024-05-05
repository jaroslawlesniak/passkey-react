import { withGuard } from "@/hoc/auth"

const DashboardScreen = () => {
  return (
    <div>DashboardScreen</div>
  )
}

export default withGuard(DashboardScreen);