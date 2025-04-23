import React, { useState } from 'react';
import { AlertCircle, Cpu, Database, Lock, Unlock, BarChart, Brain, ArrowRight } from 'lucide-react';

function App() {
  const [active, setActive] = useState(null),
    [sim, setSim] = useState(false),
    [step, setStep] = useState(0),
    [modal, setModal] = useState(false),
    [content, setContent] = useState({ title: '', content: '' }),
    [demo, setDemo] = useState(false),
    [procs, setProcs] = useState([
      { id: 'P1', res: [], wait: null, status: 'idle' },
      { id: 'P2', res: [], wait: null, status: 'idle' },
      { id: 'P3', res: [], wait: null, status: 'idle' },
      { id: 'P4', res: [], wait: null, status: 'idle' },
    ]),
    [res, setRes] = useState([
      { id: 'R1', held: null, status: 'free' },
      { id: 'R2', held: null, status: 'free' },
      { id: 'R3', held: null, status: 'free' },
      { id: 'R4', held: null, status: 'free' },
    ]),
    [dStep, setDStep] = useState(0),
    [log, setLog] = useState(['System initialized. All processes idle. All resources free.']),
    [deadlock, setDeadlock] = useState(false);

  const learn = () => setContent({ title: 'About AI-Powered Deadlock Detection', content: 'This system uses advanced artificial intelligence algorithms to predict, detect, and resolve deadlocks in operating systems. By analyzing resource allocation patterns, it can identify potential deadlock situations before they occur and take preventive measures.' }),
    viewDemo = () => {
      setSim(true);
      setStep(1);
      setActive('how-it-works');
      const interval = setInterval(() => setStep(p => p >= 4 ? (clearInterval(interval), 4) : p + 1), 2000);
    },
    featureClick = (f) => {
      let t = '', c = '';
      switch (f) {
        case 'detection': t = 'Real-time Detection'; c = 'Our system monitors all resource allocations and process states continuously. When a potential deadlock is forming, it immediately alerts the system administrator and begins automated resolution procedures.'; break;
        case 'prediction': t = 'AI Prediction'; c = 'Using machine learning algorithms trained on historical data, our system can predict deadlock situations with 95% accuracy before they occur, allowing for preemptive action.'; break;
        case 'resolution': t = 'Automatic Resolution'; c = 'When a deadlock is detected, our system applies intelligent resolution strategies such as resource preemption, process rollback, or priority adjustment to break the deadlock with minimal system disruption.'; break;
        case 'analysis': t = 'Performance Analysis'; c = 'Our system provides comprehensive analytics on resource usage patterns, deadlock frequency, and resolution effectiveness, helping administrators optimize system performance over time.'; break;
      }
      setContent({ title: t, content: c });
      setModal(true);
    },
    scroll = (id) => { setActive(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); },
    startDemo = () => {
      setDemo(true); setDStep(0); setLog(['System initialized. All processes idle. All resources free.']); setDeadlock(false);
      setProcs([{ id: 'P1', res: [], wait: null, status: 'idle' }, { id: 'P2', res: [], wait: null, status: 'idle' }, { id: 'P3', res: [], wait: null, status: 'idle' }, { id: 'P4', res: [], wait: null, status: 'idle' }]);
      setRes([{ id: 'R1', held: null, status: 'free' }, { id: 'R2', held: null, status: 'free' }, { id: 'R3', held: null, status: 'free' }, { id: 'R4', held: null, status: 'free' }]);
      scroll('demo');
    },
    nextStep = () => {
      const newStep = dStep + 1;
      setDStep(newStep);
      switch (newStep) {
        case 1: setProcs(p => p.map(pr => pr.id === 'P1' ? { ...pr, res: ['R1'], status: 'running' } : pr)); setRes(r => r.map(re => re.id === 'R1' ? { ...re, held: 'P1', status: 'allocated' } : re)); setLog(l => [...l, 'Process P1 acquires Resource R1']); break;
        case 2: setProcs(p => p.map(pr => pr.id === 'P2' ? { ...pr, res: ['R2'], status: 'running' } : pr)); setRes(r => r.map(re => re.id === 'R2' ? { ...re, held: 'P2', status: 'allocated' } : re)); setLog(l => [...l, 'Process P2 acquires Resource R2']); break;
        case 3: setProcs(p => p.map(pr => pr.id === 'P1' ? { ...pr, wait: 'R2', status: 'waiting' } : pr)); setLog(l => [...l, 'Process P1 requests Resource R2 (waiting)']); break;
        case 4: setProcs(p => p.map(pr => pr.id === 'P2' ? { ...pr, wait: 'R1', status: 'waiting' } : pr)); setLog(l => [...l, 'Process P2 requests Resource R1 (waiting)']); break;
        case 5: setDeadlock(true); setLog(l => [...l, 'DEADLOCK DETECTED: Circular wait between P1 and P2']); break;
        case 6: setProcs(p => p.map(pr => pr.id === 'P2' ? { ...pr, res: [], wait: 'R1', status: 'preempted' } : pr)); setRes(r => r.map(re => re.id === 'R2' ? { ...re, held: null, status: 'free' } : re)); setLog(l => [...l, 'AI Resolution: Preempting Resource R2 from Process P2']); break;
        case 7: setProcs(p => p.map(pr => pr.id === 'P1' ? { ...pr, res: ['R1', 'R2'], wait: null, status: 'running' } : pr)); setRes(r => r.map(re => re.id === 'R2' ? { ...re, held: 'P1', status: 'allocated' } : re)); setLog(l => [...l, 'Process P1 acquires Resource R2']); break;
        case 8: setProcs(p => p.map(pr => pr.id === 'P1' ? { ...pr, res: [], status: 'completed' } : pr)); setRes(r => r.map(re => re.id === 'R1' || re.id === 'R2' ? { ...re, held: null, status: 'free' } : re)); setLog(l => [...l, 'Process P1 completes and releases all resources']); break;
        case 9: setProcs(p => p.map(pr => pr.id === 'P2' ? { ...pr, res: ['R1'], wait: null, status: 'running' } : pr)); setRes(r => r.map(re => re.id === 'R1' ? { ...re, held: 'P2', status: 'allocated' } : re)); setLog(l => [...l, 'Process P2 acquires Resource R1']); break;
        case 10: setProcs(p => p.map(pr => pr.id === 'P2' ? { ...pr, res: [], status: 'completed' } : pr)); setRes(r => r.map(re => re.id === 'R1' ? { ...re, held: null, status: 'free' } : re)); setLog(l => [...l, 'Process P2 completes and releases all resources', 'All processes completed successfully after deadlock resolution']); break;
      }
    },
    resetDemo = () => { setDemo(false); setDStep(0); setLog([]); setDeadlock(false); },
    procColor = (s) => ({ 
      idle: 'bg-gray-500', 
      running: 'bg-green-500', 
      waiting: 'bg-yellow-500', 
      preempted: 'bg-orange-500',
      completed: 'bg-blue-500'
    })[s] || 'bg-gray-500',
    resColor = (s) => ({ 
      free: 'bg-green-500', 
      allocated: 'bg-red-500'
    })[s] || 'bg-gray-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      {/* Header with Navigation */}
      <header className="py-6 px-4 flex justify-center items-center sticky top-0 bg-blue-900 bg-opacity-80 backdrop-blur-sm z-10">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-300" />
              <h1 className="text-2xl font-bold">AI-Powered Deadlock Detection</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => scroll('features')} 
                className={`hover:text-blue-300 transition ${active === 'features' ? 'text-blue-300' : ''}`}
              >
                Features
              </button>
              <button 
                onClick={() => scroll('how-it-works')} 
                className={`hover:text-blue-300 transition ${active === 'how-it-works' ? 'text-blue-300' : ''}`}
              >
                How It Works
              </button>
              <button 
                onClick={() => scroll('visual')} 
                className={`hover:text-blue-300 transition ${active === 'visual' ? 'text-blue-300' : ''}`}
              >
                Visualization
              </button>
              <button 
                onClick={() => scroll('demo')} 
                className={`hover:text-blue-300 transition ${active === 'demo' ? 'text-blue-300' : ''}`}
              >
                Demo
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-blue-300">Predict, Detect, Resolve</h2>
          <p className="text-xl mb-8">
            An intelligent system that uses artificial intelligence to identify and resolve deadlocks in operating systems before they cause problems.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={learn}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 mr-4"
            >
              Learn More
            </button>
            <button 
              onClick={startDemo}
              className="bg-transparent border-2 border-blue-400 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Try Interactive Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-4 bg-black bg-opacity-30">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-300">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={() => featureClick('detection')}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-lg hover:bg-opacity-70 transition duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-400 mr-3" />
                <h3 className="text-xl font-bold">Real-time Detection</h3>
              </div>
              <p>Instantly identifies deadlock situations as they form in the system.</p>
            </div>
            
            <div 
              onClick={() => featureClick('prediction')}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-lg hover:bg-opacity-70 transition duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-purple-400 mr-3" />
                <h3 className="text-xl font-bold">AI Prediction</h3>
              </div>
              <p>Uses machine learning to predict potential deadlocks before they occur.</p>
            </div>
            
            <div 
              onClick={() => featureClick('resolution')}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-lg hover:bg-opacity-70 transition duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <Unlock className="h-8 w-8 text-green-400 mr-3" />
                <h3 className="text-xl font-bold">Automatic Resolution</h3>
              </div>
              <p>Intelligently resolves deadlocks with minimal system disruption.</p>
            </div>
            
            <div 
              onClick={() => featureClick('analysis')}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-lg hover:bg-opacity-70 transition duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <BarChart className="h-8 w-8 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold">Performance Analysis</h3>
              </div>
              <p>Provides detailed insights on system resource usage and deadlock patterns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-300">How It Works</h2>
          
          <div className="space-y-8">
            <div 
              className={`flex flex-col md:flex-row items-center bg-gray-800 ${step === 1 ? 'bg-blue-800' : 'bg-opacity-30'} rounded-lg p-6 transition-all duration-500`}
            >
              <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
                <div className={`${step === 1 ? 'bg-blue-600' : 'bg-blue-900'} p-4 rounded-full transition-all duration-500`}>
                  <Cpu className={`h-10 w-10 ${step === 1 ? 'text-white animate-pulse' : 'text-blue-300'}`} />
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-2">1. Monitoring</h3>
                <p>The system continuously monitors resource allocation and process states in real-time.</p>
                {step === 1 && (
                  <div className="mt-2 text-blue-200 animate-pulse">
                    <p>● Monitoring active processes...</p>
                    <p>● Tracking resource allocations...</p>
                  </div>
                )}
              </div>
            </div>
            
            <div 
              className={`flex flex-col md:flex-row items-center bg-gray-800 ${step === 2 ? 'bg-purple-800' : 'bg-opacity-30'} rounded-lg p-6 transition-all duration-500`}
            >
              <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
                <div className={`${step === 2 ? 'bg-purple-600' : 'bg-purple-900'} p-4 rounded-full transition-all duration-500`}>
                  <Brain className={`h-10 w-10 ${step === 2 ? 'text-white animate-pulse' : 'text-purple-300'}`} />
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-2">2. Analysis</h3>
                <p>AI algorithms analyze resource allocation patterns to identify potential deadlock situations.</p>
                {step === 2 && (
                  <div className="mt-2 text-purple-200 animate-pulse">
                    <p>● Analyzing resource dependency graph...</p>
                    <p>● Detecting circular wait conditions...</p>
                  </div>
                )}
              </div>
            </div>
            
            <div 
              className={`flex flex-col md:flex-row items-center bg-gray-800 ${step === 3 ? 'bg-red-800' : 'bg-opacity-30'} rounded-lg p-6 transition-all duration-500`}
            >
              <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
                <div className={`${step === 3 ? 'bg-red-600' : 'bg-red-900'} p-4 rounded-full transition-all duration-500`}>
                  <Lock className={`h-10 w-10 ${step === 3 ? 'text-white animate-pulse' : 'text-red-300'}`} />
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-2">3. Detection</h3>
                <p>When a deadlock is detected, the system immediately identifies the involved processes and resources.</p>
                {step === 3 && (
                  <div className="mt-2 text-red-200 animate-pulse">
                    <p>● Deadlock detected between Process P1 and P2!</p>
                    <p>● Resources R1 and R2 involved in deadlock...</p>
                  </div>
                )}
              </div>
            </div>
            
            <div 
              className={`flex flex-col md:flex-row items-center bg-gray-800 ${step === 4 ? 'bg-green-800' : 'bg-opacity-30'} rounded-lg p-6 transition-all duration-500`}
            >
              <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
                <div className={`${step === 4 ? 'bg-green-600' : 'bg-green-900'} p-4 rounded-full transition-all duration-500`}>
                  <Unlock className={`h-10 w-10 ${step === 4 ? 'text-white animate-pulse' : 'text-green-300'}`} />
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-2">4. Resolution</h3>
                <p>The system applies intelligent resolution strategies to break the deadlock with minimal impact.</p>
                {step === 4 && (
                  <div className="mt-2 text-green-200 animate-pulse">
                    <p>● Applying resource preemption strategy...</p>
                    <p>● Deadlock successfully resolved!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {sim && step === 4 && (
            <div className="mt-8 text-center">
              <button 
                onClick={() => {
                  setSim(false);
                  setStep(0);
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Reset Simulation
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Visual Representation */}
      <section id="visual" className="py-16 px-4 bg-black bg-opacity-30">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-300">Visual Representation</h2>
          
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <div className="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className={`grid grid-cols-2 gap-8 p-4 ${sim ? 'animate-pulse' : ''}`}>
                  <div className="flex flex-col items-center">
                    <Database className={`h-12 w-12 text-blue-400 mb-2 ${sim ? 'animate-bounce' : ''}`} />
                    <div className={`h-2 w-24 bg-red-500 rounded-full ${sim ? 'animate-pulse' : ''}`}></div>
                    <div className="mt-4 flex">
                      <div className="w-4 h-16 bg-purple-500 rounded-l-lg"></div>
                      <div className="w-4 h-16 bg-blue-500"></div>
                      <div className="w-4 h-16 bg-green-500 rounded-r-lg"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Lock className={`h-12 w-12 text-red-400 mb-2 ${step >= 3 ? 'hidden' : ''}`} />
                    <Unlock className={`h-12 w-12 text-green-400 mb-2 ${step >= 3 ? '' : 'hidden'}`} />
                    <div className={`h-2 w-24 bg-yellow-500 rounded-full ${sim ? 'animate-pulse' : ''}`}></div>
                    <div className="mt-4 flex">
                      <div className="w-4 h-16 bg-red-500 rounded-l-lg"></div>
                      <div className="w-4 h-16 bg-orange-500"></div>
                      <div className="w-4 h-16 bg-yellow-500 rounded-r-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Simplified visualization of how the AI system detects resource conflicts and resolves deadlocks
            </p>
            <button 
              onClick={viewDemo}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Run Simulation
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="demo" className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-300">Interactive Deadlock Demo</h2>
          
          {!demo ? (
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Experience a Deadlock Scenario</h3>
              <p className="mb-6">This interactive demo shows how deadlocks form and how our AI system detects and resolves them.</p>
              <button 
                onClick={startDemo}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Start Demo
              </button>
            </div>
          ) : (
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Deadlock Simulation</h3>
                <p className="mb-2">Step {dStep} of 10: {dStep === 0 ? 'Ready to start' : 'In progress'}</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${deadlock ? 'bg-red-500' : 'bg-blue-500'}`} 
                    style={{ width: `${(dStep / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="font-bold mb-3 text-blue-300">Processes</h4>
                  <div className="space-y-3">
                    {procs.map(process => (
                      <div key={process.id} className="flex items-center bg-gray-700 p-3 rounded-lg">
                        <div className={`w-4 h-4 rounded-full mr-3 ${procColor(process.status)}`}></div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-bold">{process.id}</span>
                            <span className="text-sm">{process.status}</span>
                          </div>
                          <div className="text-sm">
                            {process.res.length > 0 && (
                              <span>Has: {process.res.join(', ')}</span>
                            )}
                            {process.wait && (
                              <span className="ml-2 text-yellow-400">Waiting for: {process.wait}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-3 text-blue-300">Resources</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {res.map(resource => (
                      <div key={resource.id} className="bg-gray-700 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold">{resource.id}</span>
                          <div className={`w-3 h-3 rounded-full ${resColor(resource.status)}`}></div>
                        </div>
                        <div className="text-sm">
                          {resource.held ? (
                            <span>Held by: {resource.held}</span>
                          ) : (
                            <span className="text-green-400">Available</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold mb-3 text-blue-300">System Log</h4>
                <div className="bg-gray-900 p-3 rounded-lg h-40 overflow-y-auto font-mono text-sm">
                  {log.map((entry, index) => (
                    <div 
                      key={index} 
                      className={`mb-1 ${entry.includes('DEADLOCK') ? 'text-red-400 font-bold' : ''}`}
                    >
                      {entry}
                    </div>
                  ))}
                </div>
              </div>
              
              {deadlock && dStep === 5 && (
                <div className="bg-red-900 bg-opacity-50 p-4 rounded-lg mb-6 flex items-center">
                  <AlertCircle className="h-6 w-6 text-red-400 mr-3 animate-pulse" />
                  <div>
                    <h4 className="font-bold">Deadlock Detected!</h4>
                    <p className="text-sm">A circular wait condition has been detected between processes P1 and P2.</p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between">
                <button 
                  onClick={resetDemo}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                  Reset
                </button>
                
                {dStep < 10 ? (
                  <button 
                    onClick={nextStep}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center"
                  >
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button 
                    onClick={resetDemo}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Finish Demo
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black bg-opacity-50">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="mb-4">AI-Powered Deadlock Detection System</p>
          <p className="text-sm text-gray-400">Operating Systems Project - 2025</p>
        </div>
      </footer>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-300">{content.title}</h3>
            <p className="mb-6">{content.content}</p>
            <div className="flex justify-end">
              <button 
                onClick={() => setModal(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;