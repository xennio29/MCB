
export interface Event {
    title: string;
    start: string;
    description: string;
    extendedProps: {
      image: string;
    };
    backgroundColor: string;
  }
  
  export const getEvents = (): Event[] => {
    return [
      {
        title: '🌇 Pauper Morning',
        start: '2025-05-25',
        description: 'Pauper Eternal Morning',
        extendedProps: {
          image: 'assets/img/Eternal_sunday_05.png',
        },
        backgroundColor: 'red',
      },
      {
        title: '🌇 Vintage Morning',
        start: '2025-05-25',
        description: 'Vintage Eternal Morning',
        extendedProps: {
          image: 'assets/img/Eternal_sunday_05.png',
        },
        backgroundColor: 'red',
      },   
      {
        title: '☀️ Eternal Sunday',
        start: '2025-05-25',
        description: 'Eternal Sunday Mai 2025',
        extendedProps: {
          image: 'assets/img/Eternal_sunday_05.png',
        },
        backgroundColor: 'red',
      },      
      {
        title: 'Team TRIO',
        start: '2025-07-04',
        description: 'Team TRIO 2025',
        extendedProps: {
          image: 'assets/img/CDF.png',},
        backgroundColor: 'red',
      },
      {
        title: '🧙 Last Chance Qualifier',
        start: '2025-07-05',
        description: 'Last chance qualifier 2025 pour le Championnat de France',
        extendedProps: {
          image: 'assets/img/CDF.png',
        },
        backgroundColor: 'red',
      },
      {
        title: '☀️ Final du Championnat de France 2025',
        start: '2025-07-06',
        description: 'La finale tant attendue du Championnat de France 2025',
        extendedProps: {
          image: 'assets/img/CDF.jpg',
        },
        backgroundColor: 'red',
      },
      {
        title: '🌇 Pauper Morning',
        start: '2025-08-31',
        description: 'Pauper Eternal Morning',
        extendedProps: {
          image: 'assets/img/aout.png',
        },
        backgroundColor: 'red',
      },
      {
        title: '🌇 Open CDF Legacy',
        start: '2025-08-31',
        description: 'Premier Open CDF Legacy saison 2025/2026',
        extendedProps: {
          image: 'assets/img/aout.png',
        },
        backgroundColor: 'red',
      },
      {
        title: '🧙 FNM Legacy',
        start: '2025-09-12',
        description: 'Septembre FNM Legacy',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🌇 Open CDF Legacy',
        start: '2025-09-28',
        description: 'Open CDF Legacy Septembre saison 2025/2026',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🌇 Open CDF Legacy',
        start: '2025-10-12',
        description: 'Open CDF Legacy octobre saison 2025/2026',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🌇 Win a Biland DC',
        start: '2025-10-12',
        description: 'Win a Biland DC. Prépare toi pour le RelicFest',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🧙 FNM Legacy',
        start: '2025-10-24',
        description: 'Octobre FNM Legacy',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🧙 FNM Legacy',
        start: '2025-11-21',
        description: 'Novembre FNM Legacy',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🌇 Open CDF Legacy',
        start: '2025-11-23',
        description: 'Open CDF Legacy novembre saison 2025/2026',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🎫 Open qualifier regional Pauper',
        start: '2025-11-23',
        description: 'Qualifier Regional Pauper 2025',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🧙 FNM Legacy',
        start: '2025-12-05',
        description: 'Decembre FNM Legacy',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🏆 Final des Masters',
        start: '2025-12-07',
        description: 'Final des Masters 2025',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🌇 Open CDF Legacy',
        start: '2025-12-07',
        description: 'Open CDF Legacy Decembre saison 2025/2026',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🌂 Team Trio LYON',
        start: '2026-01-16',
        description: 'Team Trio Lyon',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🌂 MQL LYON',
        start: '2026-01-17',
        description: 'Main Qualifier Legacy, Main Event',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🌂 Open LYON',
        start: '2026-01-18',
        description: 'Open CDF',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },            
      {
        title: '🌇 Open CDF Legacy',
        start: '2026-01-31',
        description: 'Open CDF Legacy Janvier saison 2025/2026',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🌇 Open CDF Legacy',
        start: '2026-02-01',
        description: 'Open CDF Legacy Janvier saison 2025/2026',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🧙 FNM Legacy',
        start: '2026-02-13',
        description: 'Fevrier FNM Legacy',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },                         
      {
        title: '🎲 Open CDF DC',
        start: '2026-02-28',
        description: 'Open CDF Duel Commander Fevrier saison 2026',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🎲 Championnat Regionnal CDF DC',
        start: '2026-03-01',
        description: 'Championnat Regionnal CDF Duel Commander Fevrier saison 2026',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🧙 FNM Legacy',
        start: '2026-03-13',
        description: 'Mars FNM Legacy',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🌇 Open CDF Legacy',
        start: '2026-03-15',
        description: 'Open CDF Legacy Mars saison 2025/2026',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '👜 MQL Bordeaux',
        start: '2026-03-28',
        description: 'Main Qualifier Legacy, Main Event',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },            
      {
        title: '🌇 Open CDF Legacy',
        start: '2026-04-12',
        description: 'Open CDF Legacy Avril saison 2025/2026',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🧙 FNM Legacy',
        start: '2026-04-24',
        description: 'Avril FNM Legacy',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🚤 MQL CAEN',
        start: '2026-05-02',
        description: 'Main Qualifier Legacy, Main Event',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🚤 Open CAEN',
        start: '2026-05-03',
        description: 'Open CDF',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🏉 Team Trio MCB',
        start: '2026-05-08',
        description: 'Team Trio Lyon',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🏉 MQL MCB',
        start: '2026-05-09',
        description: 'Main Qualifier Legacy, Main Event',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🏉 Open MCB',
        start: '2026-05-10',
        description: 'Open CDF',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '🧙 FNM Legacy',
        start: '2026-05-22',
        description: 'Mai FNM Legacy',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },                                    
    ];
  };
  