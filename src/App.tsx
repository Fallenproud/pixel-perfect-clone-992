
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./layout/AppShell";
import Index from "./pages/Index";
import Overview from "./pages/Overview";
import MyAgents from "./pages/MyAgents";
import Playground from "./pages/Playground";
import FlowBuilder from "./pages/FlowBuilder";
import WebChatbotCreator from "./pages/WebChatbotCreator";
import BringYourOwn from "./pages/tools/BringYourOwn";
import ServerlessApps from "./pages/tools/ServerlessApps";
import CloudServices from "./pages/tools/CloudServices";
import ApiKeys from "./pages/tools/ApiKeys";
import Storage from "./pages/tools/Storage";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Marketplace components
import MarketplaceLayout from "./features/marketplace/MarketplaceLayout";
import TabAll from "./features/marketplace/tabs/TabAll";
import TabChat from "./features/marketplace/tabs/TabChat";
import TabFile from "./features/marketplace/tabs/TabFile";
import TabKnowledge from "./features/marketplace/tabs/TabKnowledge";
import TabIotMqttTi from "./features/marketplace/tabs/TabIotMqttTi";
import TabPresets from "./features/marketplace/tabs/TabPresets";
import TabWorkflows from "./features/marketplace/tabs/TabWorkflows";

// Category components
import CatMyAgents from "./features/marketplace/categories/CatMyAgents";
import CatGeneral from "./features/marketplace/categories/CatGeneral";
import CatCollaboration from "./features/marketplace/categories/CatCollaboration";
import CatDataAnalytics from "./features/marketplace/categories/CatDataAnalytics";
import CatCustomerSupport from "./features/marketplace/categories/CatCustomerSupport";
import CatIotAutomation from "./features/marketplace/categories/CatIotAutomation";
import CatResearchInsights from "./features/marketplace/categories/CatResearchInsights";
import CatFinance from "./features/marketplace/categories/CatFinance";
import CatHR from "./features/marketplace/categories/CatHR";
import CatMarketing from "./features/marketplace/categories/CatMarketing";
import CatHealth from "./features/marketplace/categories/CatHealth";
import CatWeb3 from "./features/marketplace/categories/CatWeb3";
import CatSupplyChain from "./features/marketplace/categories/CatSupplyChain";
import CatSecurity from "./features/marketplace/categories/CatSecurity";
import CatReligious from "./features/marketplace/categories/CatReligious";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<Overview />} />
            <Route path="my-agents" element={<MyAgents />} />
            <Route path="playground" element={<Playground />} />
            <Route path="flow" element={<FlowBuilder />} />
            <Route path="chatbot" element={<WebChatbotCreator />} />
            <Route path="tools/byo" element={<BringYourOwn />} />
            <Route path="tools/serverless" element={<ServerlessApps />} />
            <Route path="tools/cloud" element={<CloudServices />} />
            <Route path="tools/keys" element={<ApiKeys />} />
            <Route path="tools/storage" element={<Storage />} />
            <Route path="insights" element={<Insights />} />
            <Route path="settings" element={<Settings />} />

            {/* Marketplace routes */}
            <Route path="marketplace" element={<MarketplaceLayout />}>
              <Route index element={<Navigate to="all" replace />} />
              <Route path="all" element={<TabAll />} />
              <Route path="chat" element={<TabChat />} />
              <Route path="file" element={<TabFile />} />
              <Route path="knowledge" element={<TabKnowledge />} />
              <Route path="iot-mqtt-ti" element={<TabIotMqttTi />} />
              <Route path="presets" element={<TabPresets />} />
              <Route path="workflows" element={<TabWorkflows />} />
              <Route path="cat">
                <Route path="my-agents" element={<CatMyAgents />} />
                <Route path="general" element={<CatGeneral />} />
                <Route path="collaboration" element={<CatCollaboration />} />
                <Route path="data-analytics" element={<CatDataAnalytics />} />
                <Route path="customer-support" element={<CatCustomerSupport />} />
                <Route path="iot-automation" element={<CatIotAutomation />} />
                <Route path="research-insights" element={<CatResearchInsights />} />
                <Route path="finance" element={<CatFinance />} />
                <Route path="hr" element={<CatHR />} />
                <Route path="marketing" element={<CatMarketing />} />
                <Route path="health" element={<CatHealth />} />
                <Route path="web3" element={<CatWeb3 />} />
                <Route path="supply-chain" element={<CatSupplyChain />} />
                <Route path="security" element={<CatSecurity />} />
                <Route path="religious" element={<CatReligious />} />
              </Route>
            </Route>
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
