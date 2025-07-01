// src/components/LaunchCard.tsx
import { useEffect, useState } from 'react';
import defaultImage from '/src/assets/default.png';

interface LaunchCardProps {
  title: string;
  launches?: any[];
}

export default function LaunchCard({ title, launches = [] }: LaunchCardProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1200) setItemsPerPage(4);
      else if (width >= 992) setItemsPerPage(3);
      else if (width >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(launches.length / itemsPerPage);
  const paginatedLaunches = launches.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const arrowButtonStyle = {
    fontSize: '2rem',
    color: '#fff',
    background: 'rgba(0,0,0,0.3)',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    border: 'none',
    width: '2rem',
    height: '6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  } as const;

  return (
    <section style={{ width: '100%', marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff', paddingLeft: '1rem' }}>{title}</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', minHeight: '460px' }}>
        <div style={{ width: '2rem', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {currentPage > 0 ? (
            <button onClick={handlePrev} style={arrowButtonStyle}>&lt;</button>
          ) : null}
        </div>

        <div style={{ display: 'flex', gap: '1rem', flex: 1, justifyContent: 'center', flexWrap: 'nowrap' }}>
          {paginatedLaunches.length > 0 ? (
            paginatedLaunches.map((launch, index) => (
              <div key={launch.id || index} style={{ flex: '0 0 auto', width: '300px', background: '#2a2a2a', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(255,255,255,0.1)', minHeight: '400px' }}>
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#444', borderRadius: '8px' }}>
                  <img
                    src={launch.links?.patch?.large || defaultImage}
                    alt="Patch da missão"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
                <div style={{ paddingTop: '0.5rem', color: '#fff' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>{launch.name}</h3>
                  <p><strong>Data:</strong> {new Date(launch.date_utc).toLocaleString()}</p>
                  <p><strong>Flight #:</strong> {launch.flight_number}</p>
                  <p><strong>Webcast:</strong> {launch.links?.webcast ? <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer" style={{ color: '#a5b4fc' }}>Assistir</a> : 'Indisponível'}</p>
                  <p><strong>Rocket ID:</strong> {launch.rocket}</p>
                  <p><strong>Launchpad ID:</strong> {launch.launchpad}</p>
                </div>
              </div>
            ))
          ) : <p style={{ color: '#ccc' }}>Carregando dados...</p>}
        </div>

        <div style={{ width: '2rem', minHeight: '100%', alignItems: 'center', justifyContent: 'center' }}>
          {currentPage < totalPages - 1 ? (
            <button onClick={handleNext} style={arrowButtonStyle}>&gt;</button>
          ) : null}
        </div>
      </div>
    </section>
  );
}