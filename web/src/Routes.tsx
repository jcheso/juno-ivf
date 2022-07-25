import { Router, Route, Set, Private } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout/AppLayout'
import ClinicsLayout from 'src/layouts/ClinicsLayout'
import PatientsLayout from 'src/layouts/PatientsLayout'
import PredictEggsModelsLayout from 'src/layouts/PredictEggsModelsLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import WebLayout from 'src/layouts/WebLayout/WebLayout'

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
        <Set wrap={PredictEggsModelsLayout}>
          <Route path="/predict-eggs-models/new" page={PredictEggsModelNewPredictEggsModelPage} name="newPredictEggsModel" />
          <Route path="/predict-eggs-models/{id}/edit" page={PredictEggsModelEditPredictEggsModelPage} name="editPredictEggsModel" />
          <Route path="/predict-eggs-models/{id}" page={PredictEggsModelPredictEggsModelPage} name="predictEggsModel" />
          <Route path="/predict-eggs-models" page={PredictEggsModelPredictEggsModelsPage} name="predictEggsModels" />
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
      <Private unauthenticated="login" roles={['admin', 'user']}>
        <Set wrap={AppLayout}>
          <Route path="/dashboard" page={DashboardPage} name="dashboard" />
          <Route path="/add-patient" page={AddPatientPage} name="addPatient" />
          <Route path="/patient-summary" page={PatientSummaryPage} name="patientSummary" />
          <Route path="/treatments" page={TreatmentsPage} name="treatments" />
          <Route path="/cycle-summary" page={CycleSummaryPage} name="cycleSummary" />
          <Route path="/ultrasounds" page={UltrasoundsPage} name="ultrasounds" />
        </Set>
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
