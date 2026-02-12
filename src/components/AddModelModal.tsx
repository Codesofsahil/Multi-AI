import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import { LocalModelConfig } from '../types';
import { SettingsService } from '../services/settings';

interface AddModelModalProps {
  onClose: () => void;
}

export const AddModelModal: React.FC<AddModelModalProps> = ({ onClose }) => {
  const [modelType, setModelType] = useState<'local' | 'api'>('local');
  const [name, setName] = useState('');
  const [endpoint, setEndpoint] = useState('http://localhost:11434/api/chat');
  const [showInstructions, setShowInstructions] = useState(false);

  const handleAdd = () => {
    if (!name.trim()) return;

    const newModel: LocalModelConfig = {
      id: `local-${Date.now()}`,
      name: name.trim(),
      description: modelType === 'local' ? 'Local Ollama model' : 'Remote API model',
      endpoint: endpoint.trim(),
      maxTokens: 512,
      temperature: 0.7,
      isEnabled: true,
      modelType: 'ollama'
    };

    SettingsService.addLocalModel(newModel);
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#171717] border border-gray-800 rounded-lg w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Add Model</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Toggle: Local vs API */}
          <div className="flex gap-2 p-1 bg-[#2f2f2f] rounded-lg">
            <button
              onClick={() => setModelType('local')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                modelType === 'local' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              Local (Ollama)
            </button>
            <button
              onClick={() => setModelType('api')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                modelType === 'api' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              API (Remote)
            </button>
          </div>

          {/* Instructions Button */}
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
          >
            <Info className="w-4 h-4" />
            {showInstructions ? 'Hide' : 'Show'} Instructions
          </button>

          {/* Instructions */}
          {showInstructions && (
            <div className="bg-[#2f2f2f] border border-gray-700 rounded-lg p-4 text-sm text-gray-300 space-y-3">
              {modelType === 'local' ? (
                <>
                  <h4 className="font-semibold text-white">How to add Local Ollama models:</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Install Ollama from <a href="https://ollama.ai" target="_blank" className="text-blue-400 hover:underline">ollama.ai</a></li>
                    <li>Open Command Prompt and run: <code className="bg-black px-2 py-1 rounded">ollama run model-name</code></li>
                    <li>Example: <code className="bg-black px-2 py-1 rounded">ollama run llama3.2:1b</code></li>
                    <li>Enter the model ID below (e.g., llama3.2:1b)</li>
                    <li>Default endpoint: <code className="bg-black px-2 py-1 rounded">http://localhost:11434/api/generate</code></li>
                  </ol>
                </>
              ) : (
                <>
                  <h4 className="font-semibold text-white">How to add API models:</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Get API key from <a href="https://openrouter.ai/keys" target="_blank" className="text-blue-400 hover:underline">OpenRouter</a></li>
                    <li>Go to Settings → API Keys</li>
                    <li>Paste your API key and click Save</li>
                    <li>Remote models (GPT, Claude, Gemini) will appear automatically</li>
                  </ol>
                  <p className="text-yellow-400 text-xs">Note: API models require OpenRouter API key in Settings</p>
                </>
              )}
            </div>
          )}

          {/* Form Fields */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              {modelType === 'local' ? 'Model ID (from Ollama)' : 'Model Name'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={modelType === 'local' ? 'e.g., llama3.2:1b' : 'e.g., Custom Model'}
              className="w-full px-3 py-2 bg-[#2f2f2f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-600"
            />
          </div>

          {modelType === 'local' && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">Endpoint</label>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full px-3 py-2 bg-[#2f2f2f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-600"
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAdd}
              disabled={!name.trim()}
              className="flex-1 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Model
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-[#2f2f2f] text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
