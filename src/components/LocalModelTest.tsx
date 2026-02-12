import React, { useState } from 'react';
import { SettingsService } from '../services/settings';
import { ApiService } from '../services/api';

export const LocalModelTest: React.FC = () => {
  const [testMessage, setTestMessage] = useState('Hello, how are you?');
  const [results, setResults] = useState<string[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  const testLocalModels = async () => {
    setIsTesting(true);
    setResults([]);

    const settings = SettingsService.getSettings();
    const enabledModels = settings.localModels.filter(model => model.isEnabled);

    if (enabledModels.length === 0) {
      setResults(['No enabled local models found. Please enable at least one local model in settings.']);
      setIsTesting(false);
      return;
    }

    try {
      console.log('Testing local models:', enabledModels);
      const responses = await ApiService.queryLocalModels(testMessage, enabledModels);

      const resultMessages = responses.map(response => {
        if (response.error) {
          return `${response.model}: ${response.error}`;
        } else {
          return `${response.model}: ${response.content.substring(0, 100)}...`;
        }
      });

      setResults(resultMessages);
    } catch (error) {
      setResults([`Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`]);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="bg-[#2f2f2f] border border-gray-700 rounded-lg p-4 mb-4">
      <h3 className="text-base font-semibold text-white mb-4">Local Model Test</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Test Message
          </label>
          <input
            type="text"
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            className="w-full px-3 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-600"
            placeholder="Enter a test message"
          />
        </div>

        <button
          onClick={testLocalModels}
          disabled={isTesting}
          className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isTesting ? 'Testing...' : 'Test Local Models'}
        </button>

        {results.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-white mb-2">Results:</h4>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="text-sm p-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-gray-300">
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
