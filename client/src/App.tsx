import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AIWorld from "./pages/AIWorld";
import AITools from "./pages/AITools";
import AIEarnings from "./pages/AIEarnings";
import DigitalWorld from "./pages/DigitalWorld";
import CyberSecurity from "./pages/CyberSecurity";
import ContentDetail from "./pages/ContentDetail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/yapay-zeka" component={AIWorld} />
      <Route path="/ai-araclari" component={AITools} />
      <Route path="/ai-ile-kazanc" component={AIEarnings} />
      <Route path="/dijital-dunya" component={DigitalWorld} />
      <Route path="/siber-guvenlik" component={CyberSecurity} />
      <Route path="/detay/:category/:type/:slug" component={ContentDetail} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
