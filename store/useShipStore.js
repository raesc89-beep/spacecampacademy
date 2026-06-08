import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useShipStore = create(
  persist(
    (set) => ({
      shipConfig: {
        fuselage: 'fighter', // 'fighter', 'cargo', 'explorer', 'cruiser', 'destroyer', 'stealth', 'carrier'
        wings: 'delta', // 'delta', 'xwing', 'ring', 'heavy', 'sweep', 'vwing', 'scimitar'
        engines: 'ion', // 'ion', 'plasma', 'twin', 'quad', 'pulse', 'warp'
        weapon: 'laser', // 'laser', 'missile', 'none', 'railgun', 'photon', 'torpedo', 'swarm'
        colors: {
          primary: '#1E3A8A', // Blue
          secondary: '#9CA3AF', // Gray
          emissive: '#00FFFF', // Cyan glow
        }
      },
      stats: {
        damage: 80,
        shield: 50,
        range: 60,
        maneuverability: 90
      },
      savedShips: [],
      setPart: (part, value) => set((state) => {
        const newConfig = { ...state.shipConfig, [part]: value };
        // Recalculate stats based on parts
        let newStats = { ...state.stats };
    
    // Fuselage logic
    if (part === 'fuselage') {
      if (value === 'fighter') { newStats.maneuverability = 90; newStats.shield = 40; newStats.range = 50; }
      if (value === 'cargo') { newStats.maneuverability = 30; newStats.shield = 90; newStats.range = 80; }
      if (value === 'explorer') { newStats.maneuverability = 60; newStats.shield = 60; newStats.range = 100; }
      if (value === 'cruiser') { newStats.maneuverability = 20; newStats.shield = 100; newStats.range = 70; newStats.damage = 90; }
      if (value === 'destroyer') { newStats.maneuverability = 40; newStats.shield = 80; newStats.range = 60; newStats.damage = 100; }
      if (value === 'stealth') { newStats.maneuverability = 100; newStats.shield = 20; newStats.range = 40; }
      if (value === 'carrier') { newStats.maneuverability = 10; newStats.shield = 100; newStats.range = 90; }
    }
    // Wings logic
    if (part === 'wings') {
      if (value === 'delta') { newStats.maneuverability += 10; }
      if (value === 'xwing') { newStats.maneuverability += 20; newStats.shield -= 10; }
      if (value === 'ring') { newStats.shield += 20; }
      if (value === 'heavy') { newStats.shield += 30; newStats.maneuverability -= 10; }
      if (value === 'sweep') { newStats.maneuverability += 30; newStats.shield -= 20; }
      if (value === 'vwing') { newStats.maneuverability += 15; newStats.range += 10; }
      if (value === 'scimitar') { newStats.maneuverability += 25; }
    }
    // Weapons logic
    if (part === 'weapon') {
      if (value === 'laser') { newStats.damage = 80; }
      if (value === 'missile') { newStats.damage = 100; }
      if (value === 'none') { newStats.damage = 10; }
      if (value === 'railgun') { newStats.damage = 95; newStats.range += 10; }
      if (value === 'photon') { newStats.damage = 85; newStats.shield += 5; }
      if (value === 'torpedo') { newStats.damage = 100; newStats.maneuverability -= 5; }
      if (value === 'swarm') { newStats.damage = 90; newStats.maneuverability += 5; }
    }
    // Engine logic
    if (part === 'engines') {
      if (value === 'ion') { newStats.maneuverability += 5; }
      if (value === 'plasma') { newStats.maneuverability += 10; }
      if (value === 'twin') { newStats.maneuverability += 15; newStats.range -= 5; }
      if (value === 'quad') { newStats.maneuverability += 20; newStats.range -= 10; }
      if (value === 'pulse') { newStats.maneuverability += 5; newStats.range += 10; }
      if (value === 'warp') { newStats.maneuverability -= 5; newStats.range += 30; }
    }

    // Clamp stats 0-100
    Object.keys(newStats).forEach(k => {
      newStats[k] = Math.max(0, Math.min(100, newStats[k]));
    });

    return { shipConfig: newConfig, stats: newStats };
  }),
      setColor: (layer, color) => set((state) => ({
        shipConfig: {
          ...state.shipConfig,
          colors: {
            ...state.shipConfig.colors,
            [layer]: color
          }
        }
      })),
      saveCurrentShip: (name) => set((state) => {
        const newShip = {
          id: Date.now().toString(),
          name: name || `Nave ${state.savedShips.length + 1}`,
          config: { ...state.shipConfig },
          stats: { ...state.stats },
          date: new Date().toISOString(),
        };
        return { savedShips: [...state.savedShips, newShip] };
      }),
      deleteShip: (id) => set((state) => ({
        savedShips: state.savedShips.filter(s => s.id !== id)
      })),
      loadShip: (id) => set((state) => {
        const ship = state.savedShips.find(s => s.id === id);
        if (ship) {
          return { shipConfig: { ...ship.config }, stats: { ...ship.stats } };
        }
        return state;
      }),
      renameShip: (id, newName) => set((state) => ({
        savedShips: state.savedShips.map(s =>
          s.id === id ? { ...s, name: newName } : s
        )
      }))
    }),
    {
      name: 'space-camp-ship-storage',
      partialize: (state) => ({ savedShips: state.savedShips }),
    }
  )
);
