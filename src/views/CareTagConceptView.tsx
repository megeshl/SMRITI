import React, { useState } from 'react';
import {
  Radio,
  BatteryCharging,
  Wifi,
  ShieldAlert,
  Info,
  CheckCircle2,
  RefreshCw,
  BellRing
} from 'lucide-react';
import { CareTagDevice, SupportedLanguage } from '../types';

interface CareTagConceptViewProps {
  careTag: CareTagDevice;
  currentLang: SupportedLanguage;
  onUpdateCareTag: (updated: CareTagDevice) => void;
}

export const CareTagConceptView: React.FC<CareTagConceptViewProps> = ({
  careTag,
  currentLang,
  onUpdateCareTag
}) => {
  const [sosActive, setSosActive] = useState(false);
  const [isSimulatingSync, setIsSimulatingSync] = useState(false);

  const handleTriggerSos = () => {
    setSosActive(true);
    setTimeout(() => {
      setSosActive(false);
    }, 4500);
  };

  const handleSimulateSync = () => {
    setIsSimulatingSync(true);
    setTimeout(() => {
      onUpdateCareTag({
        ...careTag,
        lastSyncTime: 'Just now'
      });
      setIsSimulatingSync(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EFE7] text-[#167D83] text-xs font-semibold mb-2">
          <Radio className="w-3.5 h-3.5" />
          <span>Hardware Companion Concept</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#17324D]">
          SMRITI Care Tag
        </h1>
        <p className="text-base text-[#617386] mt-1 max-w-2xl">
          A screenless, pebble-sized tactile wearable designed to accompany elderly loved ones
          without screen fatigue, synchronizing routine activities and gentle proximity presence.
        </p>
      </div>

      {/* Prototype Concept Simulation Warning */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block mb-0.5">Prototype Hardware Concept Simulation:</strong>
          This interface demonstrates the companion wearable architecture planned for SMRITI.
          The SOS interaction and telemetry below are software simulations and are not connected to physical 911 or emergency dispatch hardware.
        </div>
      </div>

      {/* Device Status Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EAE5] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6EAE5]">
          <div className="flex items-center gap-4">
            {/* Pebble Device Graphic */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#167D83] to-[#075B60] flex items-center justify-center text-white shadow-md relative">
              <Radio className="w-8 h-8" />
              {careTag.connected && (
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-white" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold text-[#17324D]">
                  Care Tag 1 (Veranda Clip)
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  Connected
                </span>
              </div>
              <p className="text-xs text-[#617386] mt-0.5 font-mono">
                Serial: {careTag.deviceSerialNumber} · BLE 5.3 Low-Power
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSimulateSync}
              disabled={isSimulatingSync}
              className="px-4 py-2 bg-white hover:bg-[#FBF8EF] border border-[#E6EAE5] text-[#167D83] text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingSync ? 'animate-spin' : ''}`} />
              <span>{isSimulatingSync ? 'Syncing...' : 'Sync Now'}</span>
            </button>
          </div>
        </div>

        {/* 3 Telemetry Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#FBF8EF] border border-[#E6EAE5]">
            <div className="flex items-center justify-between text-xs text-[#617386] mb-1">
              <span>Battery Level</span>
              <BatteryCharging className="w-4 h-4 text-[#167D83]" />
            </div>
            <p className="font-mono text-2xl font-bold text-[#17324D] tabular-nums">
              {careTag.batteryLevel}%
            </p>
            <p className="text-[11px] text-[#22C55E] mt-0.5">Approx. 14 days remaining</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF8EF] border border-[#E6EAE5]">
            <div className="flex items-center justify-between text-xs text-[#617386] mb-1">
              <span>Wearing State</span>
              <CheckCircle2 className="w-4 h-4 text-[#167D83]" />
            </div>
            <p className="font-mono text-2xl font-bold text-[#17324D] capitalize">
              {careTag.wearingState}
            </p>
            <p className="text-[11px] text-[#617386] mt-0.5">Tactile sensor confirmed</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF8EF] border border-[#E6EAE5]">
            <div className="flex items-center justify-between text-xs text-[#617386] mb-1">
              <span>Last Synchronized</span>
              <Wifi className="w-4 h-4 text-[#167D83]" />
            </div>
            <p className="font-mono text-2xl font-bold text-[#17324D]">
              {careTag.lastSyncTime}
            </p>
            <p className="text-[11px] text-[#617386] mt-0.5">Local Bluetooth gateway</p>
          </div>
        </div>

        {/* SOS Simulation Concept Section */}
        <div className="p-6 rounded-3xl bg-[#FFF8F8] border border-red-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-red-100 text-red-600">
                <BellRing className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-base text-[#17324D]">
                  Tactile One-Press Care Call Simulation
                </h4>
                <p className="text-xs text-[#617386]">
                  Elderly user double-presses the textured wooden button on the tag to notify Priya.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleTriggerSos}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                sosActive
                  ? 'bg-red-600 text-white animate-bounce'
                  : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-300'
              }`}
            >
              {sosActive ? 'Simulated Alert Sent!' : 'Simulate Caregiver Alert'}
            </button>
          </div>

          {sosActive && (
            <div className="p-3 bg-red-100 text-red-800 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>
                <strong>Care Alert Broadcast:</strong> "Lakshmi Amma pressed her companion tag in the veranda. Priya has been notified via gentle SMS/app ping." (Simulated)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Setup & Pairing Guide */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EAE5] shadow-xs space-y-4">
        <h3 className="font-serif text-xl text-[#17324D]">
          How Care Tag Integrates with Memory Universe
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-xs text-[#617386] leading-relaxed">
          <li>
            <strong>Gentle Haptic Reminders:</strong> The pebble tag gently hums twice in the morning as an invitation: "Time to enjoy fresh filter coffee and check family photos."
          </li>
          <li>
            <strong>Zero Screen Fatigue:</strong> Screenless operation prevents blue light strain and complex app navigation for seniors.
          </li>
          <li>
            <strong>Automatic Presence Logging:</strong> When Amma sits by the temple tank or courtyard garden, the tag registers calm ambient presence.
          </li>
        </ol>
      </div>
    </div>
  );
};
