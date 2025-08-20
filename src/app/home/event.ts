
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
    
    ];
  };
  