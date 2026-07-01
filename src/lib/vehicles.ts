/* ─────────────────────────────────────────────────────────────────────────────
   lib/vehicles.ts
   Single source of truth for vehicle data.
   Import this into both /inventory/page.tsx and /inventory/[id]/page.tsx
   ───────────────────────────────────────────────────────────────────────────── */

export interface Vehicle {
  id: number;
  slug: string; // <-- added slug property
  brand: string;
  model: string;
  year: number;
  mileage: number;
  transmission: string;
  fuel: string;
  price: number;
  bodyType: string;
  availability: string;
  image: string | null;
  images?: string[]; // additional gallery images
  chassis: string;
  engineSize: number;
  exteriorColor: string;
  interiorColor: string;
  driveType: string;
  engine: string;
  hasSunroof: boolean;
  seatingCapacity?: number;
  features?: string[];
  description?: string;
}

export const allVehicles: Vehicle[] = [
  {
    id: 1,
    slug: "toyota-land-cruiser-300",
    brand: "Toyota",
    model: "Land Cruiser 300",
    year: 2023,
    mileage: 16000,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 18000000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/537949421_18065065625464881_6680344420159837064_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzcwNDY2NjY5Mjc3NzEzNjg0Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=6943jGku8H4Q7kNvwF4VQId&_nc_oc=Adrs8BHyfsPukilj1YdJX8TATjV0JWDoSBZUPvVU5_it3CSP4wF1URNtd34NwJgoXGI&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=7COww0ZtXTT2g0UiAKKiVw&_nc_ss=7a22e&oh=00_Af_Tj_fKNE7cmCxFEdPla8TGijNXbyhoaypt4sN-sSCDVA&oe=6A4768BC",
    chassis: "V35A-FTS",
    engineSize: 3500,
    exteriorColor: "Midnight Black",
    interiorColor: "Black Leather",
    driveType: "4WD",
    engine: "3.5L V6 Twin-Turbo",
    hasSunroof: true,
    seatingCapacity: 8,
    features: [
      "Adaptive Cruise Control",
      "360 Camera",
      "Heated Seats",
      "Apple CarPlay",
      "Android Auto",
      "Panoramic Roof",
      "Blind Spot Monitoring",
      "Parking Sensors",
      "Ventilated Seats",
      "Multi-Terrain Select",
      "Crawl Control",
      "Head-Up Display",
    ],
    description:
      "The Toyota Land Cruiser 300 Series represents the pinnacle of off-road luxury. Powered by a twin-turbocharged V6 engine delivering exceptional performance across all terrain types, this vehicle combines decades of Land Cruiser heritage with thoroughly modern engineering. Every surface communicates quality, from the premium leather interior to the precision-engineered controls.",
  },
  {
    id: 2,
    slug: "toyota-rav4",
    brand: "Toyota",
    model: "RAV4",
    year: 2019,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 4600000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/731031359_18098884409464881_6329917146646210963_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=MzkyNzU1MzM3Mjg4NDkzMDY1Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjczMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=UWJeQo9OIFgQ7kNvwHucOFQ&_nc_oc=AdqA7zkp1x5BWDPuldgDQo7f7qIM98u6o7BB5-IUV4R_1R7d-JCohNkhZSLnOLlJwd0&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=irL0LFAS2EjhblZYajXBow&_nc_ss=7a22e&oh=00_Af-D_sIz5OXHFOyXggClqO7G4hu6q5l02EbRjy_VyrEZ0A&oe=6A47943F",
    chassis: "MXAA52",
    engineSize: 2000,
    exteriorColor: "Pearl White",
    interiorColor: "Black",
    driveType: "FWD",
    engine: "2.0L 4-Cylinder",
    hasSunroof: false,
    seatingCapacity: 5,
    features: [
      "Apple CarPlay",
      "Android Auto",
      "Parking Sensors",
      "Blind Spot Monitoring",
      "Lane Departure Warning",
      "Pre-Collision System",
    ],
    description:
      "The Toyota RAV4 delivers an ideal combination of versatility and refinement. With zero recorded mileage and a comprehensive safety suite, this example represents exceptional value in the compact SUV segment.",
  },
  {
    id: 3,
    slug: "mazda-cx-5",
    brand: "Mazda",
    model: "CX-5",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 3800000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/730779657_18098934323464881_3501621813302169595_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MzkyNzg4MzE2NzA4MjU4NjU4NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjczMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=brLJBoCPqXIQ7kNvwGUHBdB&_nc_oc=AdqzXQop2kb6QVcaRddkf9vthb_Sw90yvjr1uVp0XmkdqYurz31dEgRCrgRSROvl2Bg&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=DASQm_93lBRfOAQk5XswQA&_nc_ss=7a22e&oh=00_Af_xZyoZQtAN8BaoEq_ThosXcnv49Ifm6py78Yno8yrxXg&oe=6A47960F",
    chassis: "KF2P-326377",
    engineSize: 2200,
    exteriorColor: "Soul Red Crystal",
    interiorColor: "Black",
    driveType: "4WD",
    engine: "2.2L SkyActiv-D Diesel",
    hasSunroof: false,
    seatingCapacity: 5,
    features: [
      "Apple CarPlay",
      "Android Auto",
      "Parking Sensors",
      "Blind Spot Monitoring",
      "360 Camera",
      "Heated Seats",
    ],
    description:
      "Mazda's KODO design language reaches its natural expression in the CX-5. The SkyActiv-D diesel powertrain offers exceptional torque delivery and fuel economy without compromising refinement.",
  },
  {
    id: 4,
    slug: "audi-q5",
    brand: "Audi",
    model: "Q5",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 4300000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/528668951_18063535880464881_3289669644728800362_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=MzY5Mzc4NDU3NzYyNDUzNzg3OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=xqeqR68PO9YQ7kNvwF6xuS6&_nc_oc=AdrTBtGBcQuCRpI3HRxdaSozUNlH_25bXN61VDh2m3d52sLGtf3se8CDEcJ7yx4pF0k&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=7xpQ-grbKypSx9ZplTeWxQ&_nc_ss=7a22e&oh=00_Af_zDbYL9angf5xSwIV_REXyDKaIH4_uCd1BzgIH3hOwiQ&oe=6A47847A",
    chassis: "FYB",
    engineSize: 2000,
    exteriorColor: "Glacier White",
    interiorColor: "Black",
    driveType: "Quattro AWD",
    engine: "2.0L TFSI Turbocharged",
    hasSunroof: true,
    seatingCapacity: 5,
    features: [
      "Quattro AWD",
      "Virtual Cockpit",
      "Apple CarPlay",
      "Android Auto",
      "Heated Seats",
      "Parking Sensors",
      "Blind Spot Monitoring",
      "Adaptive Cruise Control",
    ],
    description:
      "The Audi Q5 defines the premium compact SUV segment with its flawless build quality, quattro all-wheel drive system and the acclaimed MMI infotainment suite.",
  },
  {
    id: 5,
    slug: "audi-q7",
    brand: "Audi",
    model: "Q7",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 11500000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/529002119_18063748313464881_4349924247781516819_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=MzY5NTI0ODk5NDI0NTc3NjA1Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=HLvOUMGxC0oQ7kNvwElziXQ&_nc_oc=AdpOWCgQgPAPJw13JBUKqmbF54JqslcyBhz1vPR4L-v12tqGLtZq6aUxoE6W0zBKohs&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=A2jJTjNvKgnvC0cQ5ShoGA&_nc_ss=7a22e&oh=00_Af8mf_qYLvtb8CTWCOaVcSDKqycyvZ9EPXPU7RBUzYh_Sg&oe=6A479966",
    chassis: "4M",
    engineSize: 3000,
    exteriorColor: "Pearl White",
    interiorColor: "Black",
    driveType: "Quattro AWD",
    engine: "3.0L V6 TFSI",
    hasSunroof: true,
    seatingCapacity: 7,
    features: [
      "Quattro AWD",
      "Virtual Cockpit",
      "Head-Up Display",
      "Massage Seats",
      "Apple CarPlay",
      "Android Auto",
      "Panoramic Roof",
      "Adaptive Cruise Control",
      "Night Vision Assist",
      "Air Suspension",
      "360 Camera",
      "Heated Seats",
    ],
    description:
      "The Audi Q7 3.0L V6 TFSI is a statement in restrained opulence. Seven-seat configuration, quattro permanent all-wheel drive, and Audi's air suspension system deliver a ride quality that defies its dimensions.",
  },
  {
    id: 6,
    slug: "mercedes-benz-glc-220d",
    brand: "Mercedes-Benz",
    model: "GLC 220d",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 6300000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.75761-15/496063675_18054305387464881_2750500384869230761_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzYyNzEzMjYwODU1NDUxOTgwNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=iiyi9WH3YYMQ7kNvwFMwiAe&_nc_oc=Adp4OQiy9r4wkz4iflQzxy7zR-tyshNj_IuUQk0-vLc8cAg6JHlhZP5Vq8xW0df9aas&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=WzN7eCxuXTDO_ONnoEpzOA&_nc_ss=7a22e&oh=00_Af94sKhtzqc3ZJwJ6pzfbv4gnWxXtMf7R2_NYVC4R9DDlQ&oe=6A479F00",
    chassis: "X253",
    engineSize: 2000,
    exteriorColor: "Polar White",
    interiorColor: "Black",
    driveType: "4MATIC AWD",
    engine: "2.0L OM654 Turbo Diesel",
    hasSunroof: false,
    seatingCapacity: 5,
    features: [
      "MBUX System",
      "Apple CarPlay",
      "Android Auto",
      "Parking Sensors",
      "360 Camera",
      "Blind Spot Assist",
      "Active Brake Assist",
      "Heated Seats",
    ],
    description:
      "The Mercedes-Benz GLC 220d pairs the renowned OM654 diesel engine with 4MATIC all-wheel drive in a body that has become the defining shape of premium compact SUVs. MBUX infotainment responds naturally to voice commands.",
  },
  {
    id: 8,
    slug: "toyota-hilux",
    brand: "Toyota",
    model: "Hilux",
    year: 2021,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 3100000,
    bodyType: "Pickup",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/717025850_18096407294464881_2338474806698816026_n.jpg?stp=dst-jpg_e35_s1080x1080_tt6&_nc_cat=106&ig_cache_key=MzkxMjU5MzEyOTc4ODc3MjQyMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjczMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=rTW4AEmwgXAQ7kNvwFPPsHe&_nc_oc=AdrdH4nOak0KKH-IeAyczsfDR--SX8NR_MX1B07haRyC7_pjWUOq3SaMtGCp1C8HIMM&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=MY_I_sjh8i1rK8hV8RpsrA&_nc_ss=7a22e&oh=00_Af8AQ-byqNddyotLgv8dIBBKQdjUKtIOVDIphobI8jFWEA&oe=6A47931B",
    chassis: "GUN125-3923208",
    engineSize: 2400,
    exteriorColor: "Midnight Black",
    interiorColor: "Black",
    driveType: "4WD",
    engine: "2.4L 2GD-FTV Turbo Diesel",
    hasSunroof: false,
    seatingCapacity: 5,
    features: [
      "Apple CarPlay",
      "Android Auto",
      "Parking Sensors",
      "Differential Lock",
      "Multi-Terrain Select",
      "Traction Control",
    ],
    description:
      "The Toyota Hilux has earned its legendary reputation across the world's harshest environments. This 2021 example with automatic transmission brings refined daily driving to a platform built for genuine capability.",
  },
  {
    id: 10,
    slug: "mercedes-benz-gle-400d",
    brand: "Mercedes-Benz",
    model: "GLE 400d",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 10500000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/703157652_18094403564464881_8346467969122777831_n.jpg?stp=dst-jpg_e35_s320x320_tt6&_nc_cat=108&ig_cache_key=MzkwMDQ1MzAxNjIzMzM1NDUyOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMzA3Mi5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=wNdS1vJJ2uoQ7kNvwGzyO7n&_nc_oc=AdqgbllJRhxZuoX4xGOvcQvZNQYxd1pfwmU3TqtribxINy6wmKRdFdg4VDZ0YI1mAv4&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=MY_I_sjh8i1rK8hV8RpsrA&_nc_ss=7a22e&oh=00_Af8VnurgunSey9vrr6j388teLfrX7hc1ZJOZNbJRNNJdIQ&oe=6A4768A8",
    chassis: "W167",
    engineSize: 3000,
    exteriorColor: "Obsidian Black",
    interiorColor: "Black",
    driveType: "4MATIC AWD",
    engine: "3.0L OM656 Diesel",
    hasSunroof: true,
    seatingCapacity: 7,
    features: [
      "MBUX System",
      "Head-Up Display",
      "Burmester Sound",
      "Massage Seats",
      "Panoramic Roof",
      "Air Suspension",
      "360 Camera",
      "Adaptive Cruise Control",
      "Heated Seats",
      "Ventilated Seats",
      "Apple CarPlay",
      "Android Auto",
    ],
    description:
      "The Mercedes-Benz GLE 400d represents the full expression of the GLE's engineering ambitions. The 3.0L inline-six diesel produces 330hp and 700Nm of torque, paired with 4MATIC+ all-wheel drive and the E-Active Body Control suspension.",
  },
  {
    id: 15,
    slug: "bmw-x5-xdrive30d",
    brand: "BMW",
    model: "X5 xDrive30d",
    year: 2019,
    mileage: 55000,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 10000000,
    bodyType: "SUV",
    availability: "Reserved",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782695858/Wheelsage_bsvwzk.jpg",
    chassis: "G05",
    engineSize: 3000,
    exteriorColor: "Black Sapphire",
    interiorColor: "Black",
    driveType: "xDrive AWD",
    engine: "3.0L Diesel",
    hasSunroof: true,
    seatingCapacity: 5,
    features: [
      "xDrive AWD",
      "iDrive 7",
      "Apple CarPlay",
      "Panoramic Roof",
      "Heated Seats",
      "Adaptive Cruise Control",
      "Parking Sensors",
      "360 Camera",
    ],
    description:
      "The BMW X5 xDrive30d combines sport and luxury in a package that remains unmatched in the segment. The 3.0L diesel six-cylinder delivers effortless performance while maintaining impressive efficiency.",
  },
  {
    id: 16,
    slug: "range-rover-sport-vogue",
    brand: "Range Rover",
    model: "Sport Vogue",
    year: 2019,
    mileage: 42000,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 8450000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782696193/11329436555446819_rrb3ym.jpg",
    chassis: "L494",
    engineSize: 3000,
    exteriorColor: "Santorini Black",
    interiorColor: "Black",
    driveType: "AWD",
    engine: "3.0L V6 Diesel",
    hasSunroof: true,
    seatingCapacity: 5,
    features: [
      "Terrain Response 2",
      "Meridian Sound",
      "Heated Seats",
      "Apple CarPlay",
      "Android Auto",
      "360 Camera",
      "Adaptive Cruise Control",
      "Blind Spot Monitoring",
      "Air Suspension",
      "Panoramic Roof",
    ],
    description:
      "The Range Rover Sport combines the capability of a genuine off-road vehicle with the refinement of a luxury saloon. Santorini Black exterior, premium black interior, and the full suite of driver assistance technologies.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Recommendation algorithm — weighted scoring.
   Never returns the source vehicle itself.
   Returns up to `limit` vehicles sorted by relevance score descending.
   ───────────────────────────────────────────────────────────────────────────── */
export function getRecommendations(source: Vehicle, limit = 4): Vehicle[] {
  const priceRange = source.price * 0.4; // ±40% price tolerance

  const scored = allVehicles
    .filter((v) => v.id !== source.id)
    .map((v) => {
      let score = 0;
      if (v.brand === source.brand) score += 40;
      if (v.bodyType === source.bodyType) score += 30;
      if (Math.abs(v.price - source.price) <= priceRange) score += 20;
      if (v.fuel === source.fuel) score += 7;
      if (Math.abs(v.year - source.year) <= 2) score += 3;
      return {vehicle: v, score};
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.vehicle);
}
