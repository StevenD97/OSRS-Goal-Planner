import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { GoalsPage } from "./pages/GoalsPage";
import { DailiesPage } from "./pages/DailiesPage";
import { FarmRunsPage } from "./pages/FarmRunsPage";
import { FarmRunDetailPage } from "./pages/FarmRunDetailPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/dailies" element={<DailiesPage />} />
        <Route path="/farm-runs" element={<FarmRunsPage />} />
        <Route path="/farm-runs/:runId" element={<FarmRunDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  );
}
