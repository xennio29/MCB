
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
        title: 'CR DC',
        start: '2025-02-15',
        description: 'Championnat régional de DC 2025',
        extendedProps: {
          image: 'assets/img/CRDC_2025.png',
        },
        backgroundColor: 'red',
      },
      {
        title: 'MQL',
        start: '2025-03-15',
        description: 'Main Qualifier Legacy 2025',
        extendedProps: {
          image: 'assets/img/MQL_2025.png',
        },
        backgroundColor: 'red',
      },
      {
        title: '🧙 FNM Legacy',
        start: '2025-04-11',
        description: 'Avril FNM Legacy',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
      {
        title: '☀️ Eternal Sunday',
        start: '2025-04-13',
        description: 'Eternal Sunday Avril 2025, Peasant Vintage et Legacy',
        extendedProps: {
          image: 'assets/img/Eternal_sunday_04.jpg',
        },
        backgroundColor: 'red',
      },
      {
        title: '🧙 FNM Legacy',
        start: '2025-05-23',
        description: 'Mai FNM Legacy',
        extendedProps: {
          image: '',
        },
        backgroundColor: 'red',
      },
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
    ];
  };
  