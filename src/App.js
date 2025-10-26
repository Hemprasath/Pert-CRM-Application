import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import AdminDashboardPage from "./layouts/Admin/pages/dashboard";
import AdminCustomersPage from "./layouts/Admin/pages/customers";
import AdminStaffPage from "./layouts/Admin/pages/staff";
import AdminServicePage from "./layouts/Admin/pages/services";
import AdminAppointmentPage from "./layouts/Admin/pages/appointments";
import AdminPaymentInvoicesPage from "./layouts/Admin/pages/paymentsInvoices";
import AdminSystemSettingsPage from "./layouts/Admin/pages/systemSettings";
import StaffDashboard from "./layouts/Staff/pages/dashboard";
import StaffAppointments from "./layouts/Staff/pages/appointments";
import StaffPetRecords from "./layouts/Staff/pages/petRecords";
import StaffPrescriptions from "./layouts/Staff/pages/prescriptions";
import StaffVaccinations from "./layouts/Staff/pages/vaccinations";
import StaffHistory from "./layouts/Staff/pages/history";
import StaffInternalNotes from "./layouts/Staff/pages/internalNotes";
import StaffSettings from "./layouts/Staff/pages/staffSetting";
import CustomerDashboard from "./layouts/Customer/pages/dashboard";
import CustomerAppointments from "./layouts/Customer/pages/appointments";
import CustomerMedicalRecords from "./layouts/Customer/pages/medicalrecords";
import CustomerNotifications from "./layouts/Customer/pages/notification";
import CustomerSupport from "./layouts/Customer/pages/loyality&feedback";
import CustomerPayments from "./layouts/Customer/pages/payments";
import CustomerAIassistant from "./layouts/Customer/pages/aiassistant";
import CustomerSetting from "./layouts/Customer/pages/setting";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Admin/pages/dashboard" element={<AdminDashboardPage />} />
        <Route path="/Admin/pages/customers" element={<AdminCustomersPage />} />
        <Route path="/Admin/pages/staff" element={<AdminStaffPage />} />
        <Route path="/Admin/pages/services" element={<AdminServicePage />} />
        <Route path="/Admin/pages/appointments" element={<AdminAppointmentPage />} />
        <Route path="/Admin/pages/paymentsInvoices" element={<AdminPaymentInvoicesPage />} />
        <Route path="/Admin/pages/systemSettings" element={<AdminSystemSettingsPage />} />
        <Route path="/Staff/pages/dashboard" element={<StaffDashboard />} />
        <Route path="/Staff/pages/appointments" element={<StaffAppointments />} />
        <Route path="/Staff/pages/pet-records" element={<StaffPetRecords />} />
        <Route path="/Staff/pages/prescriptions" element={<StaffPrescriptions />} />
        <Route path="/Staff/pages/vaccinations" element={<StaffVaccinations />} />
        <Route path="/Staff/pages/history" element={<StaffHistory />} />
        <Route path="/Staff/pages/internal-notes" element={<StaffInternalNotes />} />
        <Route path="/Staff/pages/staffSetting" element={<StaffSettings />} />
        <Route path="/Customer/pages/dashboard" element={<CustomerDashboard />} />
        <Route path="/Customer/pages/appointments" element={<CustomerAppointments />} />
        <Route path="/Customer/pages/medicalrecords" element={<CustomerMedicalRecords />} />
        <Route path="/Customer/pages/notification" element={<CustomerNotifications />} />
        <Route path="/Customer/pages/loyality&feedback" element={<CustomerSupport />} />
        <Route path="/Customer/pages/payments" element={<CustomerPayments />} />
        <Route path="/Customer/pages/aiassistant" element={<CustomerAIassistant />} />
        <Route path="/Customer/pages/setting" element={<CustomerSetting />} />
      </Routes>
    </Router>
  );
}

export default App;
