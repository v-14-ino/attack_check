import React, { useState } from 'react';
import { Header } from '../components/Header';
import { UploadPanel } from '../components/UploadPanel';
import { ReportPreview } from '../components/ReportPreview';
import { RiskDashboard } from '../components/RiskDashboard';
import { OpenPorts } from '../components/OpenPorts';
import { AttackAnalysis } from '../components/AttackAnalysis';
import { RiskAssessment } from '../components/RiskAssessment';
import { ThreatAnalysis } from '../components/ThreatAnalysis';
import { api, type UploadResponse } from '../services/api';

export const Dashboard: React.FC = () => {
  const [metadata, setMetadata] = useState<UploadResponse | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {!metadata ? (
          <div className="max-w-2xl mx-auto mt-10">
            <UploadPanel onUploadSuccess={setMetadata} />
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
            <ReportPreview metadata={metadata} />
            <RiskDashboard metadata={metadata} />
            <OpenPorts portAnalysis={metadata.port_analysis} />
            <AttackAnalysis metadata={metadata} />
            <RiskAssessment metadata={metadata} />
            <ThreatAnalysis 
              threatAnalysis={metadata.threat_analysis} 
              cveAnalysisStatus={metadata.availability.cve_analysis} 
            />
          </div>
        )}
      </main>
    </div>
  );
};
