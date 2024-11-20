import React, { useState, useEffect } from 'react';
import { Brain, Send, Sparkles, FileText, Copy, History, Trash2, ChevronLeft } from 'lucide-react';

interface ProposalHistory {
  id: string;
  jobDescription: string;
  proposal: string;
  timestamp: Date;
}

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [proposal, setProposal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<ProposalHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('proposalHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const generateProposal = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const intro = `Hi there,\n\nI noticed your media buying project and I'm confident I can help you achieve exceptional ROI with your campaigns.`;
      const experience = `With a proven track record of managing successful campaigns, I've consistently delivered 2-3x ROAS for my clients. I've attached my portfolio below showcasing recent case studies with similar requirements to your project.`;
      const closing = `I'd love to discuss your specific goals and share my strategy for your campaign. When would be a good time for a quick call?\n\nBest regards,\nMuhammad Ammar`;
      
      const generatedProposal = `${intro}\n\n${experience}\n\n${closing}`;
      setProposal(generatedProposal);
      
      const newHistoryItem: ProposalHistory = {
        id: Date.now().toString(),
        jobDescription,
        proposal: generatedProposal,
        timestamp: new Date(),
      };
      
      const updatedHistory = [newHistoryItem, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('proposalHistory', JSON.stringify(updatedHistory));
      
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const deleteHistoryItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('proposalHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Proposal Master</h1>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="btn btn-secondary flex items-center space-x-2 text-sm"
          >
            {showHistory ? (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Editor</span>
              </>
            ) : (
              <>
                <History className="w-4 h-4" />
                <span>View History</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                className="w-full h-[calc(100vh-280px)] px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg input-focus"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <button
              onClick={generateProposal}
              disabled={!jobDescription || isGenerating}
              className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-sm transition-all duration-200 ${
                !jobDescription || isGenerating
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="animate-spin w-4 h-4" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Generate Proposal</span>
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          {!showHistory ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="text-sm font-medium text-gray-800">Generated Proposal</h2>
                </div>
                {proposal && (
                  <button
                    onClick={() => copyToClipboard(proposal)}
                    className="btn btn-secondary text-sm flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                )}
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-[calc(100vh-280px)] overflow-y-auto">
                {proposal ? (
                  <pre className="whitespace-pre-wrap font-helvetica text-gray-700 text-sm">{proposal}</pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Your generated proposal will appear here
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-sm font-medium text-gray-800">Proposal History</h2>
              <div className="space-y-3 h-[calc(100vh-240px)] overflow-y-auto">
                {history.length > 0 ? (
                  history.map((item) => (
                    <div key={item.id} className="p-4 bg-white border border-gray-200 rounded-lg space-y-3 hover:border-gray-300 transition-colors">
                      <div className="flex justify-between items-start">
                        <p className="text-xs text-gray-500">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => copyToClipboard(item.proposal)}
                            className="p-1.5 rounded-md hover:bg-gray-100"
                          >
                            <Copy className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            onClick={() => deleteHistoryItem(item.id)}
                            className="p-1.5 rounded-md hover:bg-gray-100"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {item.jobDescription}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-sm text-gray-500 pt-8">
                    No proposal history yet
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;