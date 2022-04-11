import { Router, Route, Set, Private } from '@redwoodjs/router'
import WebLayout from 'src/layouts/WebLayout/WebLayout'
import AppLayout from 'src/layouts/AppLayout/AppLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={WebLayout} prerender>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>
      <Private unauthenticated="login" roles="admin">
        <Set wrap={AppLayout}>
          <Route path="/dashboard" page={DashboardPage} name="dashboard" />
        </Set>
      </Private>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
