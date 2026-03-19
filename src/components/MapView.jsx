import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../store/AppContext';
import { CENTER } from '../data/mockData';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function createBubbleIcon(task, isGuest) {
  const priceText = task.priceType === 'fixed' ? `¥${task.price}` : '面议';
  const emoji = task.type === 'skill' ? '🔧' : '📦';
  const cls = isGuest ? 'blurred' : task.type;
  const html = `
    <div class="task-bubble ${cls}">
      <span>${emoji}</span>
      <span>${isGuest ? '[~500m] ¥**' : priceText}</span>
    </div>
  `;
  return L.divIcon({ html, className: 'task-bubble-marker', iconAnchor: [40, 16] });
}

export default function MapView() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const { visibleTasks, user, openTaskDetail } = useApp();

  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: CENTER,
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    // Try to load tiles; the CSS background shows when tiles fail
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      // Clear stale marker refs so the next mount re-creates them
      markersRef.current = {};
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const isGuest = !user;
    const taskIds = new Set(visibleTasks.map(t => t.id));

    Object.keys(markersRef.current).forEach(id => {
      if (!taskIds.has(parseInt(id))) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    visibleTasks.forEach(task => {
      const icon = createBubbleIcon(task, isGuest);
      if (markersRef.current[task.id]) {
        markersRef.current[task.id].setIcon(icon);
      } else {
        const marker = L.marker([task.lat, task.lng], { icon })
          .addTo(map)
          .on('click', () => openTaskDetail(task));
        markersRef.current[task.id] = marker;
      }
    });
  }, [visibleTasks, user, openTaskDetail]);

  return (
    <div ref={mapRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
  );
}
