import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, MapPin, Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { currentUser, setActiveTab, setIsRecogniseModalOpen } = useApp();

  const todayDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <section className="mission-hero" aria-labelledby="mission-hero-title">
      <div className="mission-hero__grid">
        <div className="mission-hero__copy">
          <div className="mission-hero__meta">
            <span className="mission-hero__live">Live dispatch</span>
            <span>{todayDate}</span>
            <span>Field brief / 014</span>
          </div>

          <p className="mission-hero__kicker">Gaza winter corridor</p>
          <h1 id="mission-hero-title" className="mission-hero__title">
            Make the distance <em>smaller.</em>
          </h1>
          <p className="mission-hero__body">
            {currentUser.name.split(' ')[0]}, 28,450 thermal kits are moving from our regional logistics hub into Khan Younis and Deir al-Balah. Every parcel is a practical act of shelter before the winter storms peak.
          </p>

          <div className="mission-hero__actions">
            <button onClick={() => setActiveTab('feed')} className="apple-button-primary">
              Read the field dispatch
            </button>
            <button onClick={() => setActiveTab('impact')} className="apple-button-secondary flex items-center gap-2">
              <Compass className="h-3.5 w-3.5 text-sky-700" />
              <span>Follow the route</span>
            </button>
            <button onClick={() => setIsRecogniseModalOpen(true)} className="apple-button-tertiary flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Recognise the team</span>
            </button>
          </div>

          <div className="mission-hero__route" aria-label="Current relief route">
            <div className="mission-hero__route-label">
              <span>Route / winterisation convoy</span>
              <strong>81% of target in motion</strong>
            </div>
            <div className="mission-hero__route-progress" aria-hidden="true">
              <span className="mission-hero__route-progress-fill">
                <span className="mission-hero__route-beacon" />
              </span>
            </div>
            <div className="mission-hero__route-track">
              <span className="mission-hero__route-stop">Amman hub</span>
              <span className="mission-hero__route-stop">Rafah crossing</span>
              <span className="mission-hero__route-stop">Deir al-Balah</span>
            </div>
          </div>
        </div>

        <div className="mission-hero__photo">
          <img
            src="/images/matw/admin-image-1765282578391.jpeg"
            alt="MATW emergency relief deployment team in the Gaza corridor"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent" />
          <div className="mission-hero__photo-grid" aria-hidden="true" />
          <div className="mission-hero__photo-scan" aria-hidden="true" />
          <div className="mission-hero__stamp">
            <MapPin className="h-3 w-3" />
            Deir al-Balah / Gaza
          </div>
          <div className="mission-hero__telemetry" aria-hidden="true">
            <span className="mission-hero__telemetry-dot" />
            <span>Live route telemetry</span>
            <strong>81%</strong>
          </div>
          <div className="mission-hero__evidence">
            <div>
              <small>Evidence / convoy 14</small>
              <strong>28,450</strong>
            </div>
            <span>thermal kits, tents, and baby nutrition parcels</span>
          </div>
        </div>
      </div>

      <div className="mission-hero__footer">
        <div className="mission-hero__footer-item">
          <small>Current status</small>
          <strong>Crossing cleared for delivery</strong>
        </div>
        <div className="mission-hero__footer-item">
          <small>Team on the ground</small>
          <strong>18 frontline teams coordinating</strong>
        </div>
        <div className="mission-hero__footer-item">
          <small>Trust marker</small>
          <strong>100% donation &amp; Zakat certified</strong>
        </div>
      </div>
    </section>
  );
};
