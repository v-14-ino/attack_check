import React, { useState } from 'react';
import { Header } from '../components/Header';
import { UploadPanel } from '../components/UploadPanel';
import { ReportPreview } from '../components/ReportPreview';
import { RiskDashboard } from '../components/RiskDashboard';
import { OpenPorts } from '../components/OpenPorts';
import { AttackAnalysis } from '../components/AttackAnalysis';
import { RiskAssessment } from '../components/RiskAssessment';
import { ThreatAnalysis } from '../components/ThreatAnalysis';
import { AttackSimulation } from '../components/AttackSimulation';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { type UploadResponse } from '../services/api';
import { Shield, Search, Terminal } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [metadata, setMetadata] = useState<UploadResponse | null>(null);
  const [showThreatAnalysis, setShowThreatAnalysis] = useState(false);
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);
  const [showAttackSimulation, setShowAttackSimulation] = useState(false);

  const handleUploadSuccess = (data: UploadResponse) => {
    setMetadata(data);
    setShowThreatAnalysis(false);
    setShowRiskAssessment(false);
    setShowAttackSimulation(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {!metadata ? (
          <div className="max-w-2xl mx-auto mt-10">
            <UploadPanel onUploadSuccess={handleUploadSuccess} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setMetadata(null)}
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center"
              >
                ← Upload another report
              </button>
            </div>
            
            <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-6 shadow-xl">
              <h1 className="text-2xl font-bold text-white mb-6 text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                REPORT ANALYSIS COMPLETE
              </h1>
              
              <div className="space-y-6">
                <ReportPreview metadata={metadata} />
                <OpenPorts portAnalysis={metadata.port_analysis} />
              </div>
            </div>

            <CollapsibleSection
              title="Security Threat Analysis"
              icon={Search}
              isExpanded={showThreatAnalysis}
              onToggle={() => setShowThreatAnalysis(!showThreatAnalysis)}
            >
              <div className="space-y-6">
                <ThreatAnalysis 
                  threatAnalysis={metadata.threat_analysis} 
                  cveAnalysisStatus={metadata.availability.cve_analysis} 
                />
                <AttackAnalysis metadata={metadata} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Security Risk Assessment"
              icon={Shield}
              isExpanded={showRiskAssessment}
              onToggle={() => setShowRiskAssessment(!showRiskAssessment)}
            >
              <div className="space-y-6">
                <RiskDashboard metadata={metadata} />
                <RiskAssessment metadata={metadata} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Attack Simulation"
              icon={Terminal}
              isExpanded={showAttackSimulation}
              onToggle={() => setShowAttackSimulation(!showAttackSimulation)}
            >
              <div className="space-y-6">
                <AttackSimulation 
                  metadata={metadata} 
                />
              </div>
            </CollapsibleSection>

          </div>
        )}
      </main>
    </div>
  );
};
