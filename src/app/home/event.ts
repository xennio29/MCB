
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
    ];
  };
  