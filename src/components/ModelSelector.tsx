import React, { useMemo } from 'react';
import { AVAILABLE_MODELS } from '../config/models';
import { SettingsService } from '../services/settings';

interface ModelSelectorProps {
  selectedModels: string[];
  onModelSelectionChange: (modelIds: string[]) => void;
  maxModels?: number;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModels,
  onModelSelectionChange,
  maxModels = 5
}) => {
  const settings = SettingsService.getSettings();
  const allModels = useMemo(() => {
    const enabledLocalModels = settings.localModels.filter(model => model.isEnabled);
    return [...AVAILABLE_MODELS, ...enabledLocalModels];
  }, [settings.localModels]);

  const handleModelToggle = (modelId: string) => {
    const isSelected = selectedModels.includes(modelId);

    if (isSelected) {
      onModelSelectionChange(selectedModels.filter(id => id !== modelId));
    } else {
      if (selectedModels.length < maxModels) {
        onModelSelectionChange([...selectedModels, modelId]);
      }
    }
  };

  const handleQuickSelect = (count: number) => {
    const modelsToSelect = allModels.slice(0, count).map(model => model.id);
    onModelSelectionChange(modelsToSelect);
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
          Select Models ({selectedModels.length}/{maxModels})
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleQuickSelect(1)}
            className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-purple-200 border border-white/10 hover:border-white/20 transition-all"
          >
            1 Model
          </button>
          <button
            onClick={() => handleQuickSelect(3)}
            className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-purple-200 border border-white/10 hover:border-white/20 transition-all"
          >
            3 Models
          </button>
          <button
            onClick={() => handleQuickSelect(5)}
            className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-medium transition-all shadow-lg shadow-purple-500/30"
          >
            All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {allModels.map((model) => (
          <div
            key={model.id}
            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-[1.02] ${selectedModels.includes(model.id)
              ? 'border-purple-500 bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/30'
              : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            onClick={() => handleModelToggle(model.id)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${selectedModels.includes(model.id)
                  ? 'border-purple-500 bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50'
                  : 'border-white/30 bg-white/5'
                  }`}>
                  {selectedModels.includes(model.id) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="text-sm font-bold text-white truncate">
                    {model.name}
                  </h4>
                  <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-lg border border-purple-500/30">
                    {'provider' in model ? model.provider : 'Local'}
                  </span>
                </div>
                <p className="text-xs text-purple-200/70 line-clamp-2 mb-2">
                  {model.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-purple-300/60">
                  <span>{model.maxTokens.toLocaleString()} tokens</span>
                  <span>•</span>
                  <span>{'costPer1kTokens' in model ? `$${model.costPer1kTokens}/1k` : '🆓 Free'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedModels.length === 0 && (
        <div className="text-center py-6 text-purple-300/60 text-sm">
          ✨ Select at least one model to start chatting
        </div>
      )}
    </div>
  );
};

