import { Router, Route, Set, Private } from '@redwoodjs/router'
import UsersLayout from 'src/layouts/UsersLayout'
import PatientsLayout from 'src/layouts/PatientsLayout'
import ClinicsLayout from 'src/layouts/ClinicsLayout'
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
        <Set wrap={UsersLayout}>
          <Route path="/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/users/{id}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/users/{id}" page={UserUserPage} name="user" />
          <Route path="/users" page={UserUsersPage} name="users" />
        </Set>
        <Set wrap={PatientsLayout}>
          <Route path="/patients/new" page={PatientNewPatientPage} name="newPatient" />
          <Route path="/patients/{id}/edit" page={PatientEditPatientPage} name="editPatient" />
          <Route path="/patients/{id}" page={PatientPatientPage} name="patient" />
          <Route path="/patients" page={PatientPatientsPage} name="patients" />
        </Set>
        <Set wrap={ClinicsLayout}>
          <Route path="/clinics/new" page={ClinicNewClinicPage} name="newClinic" />
          <Route path="/clinics/{id}/edit" page={ClinicEditClinicPage} name="editClinic" />
          <Route path="/clinics/{id}" page={ClinicClinicPage} name="clinic" />
          <Route path="/clinics" page={ClinicClinicsPage} name="clinics" />
        </Set>
      </Private>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
