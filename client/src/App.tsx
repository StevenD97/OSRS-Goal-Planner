import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { GoalsPage } from "./pages/GoalsPage";
import { DailiesPage } from "./pages/DailiesPage";
import { FarmRunsPage } from "./pages/FarmRunsPage";
import { FarmRunDetailPage } from "./pages/FarmRunDetailPage";
import { GearProgressionPage } from "./pages/GearProgressionPage";
import { ItemDetailPage } from "./pages/ItemDetailPage";
import { GroupDashboardPage } from "./pages/GroupDashboardPage";
import { ActionTrackerPage } from "./pages/ActionTrackerPage";
import { DpsCalculatorPage } from "./pages/DpsCalculatorPage";
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
        <Route path="/gear" element={<GearProgressionPage />} />
        <Route path="/gear/:itemId" element={<ItemDetailPage />} />
        <Route path="/group" element={<GroupDashboardPage />} />
        <Route path="/action-tracker" element={<ActionTrackerPage />} />
        <Route path="/dps-calc" element={<DpsCalculatorPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  );
}
