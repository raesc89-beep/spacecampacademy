import { create } from 'zustand';

export const useShipStore = create((set) => ({
  shipConfig: {
    fuselage: 'fighter', // 'fighter', 'cargo', 'explorer'
    wings: 'delta', // 'delta', 'xwing', 'ring'
    engines: 'ion', // 'ion', 'plasma'
    weapon: 'laser', // 'laser', 'missile', 'none'
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
  setPart: (part, value) => set((state) => {
    const newConfig = { ...state.shipConfig, [part]: value };
    // Recalculate stats based on parts
    let newStats = { ...state.stats };
    
    // Fuselage logic
    if (part === 'fuselage') {
      if (value === 'fighter') { newStats.maneuverability = 90; newStats.shield = 40; newStats.range = 50; }
      if (value === 'cargo') { newStats.maneuverability = 30; newStats.shield = 90; newStats.range = 80; }
      if (value === 'explorer') { newStats.maneuverability = 60; newStats.shield = 60; newStats.range = 100; }
    }
    // Wings logic
    if (part === 'wings') {
      if (value === 'delta') { newStats.maneuverability += 10; }
      if (value === 'xwing') { newStats.maneuverability += 20; newStats.shield -= 10; }
      if (value === 'ring') { newStats.shield += 20; }
    }
    // Weapons logic
    if (part === 'weapon') {
      if (value === 'laser') { newStats.damage = 80; }
      if (value === 'missile') { newStats.damage = 100; }
      if (value === 'none') { newStats.damage = 10; }
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
  }))
}));
