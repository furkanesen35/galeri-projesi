import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Vehicles } from './pages/Vehicles';
import { VehicleDetail } from './pages/Vehicles/VehicleDetail';
import { Tasks } from './pages/Tasks';
import { CalendarPage } from './pages/Calendar';
import { Config } from './pages/Config';
import { Photos } from './pages/Photos';
import { Settings } from './pages/Settings';
import { Auth } from './pages/Auth';
import { Marketing } from './pages/Marketing';
import { DamageAssessment } from './pages/DamageAssessment';
import { OCRScanner } from './pages/OCRScanner';

const App = () => (
  <Routes>
    <Route path="/login" element={<Auth />} />
    <Route path="/marketing" element={<Marketing />} />
    <Route
      path="/"
      element={
        <AppShell>
          <Dashboard />
        </AppShell>
      }
    />
    <Route
      path="/damage-assessment"
      element={
        <AppShell>
          <DamageAssessment />
        </AppShell>
      }
    />
    <Route
      path="/ocr-scanner"
      element={
        <AppShell>
          <OCRScanner />
        </AppShell>
      }
    />
    <Route
      path="/vehicles"
      element={
        <AppShell>
          <Vehicles />
        </AppShell>
      }
    />
    <Route
      path="/vehicles/:id"
      element={
        <AppShell>
          <VehicleDetail />
        </AppShell>
      }
    />
    <Route
      path="/tasks"
      element={
        <AppShell>
          <Tasks />
        </AppShell>
      }
    />
    <Route
      path="/calendar"
      element={
        <AppShell>
          <CalendarPage />
        </AppShell>
      }
    />
    <Route
      path="/config"
      element={
        <AppShell>
          <Config />
        </AppShell>
      }
    />
    <Route
      path="/photos"
      element={
        <AppShell>
          <Photos />
        </AppShell>
      }
    />
    <Route
      path="/settings"
      element={
        <AppShell>
          <Settings />
        </AppShell>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
