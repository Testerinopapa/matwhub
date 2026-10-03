import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, HeartPulse, Home, Utensils } from 'lucide-react';

export const ImpactStatsBar: React.FC = () => {
  const { impactMetrics, setActiveTab } = useApp();

  const totalMetric = impactMetrics.find(m => m.key === 'total_impact') || impactMetrics[0];
  const foodMetric = impactMetrics.find(m => m.key === 'food_water');
  const healthMetric = impactMetrics.find(m => m.key === 'health_hygiene');
  const shelterMetric = impactMetrics.find(m => m.key === 'shelter_clothing');

  const metrics = [
    { metric: foodMetric, label: 'Nutrition & water', note: 'Hot meals, food parcels, and clean wells.', icon: Utensils, tone: 'blue' },
    { metric: healthMetric, label: 'Healthcare', note: 'Mobile clinics and family sanitation boxes.', icon: HeartPulse, tone: 'red' },
    { metric: shelterMetric, label: 'Shelter & warmth', note: 'Tents, blankets, and winter clothing.', icon: Home, tone: 'gold' },
  ];

  return (
    <section className="impact-ledger" aria-labelledby="impact-ledger-title">
      <div className="impact-ledger__heading">
        <div>
          <span className="apple-eyebrow">Verified field record</span>
          <h2 id="impact-ledger-title">The work, in numbers.</h2>
        </div>
        <span className="impact-ledger__sync" aria-label="Live audited feed">
          <span className="impact-ledger__sync-dot" />
          Live audited feed
        </span>
        <button type="button" onClick={() => setActiveTab('impact')} className="impact-ledger__link">
          Explore the full footprint <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className="impact-ledger__body">
        <button type="button" onClick={() => setActiveTab('impact')} className="impact-ledger__primary">
          <div className="impact-ledger__primary-top">
            <span>Total lives supported</span>
            <span className="impact-ledger__verified"><CheckCircle2 className="h-3.5 w-3.5" /> Audited record</span>
          </div>
          <strong>{totalMetric.value}</strong>
          <p>People reached with food, water, medical care, or emergency shelter since October 2023.</p>
          <span className="impact-ledger__primary-footer">24 countries / active missions</span>
        </button>

        <div className="impact-ledger__metrics">
          {metrics.map(({ metric, label, note, icon: Icon, tone }) => metric && (
            <button type="button" key={metric.id} onClick={() => setActiveTab('impact')} className="impact-ledger__metric">
              <div className={`impact-ledger__icon impact-ledger__icon--${tone}`}><Icon className="h-4 w-4" /></div>
              <span>{label}</span>
              <strong>{metric.value}</strong>
              <small>{note}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
