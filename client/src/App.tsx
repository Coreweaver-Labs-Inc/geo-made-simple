/* Signal Ledger direction: keep the app shell quiet so the landing page's editorial hierarchy stays in control. */
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Contact from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyIntake from "./pages/CaseStudyIntake";
import CaseStudyPreview from "./pages/CaseStudyPreview";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import AuthorProfile from "./pages/AuthorProfile";
import AiDataPolicy from "./pages/AiDataPolicy";
import Faq from "./pages/Faq";
import Framework from "./pages/Framework";
import GtmHub from "./pages/GtmHub";
import GtmWorkspace from "./pages/GtmWorkspace";
import Home from "./pages/Home";
import InsightDetail from "./pages/InsightDetail";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Research from "./pages/Research";
import Studio from "./pages/Studio";
import TopicDetail from "./pages/TopicDetail";
import Topics from "./pages/Topics";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/framework" component={Framework} />
      <Route path="/services" component={GtmHub} />
      <Route path="/workspace" component={GtmWorkspace} />
      <Route path="/products" component={Products} />
      <Route path="/insights" component={Insights} />
      <Route path="/research" component={Research} />
      <Route path="/ai-data-policy" component={AiDataPolicy} />
      <Route path="/faq" component={Faq} />
      <Route path="/topics" component={Topics} />
      <Route path="/topics/:slug" component={TopicDetail} />
      <Route path="/insights/:slug" component={InsightDetail} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/case-studies/governance-preview" component={CaseStudyPreview} />
      <Route path="/case-studies/:slug" component={CaseStudyDetail} />
      <Route path="/case-study-intake" component={CaseStudyIntake} />
      <Route path="/authors/:slug" component={AuthorProfile} />
      <Route path="/contact" component={Contact} />
      <Route path="/studio" component={Studio} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <ErrorBoundary><Router /></ErrorBoundary>;
}
