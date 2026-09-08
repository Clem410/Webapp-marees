export interface Port {
  id: string;
  name: string;
  apiId: string;
}

export const PORTS: Port[] = [
  { 
    id: "la-rochelle", 
    name: "La Rochelle", 
    apiId: "la-rochelle-pallice" 
  },
  { 
    id: "brest", 
    name: "Brest", 
    apiId: "brest" 
  },
  { 
    id: "saint-malo", 
    name: "Saint-Malo", 
    apiId: "saint-malo" 
  },
  { 
    id: "arcachon", 
    name: "Arcachon", 
    apiId: "arcachon-jetee-d-eyrac" 
  },
];