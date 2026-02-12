import React, { useState } from 'react';
import { Settings, Key, Server, Palette, Download, Upload, Trash2, Plus, Edit } from 'lucide-react';
import { AppSettings, LocalModelConfig } from '../types';
import { SettingsService } from '../services/settings';
import { LocalModelForm } from './LocalModelForm';
import { LocalModelTest } from './LocalModelTest';

type SettingsTab = 'general' | 'api' | 'local-models' | 'appearance';

export const SettingsPage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [settings, setSettings] = useState<AppSettings>(SettingsService.getSettings());
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [showLocalModelForm, setShowLocalModelForm] = useState(false);
  const [editingModel, setEditingModel] = useState<LocalModelConfig | null>(null);
  const [importError, setImportError] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>(SettingsService.getSettings().openRouterApiKey);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'local-models', label: 'Local Models', icon: Server },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  const handleSaveSettings = (updates: Partial<AppSettings>) => {
    const updated = SettingsService.updateSettings(updates);
    setSettings(updated);
  };

  const handleSaveLocalModel = (model: LocalModelConfig) => {
    if (editingModel) {
      SettingsService.updateLocalModel(model.id, model);
    } else {
      SettingsService.addLocalModel(model);
    }
    setSettings(SettingsService.getSettings());
    setShowLocalModelForm(false);
    setEditingModel(null);
  };

  const handleDeleteLocalModel = (modelId: string) => {
    if (confirm('Are you sure you want to delete this local model?')) {
      SettingsService.removeLocalModel(modelId);
      setSettings(SettingsService.getSettings());
    }
  };

  const handleEditLocalModel = (model: LocalModelConfig) => {
    setEditingModel(model);
    setShowLocalModelForm(true);
  };

  const handleExportSettings = () => {
    const dataStr = SettingsService.exportSettings();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chat-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        SettingsService.importSettings(content);
        setSettings(SettingsService.getSettings());
        setImportError('');
      } catch (error) {
        setImportError('Invalid settings file format');
      }
    };
    reader.readAsText(file);
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
      SettingsService.resetSettings();
      setSettings(SettingsService.getSettings());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#171717] border border-gray-800 rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-800">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Back"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-white">Settings</h2>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-56 bg-[#0f0f0f] border-r border-gray-800">
            <nav className="p-3 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as SettingsTab)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#171717]">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-base font-semibold text-white">General Settings</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Default Max Tokens
                    </label>
                    <input
                      type="number"
                      value={settings.maxTokens}
                      onChange={(e) => handleSaveSettings({ maxTokens: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#2f2f2f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-600"
                      min="1"
                      max="32768"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Default Temperature
                    </label>
                    <input
                      type="number"
                      value={settings.temperature}
                      onChange={(e) => handleSaveSettings({ temperature: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#2f2f2f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-600"
                      min="0"
                      max="2"
                      step="0.1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Local Model Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    value={settings.localModelTimeout / 1000}
                    onChange={(e) => handleSaveSettings({ localModelTimeout: parseInt(e.target.value) * 1000 })}
                    className="w-full px-3 py-2 bg-[#2f2f2f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-600"
                    min="1"
                    max="300"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoSave"
                    checked={settings.autoSave}
                    onChange={(e) => handleSaveSettings({ autoSave: e.target.checked })}
                    className="h-4 w-4 rounded bg-[#2f2f2f] border-gray-700"
                  />
                  <label htmlFor="autoSave" className="ml-2 block text-sm text-gray-400">
                    Auto-save chat history
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <h3 className="text-base font-semibold text-white">API Configuration</h3>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    OpenRouter API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setSaveSuccess(false);
                    }}
                    className="w-full px-3 py-2 bg-[#2f2f2f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-600"
                    placeholder="sk-or-v1-..."
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Get your API key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">OpenRouter</a>
                  </p>
                  
                  <button
                    onClick={() => {
                      handleSaveSettings({ openRouterApiKey: apiKey });
                      setSaveSuccess(true);
                      setTimeout(() => setSaveSuccess(false), 2000);
                    }}
                    className="mt-4 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    {saveSuccess ? '✓ Saved!' : 'Save API Key'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'local-models' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">Local Models</h3>
                  <button
                    onClick={() => setShowLocalModelForm(true)}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Model
                  </button>
                </div>

                {showLocalModelForm && (
                  <LocalModelForm
                    model={editingModel || undefined}
                    onSave={handleSaveLocalModel}
                    onCancel={() => {
                      setShowLocalModelForm(false);
                      setEditingModel(null);
                    }}
                    isEditing={!!editingModel}
                  />
                )}

                <LocalModelTest />

                <div className="space-y-3">
                  {settings.localModels.map((model) => (
                    <div key={model.id} className="bg-[#2f2f2f] border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-sm font-medium text-white">{model.name}</h4>
                            <span className={`px-2 py-0.5 text-xs rounded ${
                              model.isEnabled
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-gray-700 text-gray-400'
                            }`}>
                              {model.isEnabled ? 'Enabled' : 'Disabled'}
                            </span>
                            <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded">
                              {model.modelType}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-1">{model.description}</p>
                          <p className="text-xs text-gray-500">{model.endpoint}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditLocalModel(model)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLocalModel(model.id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-base font-semibold text-white">Appearance</h3>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Theme
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleSaveSettings({ theme: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#2f2f2f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-600"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>

                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-sm font-medium text-white mb-4">Import/Export Settings</h4>

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <button
                        onClick={handleExportSettings}
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-[#2f2f2f] border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Export Settings
                      </button>

                      <label className="flex items-center gap-2 px-3 py-2 text-sm bg-[#2f2f2f] border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                        <Upload className="w-4 h-4" />
                        Import Settings
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportSettings}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {importError && (
                      <p className="text-sm text-red-400">{importError}</p>
                    )}

                    <button
                      onClick={handleResetSettings}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Reset to Defaults
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
