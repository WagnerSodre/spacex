import { useEffect, useState } from 'react';
import './App.css'
import backgroundImage from './assets/background.jpg';
import LaunchCard from './components/LaunchCard';
import ChatBot from './components/ChatBot';
import { useFeatureFlagVariantKey } from 'posthog-js/react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SpaceXDashboard() {
  const variant = useFeatureFlagVariantKey('header-color-test');
  const [nextLaunch, setNextLaunch] = useState<any | null>(null);
  const [latestLaunch, setLatestLaunch] = useState<any | null>(null);
  const [pastLaunches, setPastLaunches] = useState<any[] | null>(null);
  const [upcomingLaunches, setUpcomingLaunches] = useState<any[] | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/launch/next`)
      .then(res => res.json())
      .then(data => setNextLaunch(data || null));

    fetch(`${API_BASE_URL}/launch/latest`)
      .then(res => res.json())
      .then(data => setLatestLaunch(data || null));

    fetch(`${API_BASE_URL}/launch/past`)
      .then(res => res.json())
      .then(data => setPastLaunches(data || []));

    fetch(`${API_BASE_URL}/launch/upcoming`)
      .then(res => res.json())
      .then(data => setUpcomingLaunches(data || []));
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'contain',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        height: '100%',
        width: '100%',
        minWidth: '100%',
        margin: 0,
        padding: 0
      }}
    >
      <header style={{
        backgroundColor: 'black',
        color: variant === 'variant' ? 'red' : 'white',
        padding: '1rem',
        fontWeight: 'bold',
        fontSize: '1.5rem',
      }}>
        SpaceX Launch Tracker
      </header>

      <main style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <LaunchCard title="Próximo Lançamento" launches={nextLaunch ? [nextLaunch] : []} />
        <LaunchCard title="Último Lançamento" launches={latestLaunch ? [latestLaunch] : []} />
        <LaunchCard title="Lançamentos Futuros" launches={upcomingLaunches || []} />
        <LaunchCard title="Lançamentos Passados" launches={pastLaunches || []} />
      </main>

      <ChatBot />
    </div>
  );
}
