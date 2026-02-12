import React from 'react';
import { Plus } from 'lucide-react';
import { AVAILABLE_MODELS } from '../config/models';
import { SettingsService } from '../services/settings';

interface ModelBarProps {
  selectedModels: string[];
  onModelToggle: (modelId: string) => void;
  onAddModel: () => void;
  maxModels?: number;
}

export const ModelBar: React.FC<ModelBarProps> = ({ selectedModels, onModelToggle, onAddModel, maxModels = 5 }) => {
  const settings = SettingsService.getSettings();
  
  // Show all local models (don't filter by isEnabled)
  const localModels = settings.localModels;
  
  // Only show remote models if API key is present
  const hasApiKey = settings.openRouterApiKey && settings.openRouterApiKey.trim() !== '';
  const remoteModels = hasApiKey ? AVAILABLE_MODELS : [];
  
  const allModels = [...remoteModels, ...localModels];

  // Get first 5 models for display
  const displayModels = allModels.slice(0, maxModels);

  return (
    <div className="bg-[#171717] border-b border-gray-800 px-4 py-3">
      <div className="flex items-center gap-3 overflow-x-auto">
        {displayModels.map((model) => {
          const isSelected = selectedModels.includes(model.id);
          
          return (
            <div
              key={model.id}
              className="flex items-center gap-3 px-3 py-2 bg-[#2f2f2f] border border-gray-700 rounded-lg min-w-fit"
            >
              {/* Toggle Switch */}
              <button
                onClick={() => onModelToggle(model.id)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  isSelected ? 'bg-white' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-gray-900 rounded-full transition-transform ${
                    isSelected ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </button>
              
              {/* Model Name with Green Dot */}
              <div className="flex items-center gap-2">
                {isSelected && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
                <div className="flex flex-col">
                  <span className={`text-sm font-medium whitespace-nowrap ${
                    isSelected ? 'text-white' : 'text-gray-400'
                  }`}>
                    {model.name}
                  </span>
                  {'provider' in model && model.provider && (
                    <span className="text-xs text-gray-500">
                      {model.provider}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Model Button */}
        <button 
          onClick={onAddModel}
          className="flex items-center gap-2 px-3 py-2 bg-[#2f2f2f] border border-gray-700 hover:border-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors min-w-fit"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add model</span>
        </button>
      </div>
    </div>
  );
};
