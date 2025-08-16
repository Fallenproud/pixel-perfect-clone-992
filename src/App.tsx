
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
            <Route path="marketplace" element={<Index />} />
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
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
