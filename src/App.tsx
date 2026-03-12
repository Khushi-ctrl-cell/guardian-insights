import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Alerts from "./pages/Alerts";
import Accounts from "./pages/Accounts";
import IdentityGraphPage from "./pages/IdentityGraphPage";
import RulesEngine from "./pages/RulesEngine";
import Settings from "./pages/Settings";
import ApiDocs from "./pages/ApiDocs";
import Compliance from "./pages/Compliance";
import CaseStudy from "./pages/CaseStudy";
import Architecture from "./pages/Architecture";
import TrustCenter from "./pages/TrustCenter";
import Blog from "./pages/Blog";
import Status from "./pages/Status";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/identity-graph" element={<IdentityGraphPage />} />
          <Route path="/rules-engine" element={<RulesEngine />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/trust-center" element={<TrustCenter />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/status" element={<Status />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
