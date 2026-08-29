import { HashRouter, Routes, Route } from 'react-router-dom';
import { AssessmentProvider } from './state/AssessmentContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Welcome } from './pages/Welcome';
import { Assessment } from './pages/Assessment';
import { Results } from './pages/Results';
import { Criteria } from './pages/Criteria';
import { About } from './pages/About';

export default function App() {
  return (
    <AssessmentProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/results" element={<Results />} />
              <Route path="/criteria" element={<Criteria />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AssessmentProvider>
  );
}
