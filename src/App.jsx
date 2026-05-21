import { useState, useRef, useEffect } from 'react';
import ImageTrail from './ImageTrail';
import './App.css';

const IMAGE_CATEGORIES = {
  local: {
    name: 'Local',
    images: [
      '/048155170c820a3dad81ae1e5b043538.jpg',
      '/16d276dae2b866be1c8faed7ccc1bb15.jpg',
      '/47c98aecdfdaa0e4c8a585642981b357.jpg',
      '/8496ace83d5a13daeb68a6516c58dd99.jpg',
      '/c09384d9ab2dade46db96408a33caba9.jpg',
      '/ce7d991bd59fe943385fbea80dd7b222.jpg',
      '/d5b90ec3e614ccd60a5479919c95dd4e.jpg',
    ]
  },
  picsum: {
    name: 'Picsum Mix',
    images: [
      'https://picsum.photos/id/287/300/300',
      'https://picsum.photos/id/1001/300/300',
      'https://picsum.photos/id/1025/300/300',
      'https://picsum.photos/id/1026/300/300',
      'https://picsum.photos/id/1027/300/300',
      'https://picsum.photos/id/1028/300/300',
      'https://picsum.photos/id/1029/300/300',
      'https://picsum.photos/id/1030/300/300',
      'https://picsum.photos/id/1031/300/300',
      'https://picsum.photos/id/1033/300/300',
      'https://picsum.photos/id/1035/300/300',
      'https://picsum.photos/id/1036/300/300',
      'https://picsum.photos/id/1037/300/300',
      'https://picsum.photos/id/1038/300/300',
      'https://picsum.photos/id/1039/300/300',
    ]
  },
  nature: {
    name: 'Naturaleza',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1472214222541-d510753a4707?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&h=300&fit=crop',
    ]
  },
  cyberpunk: {
    name: 'Urbano & Neon',
    images: [
      'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522083165195-342750297f05?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop',
    ]
  }
};

const VARIANTS = [
  { id: 1, name: 'Escala Suave', desc: 'Las imágenes escalan hacia abajo suavemente mientras se desvanecen con el movimiento.' },
  { id: 2, name: 'Brillo & Contraste', desc: 'Efecto de flash vibrante con gran escala inicial y resplandor al aparecer.' },
  { id: 3, name: 'Ascenso Explosivo', desc: 'Las imágenes se elevan rápidamente hacia arriba con un ángulo de dispersión aleatorio.' },
  { id: 4, name: 'Inercia de Velocidad', desc: 'Deformación física basada en la rapidez del ratón con destello cromático.' },
  { id: 5, name: 'Giro & Desplazamiento', desc: 'Rotación y estiramiento alineados con la dirección física del movimiento del cursor.' },
  { id: 6, name: 'Desenfoque de Movimiento', desc: 'Simula un desenfoque radial y pérdida de color proporcional a la velocidad.' },
  { id: 7, name: 'Pila Persistente', desc: 'Mantiene una cola activa de hasta 9 imágenes que envejecen y se desvanecen en orden.' },
  { id: 8, name: 'Perspectiva 3D', desc: 'Rotación tridimensional interactiva respecto al centro de la pantalla.' }
];

function App() {
  const [variant, setVariant] = useState(4);
  const [category, setCategory] = useState('local');
  const btnRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const idx = VARIANTS.findIndex(v => v.id === variant);
    const el = btnRefs.current[idx];
    if (el) {
      const parent = el.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        setIndicatorStyle({
          top: elRect.top - parentRect.top,
          left: elRect.left - parentRect.left,
          width: elRect.width,
          height: elRect.height,
        });
      }
    }
  }, [variant]);

  const catBtnRefs = useRef([]);
  const [catIndicatorStyle, setCatIndicatorStyle] = useState({});
  const catKeys = Object.keys(IMAGE_CATEGORIES);

  useEffect(() => {
    const idx = catKeys.findIndex(k => k === category);
    const el = catBtnRefs.current[idx];
    if (el) {
      const parent = el.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        setCatIndicatorStyle({
          top: elRect.top - parentRect.top,
          left: elRect.left - parentRect.left,
          width: elRect.width,
          height: elRect.height,
        });
      }
    }
  }, [category]);

  const activeCategory = IMAGE_CATEGORIES[category] || IMAGE_CATEGORIES.picsum;

  return (
    <div className="min-h-screen w-full grid-bg flex flex-col select-none">


      {/* Main Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_280px]">
        
        {/* Play Area */}
        <div className="flex flex-col">
          <div 
            className="relative h-screen w-full bg-zinc-950/80 border border-zinc-800/80 shadow-inner overflow-hidden cursor-crosshair group"
          >
            {variant !== 0 && (
              <ImageTrail
                key={`${category}-${variant}`}
                items={activeCategory.images}
                variant={variant}
              />
            )}

            {/* Variant info overlay */}
            <div className="absolute top-0 left-0 right-0 z-[200] flex items-center justify-between px-4 py-3 bg-gradient-to-b from-zinc-950/80 to-transparent text-xs text-gray-400 pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">Variante {variant}</span>
                <span>—</span>
                <span>{VARIANTS.find(v => v.id === variant)?.desc}</span>
              </div>
              <button 
                onClick={() => {
                  const temp = variant;
                  setVariant(0);
                  setTimeout(() => setVariant(temp), 50);
                }}
                className="hover:text-purple-400 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-zinc-800/50 pointer-events-auto"
              >
                Reiniciar
              </button>
            </div>

            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center gap-3 transition-opacity duration-500 group-hover:opacity-0">
              <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center animate-bounce">
                <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm font-light">
                Mueve el ratón o desliza tu dedo en esta área
              </p>
              <span className="text-[10px] text-zinc-600 bg-zinc-900/50 px-2 py-1 rounded-full border border-zinc-800/30">
                Lienzo de trail interactivo
              </span>
            </div>

            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="h-full flex flex-col gap-6 bg-zinc-900/60 backdrop-blur-xl border-l-[1px] border-zinc-800/60 p-6">
          <div>
            <h2 className="text-xs font-light text-white/70 mb-4">Animaciones</h2>
            <div className="relative flex flex-col gap-1">
              <div
                className="absolute rounded-lg bg-white/10 transition-all duration-500 pointer-events-none"
                style={{ ...indicatorStyle, transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              />
              {VARIANTS.map((v, i) => (
                <button
                  key={v.id}
                  ref={el => btnRefs.current[i] = el}
                  onClick={() => setVariant(v.id)}
                  className={`relative w-full text-left px-3 py-2 rounded-lg text-xs font-normal transition-colors duration-300 ${
                    variant === v.id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{v.name}</span>
                    <span className="text-[9px] text-zinc-500">Var {v.id}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-800/60" />

          <div>
            <h3 className="text-xs font-light text-white/70 mb-3">Imágenes</h3>
            <div className="relative grid grid-cols-2 gap-1 bg-zinc-950/60 p-1 rounded-xl border border-zinc-800/50">
              <div
                className="absolute rounded-lg bg-white/10 transition-all duration-500 pointer-events-none"
                style={{ ...catIndicatorStyle, transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              />
              {catKeys.map((key, i) => (
                <button
                  key={key}
                  ref={el => catBtnRefs.current[i] = el}
                  onClick={() => setCategory(key)}
                  className={`relative px-2 py-1.5 rounded-lg text-xs font-normal transition-colors duration-300 ${
                    category === key
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {IMAGE_CATEGORIES[key].name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto text-center text-[10px] text-zinc-600 italic underline underline-offset-4">
            <a href="https://sebas-dev.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
              Creado por Sebastián Vásquez Echavarría
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
