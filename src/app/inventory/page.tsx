"use client";
import {useState, useRef, useEffect, useMemo, useCallback} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  MotionValue,
} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import CTABand from "@/components/CTABand";

/* ─── EASING & CONSTANTS ─── */
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const SPRING_SMOOTH = {stiffness: 60, damping: 20, mass: 1};

/* ─── Sliding Buttons ─── */
function SlidingWhiteButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const prefersReduced = usePrefersReducedMotion();
  return (
    <motion.a
      href={href}
      className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-medium tracking-wide overflow-hidden rounded-lg group"
      style={{backgroundColor: "#FFFFFF"}}
      whileHover={prefersReduced ? {} : {scale: 1.02}}
      whileTap={prefersReduced ? {} : {scale: 0.98}}
    >
      <motion.span
        className="absolute inset-0 bg-black"
        initial={{y: "100%"}}
        whileHover={{y: "0%"}}
        transition={{duration: 0.35, ease: [0.19, 1, 0.22, 1]}}
      />
      <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
        {children}
      </span>
      <motion.span
        className="relative z-10 ml-2 text-black group-hover:text-white transition-colors duration-300"
        whileHover={{x: 4}}
        transition={{duration: 0.25}}
      >
        →
      </motion.span>
    </motion.a>
  );
}

function SlidingOutlineButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const prefersReduced = usePrefersReducedMotion();
  return (
    <motion.a
      href={href}
      className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-medium tracking-wide overflow-hidden rounded-lg group border border-white"
      whileHover={prefersReduced ? {} : {scale: 1.02}}
      whileTap={prefersReduced ? {} : {scale: 0.98}}
    >
      <motion.span
        className="absolute inset-0 bg-white"
        initial={{y: "100%"}}
        whileHover={{y: "0%"}}
        transition={{duration: 0.35, ease: [0.19, 1, 0.22, 1]}}
      />
      <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
        {children}
      </span>
      <motion.span
        className="relative z-10 ml-2 text-white group-hover:text-black transition-colors duration-300"
        whileHover={{x: 4}}
        transition={{duration: 0.25}}
      >
        →
      </motion.span>
    </motion.a>
  );
}

function SlidingWhiteButtonLg({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const prefersReduced = usePrefersReducedMotion();
  return (
    <motion.a
      href={href}
      className="relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide overflow-hidden rounded-lg group"
      style={{backgroundColor: "#FFFFFF"}}
      whileHover={prefersReduced ? {} : {scale: 1.02}}
      whileTap={prefersReduced ? {} : {scale: 0.98}}
    >
      <motion.span
        className="absolute inset-0 bg-black"
        initial={{y: "100%"}}
        whileHover={{y: "0%"}}
        transition={{duration: 0.35, ease: [0.19, 1, 0.22, 1]}}
      />
      <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
        {children}
      </span>
      <motion.span
        className="relative z-10 ml-2 text-black group-hover:text-white transition-colors duration-300"
        whileHover={{x: 4}}
        transition={{duration: 0.25}}
      >
        →
      </motion.span>
    </motion.a>
  );
}

function SlidingOutlineButtonLg({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const prefersReduced = usePrefersReducedMotion();
  return (
    <motion.a
      href={href}
      className="relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide overflow-hidden rounded-lg group border border-white"
      whileHover={prefersReduced ? {} : {scale: 1.02}}
      whileTap={prefersReduced ? {} : {scale: 0.98}}
    >
      <motion.span
        className="absolute inset-0 bg-white"
        initial={{y: "100%"}}
        whileHover={{y: "0%"}}
        transition={{duration: 0.35, ease: [0.19, 1, 0.22, 1]}}
      />
      <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
        {children}
      </span>
      <motion.span
        className="relative z-10 ml-2 text-white group-hover:text-black transition-colors duration-300"
        whileHover={{x: 4}}
        transition={{duration: 0.25}}
      >
        →
      </motion.span>
    </motion.a>
  );
}

/* ─── DATA ─── */
/* ─── ACTUAL KENYAN CAR MARKET DATA (2026) ─── */

const brands = [
  {
    name: "Toyota",
    count: 142, // Adjusted to match dominance in the Kenyan market
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782688129/Toyota_hkrxtu.jpg",
  },
  {
    name: "Subaru",
    count: 64,
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782688087/12033123999369195_sih5sn.jpg",
  },
  {
    name: "Mercedes-Benz",
    count: 38,
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782688147/106467978685115961_ql9qfj.jpg",
  },
  {
    name: "BMW",
    count: 29,
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782688165/333196072453985904_vgqdn0.jpg",
  },
  {
    name: "Range Rover",
    count: 18,
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782688181/Range_afknhs.jpg",
  },
  {
    name: "Audi",
    count: 15,
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782688196/Audi_logo_nvfsvk.jpg",
  },

  {
    name: "Mazda",
    count: 26,
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782696905/Mazda_t9xnua.jpg",
  },
  {
    name: "Honda",
    count: 21,
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782696948/651333164900295143_nantoh.jpg",
  },
  {
    name: "Volvo",
    count: 9,
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782696971/Volvo_Logo___iPhone___Wallpapers_Wallpaper___%D0%92%D0%BE%D0%BB%D1%8C%D0%B2%D0%BE_%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF___%D0%9E%D0%B1%D0%BE%D0%B8_%D0%BD%D0%B0_%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD___%D0%9E%D0%B1%D0%BE%D0%B8_%D0%B4%D0%BB%D1%8F_%D1%81%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%D0%B0_drshdu.jpg",
  },
  {
    name: "Mini",
    count: 4,
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782688308/mini_logo.jpg",
  },
];

const allVehicles = [
  {
    id: 1,
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
    isNewArrival: true,
    isPriceReduced: true,
    isPopular: true,
    isLimitedAvailability: true,
    chassis: "V35A-FTS",
    engineSize: 3500,
    exteriorColor: "Black",
    interiorColor: "Black",
    driveType: "4WD",
    engine: "3.5L V6 Twin-Turbo",
    hasSunroof: true,
  },
  {
    id: 2,
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
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "MXAA52",
    engineSize: 2000,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "FWD",
    engine: "2.0L 4-Cylinder",
    hasSunroof: false,
  },
  {
    id: 3,
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
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "KF2P-326377",
    engineSize: 2200,
    exteriorColor: "Blue",
    interiorColor: "Black",
    driveType: "4WD",
    engine: "2.2L SkyActiv-D Diesel",
    hasSunroof: false,
  },
  {
    id: 4,
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
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "FYB",
    engineSize: 2000,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "Quattro AWD",
    engine: "2.0L TFSI Turbocharged",
    hasSunroof: true,
  },
  {
    id: 5,
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
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    exteriorColor: "Pearl White",
    chassis: "4M",
    engineSize: 3000,
    interiorColor: "Black",
    driveType: "Quattro AWD",
    engine: "3.0L V6 TFSI",
    hasSunroof: true,
  },
  {
    id: 6,
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
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    driveType: "4MATIC AWD",
    engine: "2.0L OM654 Turbo Diesel",
    hasSunroof: false,
    chassis: "X253",
    engineSize: 2000,
    exteriorColor: "White",
    interiorColor: "Black",
  },
  {
    id: 7,
    brand: "Volkswagen",
    model: "Arteon",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 3990000,
    bodyType: "Fastback",
    availability: "In Stock",
    image: null,
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: false,
    isLimitedAvailability: false,
    driveType: "4Motion AWD",
    chassis: "3H7",
    engineSize: 2000,
    exteriorColor: "Black",
    interiorColor: "Black",
    engine: "2.0L TSI Turbocharged",
    hasSunroof: true,
  },
  {
    id: 8,
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
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "GUN125-3923208",
    engineSize: 2400,
    exteriorColor: "Black",
    interiorColor: "Black",
    driveType: "4WD",
    engine: "2.4L 2GD-FTV Turbo Diesel",
    hasSunroof: false,
  },
  {
    id: 9,
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
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/713443347_18096322910464881_7087498110974836316_n.jpg?stp=dst-jpg_e35_s480x480_tt6&_nc_cat=103&ig_cache_key=MzkxMjA0Nzg0MDczMjUzNDM4MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjczMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=RYeftCtd3WQQ7kNvwET84U6&_nc_oc=Ado4s9J4lfLn4uU1_Hfj7zdVP6lNmUtTOgYF-na8XgQePggvDKLaTEHMivfi-ImrXBg&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=MY_I_sjh8i1rK8hV8RpsrA&_nc_ss=7a22e&oh=00_Af-LxCe2Vn8t88ncBiD0mw9OQkWLJz_y7ES6LAhKaDAWtQ&oe=6A4797BF",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "MXAA52-005975",
    engineSize: 1990,
    exteriorColor: "Silver",
    interiorColor: "Off White",
    driveType: "FWD",
    engine: "2.0L 4-Cylinder",
    hasSunroof: false,
  },
  {
    id: 10,
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
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    engineSize: 3000,
    driveType: "4MATIC AWD",
    chassis: "W167",
    exteriorColor: "Black",
    interiorColor: "Black",
    engine: "3.0L OM656 Diesel",
    hasSunroof: true,
  },
  {
    id: 11,
    brand: "Subaru",
    model: "Forester SKE Advance (e-BOXER)",
    year: 2022,
    mileage: 71800,
    transmission: "CVT",
    fuel: "Hybrid/Petrol",
    price: 4110000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.75761-15/468184006_18037725590464881_1097275392505093260_n.jpg?stp=dst-jpg_e35_s1080x1080_tt6&_nc_cat=101&ig_cache_key=MzUxMDM3NzAxOTM0MzAxNzcwNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=naf3KXFrqMMQ7kNvwHy1gDw&_nc_oc=AdoSL9Su0eZfFq6S7TewthrFdZ5l03iFCGff2ohG7HY0VeJILbs7LabR8bj7M-POGzo&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=RP0GV0JEGfdV5JgrZEpB-Q&_nc_ss=7a22e&oh=00_Af-s2aURikzTC0tZ5NT3JAl3lfw0Fo4HiYUDjEQL3EXRQA&oe=6A47A805",
    isNewArrival: true,
    isPriceReduced: true,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "SKE",
    engineSize: 1995,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "Symmetrical AWD",
    engine: "2.0L e-BOXER Hybrid",
    hasSunroof: true,
  },
  {
    id: 33,
    brand: "Subaru",
    model: "Forester X-BREAK",
    year: 2022,
    mileage: 0,
    transmission: "CVT",
    fuel: "Petrol",
    price: 4150000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.75761-15/465759405_18035702240464881_4101843576014520250_n.jpg?stp=dst-jpg_e35_s720x720_tt6&_nc_cat=106&ig_cache_key=MzQ5NjczODIzNTkzMDA0MDI0MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=7cQVT81-8R0Q7kNvwHwQ-D-&_nc_oc=AdrKGQvxzb6FhwOYl8L1Vnv7ujPdLmhnqcQ1zvADZDH6ioMCbwiMyFCnV0Zf9YpG0VM&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=RP0GV0JEGfdV5JgrZEpB-Q&_nc_ss=7a22e&oh=00_Af8npIMXW6iCfAJtWAzaebwHDPhz0TuWmaSgaQuG92ddyQ&oe=6A477226", // Replace with actual image URL from Ahsan Motors
    isNewArrival: true,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "SKE",
    engineSize: 1995,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "Symmetrical AWD",
    engine: "2.0L 4-Cylinder Boxer",
    hasSunroof: true,
  },
  {
    id: 12,
    brand: "Toyota",
    model: "Land Cruiser Prado TX",
    year: 2019,
    mileage: 62000,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 6000000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.75761-15/491417500_18052761086464881_4854774698729746219_n.jpg?stp=dst-jpg_e35_s320x320_tt6&_nc_cat=111&ig_cache_key=MzYxNTUxMDc2Njc1NjgxNTU3MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=elozsVeeRmMQ7kNvwEm7wNI&_nc_oc=Ado0BdrrB20THGHI5gwqIECKiE2nzhWkMBfmYSramlf_fYWvTifeIIrUwPkrHhkQNi8&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=SSRa83tUJkW-HX8-FjXS8Q&_nc_ss=7a22e&oh=00_Af_VfbRyKxDnmep6C0VrtzijUh1kxPOy_HRCsFY2WZrhaw&oe=6A476F0D",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "TRJ150W",
    engineSize: 2700,
    exteriorColor: "Metallic Black",
    interiorColor: "Black and Beige",
    driveType: "4WD",
    engine: "2.7L 2TR-FE Petrol",
    hasSunroof: true,
  },
  {
    id: 13,
    brand: "Toyota",
    model: "Vitz",
    year: 2019,
    mileage: 65000,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 1350000,
    bodyType: "Hatchback",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "NCP131",
    engineSize: 1300,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "FWD",
    engine: "1.3L 4-Cylinder",
    hasSunroof: false,
  },
  {
    id: 14,
    brand: "Mercedes-Benz",
    model: "C200 Avantgarde",
    year: 2019,
    mileage: 48000,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 4350000,
    bodyType: "Sedan",
    availability: "In Stock",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782695540/2015_MERCEDES_BENZ_C200_W205__Sunroof_vvqkkq.jpg",
    isNewArrival: true,
    isPriceReduced: false,
    isPopular: false,
    isLimitedAvailability: false,
    chassis: "W205",
    engineSize: 2000,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "RWD",
    engine: "2.0L Turbocharged",
    hasSunroof: true,
  },
  {
    id: 15,
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
    isNewArrival: false,
    isPriceReduced: true,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "G05",
    engineSize: 3000,
    exteriorColor: "Black",
    interiorColor: "Black",
    driveType: "xDrive AWD",
    engine: "3.0L Diesel",
    hasSunroof: true,
  },
  {
    id: 16,
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
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: true,
    chassis: "L494",
    engineSize: 3000,
    exteriorColor: "Black",
    interiorColor: "Black",
    driveType: "AWD",
    engine: "3.0L V6 Diesel",
    hasSunroof: true,
  },
  {
    id: 34,
    brand: "Range Rover",
    model: "Velar",
    year: 2019,
    mileage: 72000,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 8500000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/641746641_18084597017464881_1247834999070986739_n.jpg?stp=dst-jpg_e35_s240x240_tt6&_nc_cat=107&ig_cache_key=MzgzODc4MjA4NDY0NzUwOTcyNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=3VMZKyV5-t8Q7kNvwEP_HLu&_nc_oc=Ado7EVKqJ_XbpQYARbhYFbGxIVzXZVsC-i-4fUDVYHeDxsRRS7JTswaR_qym5AFsSuE&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=hS4EumSRZ4-5vvink-9gTw&_nc_ss=7a22e&oh=00_Af-Arcc6OBbk5l02VhGWc2x31CJd736FJWTpKRg5sF9xeg&oe=6A477ADA", // Replace with actual image URL from the dealer
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "L560",
    engineSize: 2000,
    exteriorColor: "Black",
    interiorColor: "Brown",
    driveType: "4WD",
    engine: "2.0L Ingenium Turbo Diesel (D180)",
    hasSunroof: false,
  },

  {
    id: 20,
    brand: "Mazda",
    model: "CX-8",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 4500000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782696417/MAZDA_CX-8_yliwmr.jpg",
    isNewArrival: true,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "KG",
    engineSize: 2200,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "FWD",
    engine: "2.2L SkyActiv-D Diesel",
    hasSunroof: false,
  },
  {
    id: 21,
    brand: "Honda",
    model: "Shuttle Hybrid",
    year: 2019,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Hybrid/Petrol",
    price: 2000000,
    bodyType: "Station Wagon",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/631834356_18083492786464881_55198036545223361_n.jpg",
    isNewArrival: true,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "GP",
    engineSize: 1500,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "FWD",
    engine: "1.5L i-MMD Hybrid",
    hasSunroof: false,
  },
  {
    id: 22,
    brand: "Toyota",
    model: "Raize",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 2320000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/631637824_18083338295464881_280254976165568756_n.jpg?stp=dst-jpg_e35_p320x320_tt6&_nc_cat=106&ig_cache_key=MzgyOTU5ODE3NzE0MjI4NzkzNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=0XyL_SkdrhMQ7kNvwHDutpy&_nc_oc=AdrxA-_09D5GQbu2LnU7La2enbr8eysrEJ9YK7_5inOOHJhKH1CJiTrgd3aCX8XzZ0w&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=hS4EumSRZ4-5vvink-9gTw&_nc_ss=7a22e&oh=00_Af-ibfs3WuYsr7f4JsPi2drvUVLSmP31BSvWze-9-aRf4Q&oe=6A477CBA",
    isNewArrival: true,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "A201",
    engineSize: 1000,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "FWD",
    engine: "1.0L Turbo",
    hasSunroof: false,
  },
  {
    id: 23,
    brand: "Honda",
    model: "Vezel Hybrid",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Hybrid/Petrol",
    price: 2800000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/616834525_18080957795464881_3998932957510543938_n.jpg",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "RU",
    engineSize: 1500,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "FWD",
    engine: "1.5L i-MMD Hybrid",
    hasSunroof: false,
  },
  {
    id: 24,
    brand: "Mini",
    model: "Cooper Clubman",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 3500000,
    bodyType: "Station Wagon",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/611816688_18080042060464881_7066982466629832972_n.jpg",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: false,
    isLimitedAvailability: false,
    chassis: "F54",
    engineSize: 2000,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "FWD",
    engine: "2.0L 4-Cylinder",
    hasSunroof: false,
  },
  {
    id: 25,
    brand: "Mercedes-Benz",
    model: "C200",
    year: 2018,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 3800000,
    bodyType: "Sedan",
    availability: "In Stock",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782695604/2015_MERCEDES_BENZ_C200_W205__Sunroof_1_kh6ff3.jpg",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "W205",
    engineSize: 2000,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "RWD",
    engine: "2.0L Turbocharged",
    hasSunroof: true,
  },
  {
    id: 26,
    brand: "Volvo",
    model: "XC90",
    year: 2018,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 5900000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/621435516_18081952994464881_1182946661155536688_n.jpg?stp=dst-jpg_e35_p320x320_tt6&_nc_cat=103&ig_cache_key=MzgxODk0NDM1MDkwMjU5NzY1NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=WAECla_5T3QQ7kNvwG34Bbj&_nc_oc=Adq9-ssl8wbBUlzH0L49NDQrLIXNG572I0NMKlnXXBEHLN5wfMEbFRqccVrnbanl1wk&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=gDBKGdTVhNfsQlvv3gB4aQ&_nc_ss=7a22e&oh=00_Af88i9RPm06ZniHNf2qu1rNz8xrGabSwy-Lm6EGpCeu7AQ&oe=6A4782B7",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "XC90",
    engineSize: 2000,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "AWD",
    engine: "2.0L Twin-Charged",
    hasSunroof: true,
  },
  {
    id: 27,
    brand: "Toyota",
    model: "Hiace",
    year: 2018,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 3800000,
    bodyType: "Van",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/581620102_18074607770464881_8001195159720769703_n.jpg?stp=dst-jpg_e35_s480x480_tt6&_nc_cat=104&ig_cache_key=Mzc2NDk4MTE2NDA3MjAxNTI5Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=OyeN1kCM3xAQ7kNvwFZpKrs&_nc_oc=AdqiklW00sKwWArdu8t-IDhta_AhvjdetuFmdl8ONfHSv13OxAbrBVU-w1W70R2RSE4&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=6S1olOZyyIvYjh3GXzpJYg&_nc_ss=7a22e&oh=00_Af8g4hiTbb_j1kMzTTzpdOyTUELz4t08HJ3pN2ryLAnVDw&oe=6A477AB8",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "TRH200-0279660",
    engineSize: 2800,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "RWD",
    engine: "2.8L 1GD-FTV Diesel",
    hasSunroof: false,
  },
  {
    id: 28,
    brand: "Toyota",
    model: "Sienta",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 1850000,
    bodyType: "MPV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.75761-15/474564611_18043710590464881_506013724526650522_n.jpg?stp=dst-jpg_e35_s720x720_tt6&_nc_cat=107&ig_cache_key=MzU1MDI3NDE3MTUyNzI3OTA4Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=DfBecufDqCYQ7kNvwHWwRBA&_nc_oc=AdogB2M0fuSKUHNromDfftk3i4R27LklJHkP_jLcWFJaDQeljC7Bm7oflf2bAUh0Nko&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=Zk7BPZtQ4EgT8hz3FJKf_w&_nc_ss=7a22e&oh=00_Af88jeuFe8eh6pRZ0Kav44WFIFA2rqFf-rZuECHNgzVaYA&oe=6A478AF9",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "NHP170",
    engineSize: 1500,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "FWD",
    engine: "1.5L 4-Cylinder",
    hasSunroof: false,
  },
  {
    id: 29,
    brand: "Mercedes-Benz",
    model: "GLC 250 4MATIC",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 6080000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782695689/Mercedes-Benz_GLC_Coupe_makes_its_Malaysian_debut_-_single_GLC_250_4Matic_variant_RM428_888_rc7hzo.jpg",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    driveType: "4MATIC AWD",
    chassis: "X253",
    engineSize: 2000,
    exteriorColor: "White",
    interiorColor: "Black",
    engine: "2.0L Turbocharged",
    hasSunroof: true,
  },
  {
    id: 30,
    brand: "Mazda",
    model: "Carol",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 740000,
    bodyType: "Hatchback",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.75761-15/468666757_18038057813464881_4364955005024391563_n.jpg?stp=dst-jpg_e35_s640x640_sh2.08_tt6&_nc_cat=104&ig_cache_key=MzUxMjU4MDM2ODQ3MDc2ODMzNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=WkK7YDC7Le4Q7kNvwEuRpT1&_nc_oc=AdphQQrEoyPK0u-4qnCQNw9fsVMdwZLQ-DuG7YDl-Q54eRHAsab1m69DLcsgmQ_RE4c&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=Kmaok44wbes-XHGTA6ssIw&_nc_ss=7a22e&oh=00_Af_Dr7tPbZqUwp9GFP4-uukASUAdTe_VprMhwU48Jor3hg&oe=6A47A60E",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: false,
    isLimitedAvailability: false,
    engineSize: 660,
    chassis: "GF",
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "FWD",
    engine: "660cc 3-Cylinder",
    hasSunroof: false,
  },
  {
    id: 31,
    brand: "Honda",
    model: "Grace",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 1850000,
    bodyType: "Sedan",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t39.30808-6/469334567_18038583644464881_8569455123612778049_n.jpg",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: false,
    isLimitedAvailability: false,
    chassis: "GM4",
    engineSize: 1500,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "FWD",
    engine: "1.5L 4-Cylinder",
    hasSunroof: false,
  },
  {
    id: 32,
    brand: "Mercedes-Benz",
    model: "E200",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 5650000,
    bodyType: "Sedan",
    availability: "In Stock",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782695753/Mercedes-Benz_E-Class_E_200_LWB_2024-_78_5_lakh___Real-life_review_tzmtkv.jpg",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "W213",
    engineSize: 2000,
    exteriorColor: "White",
    interiorColor: "Black",
    driveType: "RWD",
    engine: "2.0L M264 Turbocharged",
    hasSunroof: true,
  },
];

function getModelsForBrand(brand: string) {
  return [
    ...new Set(
      allVehicles.filter((v) => v.brand === brand).map((v) => v.model),
    ),
  ].sort();
}

function AnimatedCounter({
  target,
  suffix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.5});
  const prefersReduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setCount(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, prefersReduced]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── BRAND CARD ─── */
function BrandCard({
  brand,
  isSelected,
  onClick,
  index,
}: {
  brand: (typeof brands)[0];
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLButtonElement>(null);
  const inView = useInView(cardRef, {once: true, amount: 0.2});
  return (
    <motion.button
      ref={cardRef}
      onClick={onClick}
      initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 24}}
      animate={
        inView
          ? {opacity: 1, y: 0}
          : prefersReduced
            ? {opacity: 1}
            : {opacity: 0, y: 24}
      }
      transition={{duration: 0.6, delay: index * 0.07, ease: EASE_OUT_EXPO}}
      className="group relative overflow-hidden rounded-2xl bg-black aspect-[4/5] flex flex-col items-center justify-end p-6 text-center cursor-pointer"
      style={{
        boxShadow: isSelected
          ? "0 0 0 1.5px #BCBEC0, 0 8px 32px rgba(0,0,0,0.6)"
          : "0 4px 24px rgba(0,0,0,0.4)",
      }}
      whileHover={
        prefersReduced
          ? {}
          : {scale: 1.025, boxShadow: "0 12px 40px rgba(0,0,0,0.7)"}
      }
      transition={{duration: 0.35, ease: EASE_OUT_EXPO}}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={brand.image}
          alt={brand.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          whileHover={prefersReduced ? {} : {scale: 1.06}}
          transition={{duration: 0.7, ease: EASE_OUT}}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#BCBEC0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-[#BCBEC0]/20 group-hover:bg-[#BCBEC0]/50 transition-colors duration-500" />
      <div className="relative z-10 flex flex-col items-center">
        <motion.span
          className="font-mono text-3xl text-[#BCBEC0] mb-1 tabular-nums"
          initial={{opacity: 0}}
          animate={inView ? {opacity: 1} : {}}
          transition={{delay: index * 0.07 + 0.3, duration: 0.5}}
        >
          {brand.count}
        </motion.span>
        <h3 className="text-lg font-display text-white mb-0.5 leading-tight">
          {brand.name}
        </h3>
        <p className="text-[11px] text-[#BCBEC0]/50 tracking-wide">
          vehicles available
        </p>
      </div>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#BCBEC0] flex items-center justify-center text-black text-xs font-bold"
            initial={{scale: 0, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0, opacity: 0}}
            transition={{type: "spring", stiffness: 400, damping: 22}}
          >
            ✓
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.button>
  );
}

/* ─── MODEL SELECTOR ─── */
function ModelSelector({
  brand,
  selectedModel,
  onSelectModel,
}: {
  brand: string;
  selectedModel: string | null;
  onSelectModel: (m: string | null) => void;
}) {
  const models = useMemo(() => getModelsForBrand(brand), [brand]);
  return (
    <motion.div
      initial={{opacity: 0, y: -8}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -8}}
      transition={{duration: 0.3}}
      className="flex flex-wrap gap-3 justify-center py-6"
    >
      <button
        onClick={() => onSelectModel(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${!selectedModel ? "bg-[#BCBEC0] text-black shadow-md" : "bg-black border border-[#BCBEC0]/30 text-[#BCBEC0] hover:bg-black/80"}`}
      >
        All Models
      </button>
      {models.map((m) => (
        <button
          key={m}
          onClick={() => onSelectModel(m)}
          className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${selectedModel === m ? "bg-[#BCBEC0] text-black shadow-md" : "bg-black border border-[#BCBEC0]/30 text-[#BCBEC0] hover:bg-black/80"}`}
        >
          {m}
        </button>
      ))}
    </motion.div>
  );
}

/* ─── FILTER BAR ─── */
function FilterBar({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: (f: any) => void;
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const bodyTypes = [
    "Sedan",
    "SUV",
    "Coupe",
    "Convertible",
    "Pickup",
    "Hatchback",
  ];
  const fuels = ["Petrol", "Diesel", "Hybrid", "Electric"];
  const transmissions = ["Automatic", "Manual", "CVT", "PDK", "DSG"];
  return (
    <div className="border-t border-b border-[#BCBEC0]/20 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {bodyTypes.slice(0, 4).map((b) => (
            <button
              key={b}
              onClick={() =>
                setFilters({
                  ...filters,
                  bodyType: filters.bodyType === b ? "" : b,
                })
              }
              className={`px-3 py-1.5 rounded-full text-xs tracking-wide transition-all duration-300 ${filters.bodyType === b ? "bg-[#BCBEC0] text-black shadow-sm" : "bg-black border border-[#BCBEC0]/30 text-[#BCBEC0] hover:bg-black/80"}`}
            >
              {b}
            </button>
          ))}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-3 py-1.5 rounded-full text-xs tracking-wide bg-black border border-[#BCBEC0]/30 text-[#BCBEC0] hover:bg-black/80 underline"
          >
            {showAdvanced ? "Less Filters" : "All Filters"}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#BCBEC0]/40">
            {filters.minPrice ? `KSh ${filters.minPrice}+` : "Any price"}
          </span>
          {Object.values(filters).some((v) => v) && (
            <button
              onClick={() => setFilters({})}
              className="text-xs text-[#BCBEC0] underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
      {showAdvanced && (
        <motion.div
          initial={{height: 0, opacity: 0}}
          animate={{height: "auto", opacity: 1}}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
        >
          <div className="flex gap-2 items-center col-span-2 md:col-span-1">
            <input
              type="number"
              placeholder="Min price"
              value={filters.minPrice || ""}
              onChange={(e) =>
                setFilters({...filters, minPrice: e.target.value})
              }
              className="w-full bg-black border border-[#BCBEC0]/30 rounded-lg px-3 py-2 text-xs text-[#BCBEC0] placeholder-[#BCBEC0]/40"
            />
            <span className="text-[#BCBEC0]/40">–</span>
            <input
              type="number"
              placeholder="Max price"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                setFilters({...filters, maxPrice: e.target.value})
              }
              className="w-full bg-black border border-[#BCBEC0]/30 rounded-lg px-3 py-2 text-xs text-[#BCBEC0] placeholder-[#BCBEC0]/40"
            />
          </div>
          <select
            value={filters.fuel || ""}
            onChange={(e) => setFilters({...filters, fuel: e.target.value})}
            className="bg-black border border-[#BCBEC0]/30 rounded-lg px-3 py-2 text-xs text-[#BCBEC0]"
          >
            <option value="">Fuel Type</option>
            {fuels.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <select
            value={filters.transmission || ""}
            onChange={(e) =>
              setFilters({...filters, transmission: e.target.value})
            }
            className="bg-black border border-[#BCBEC0]/30 rounded-lg px-3 py-2 text-xs text-[#BCBEC0]"
          >
            <option value="">Transmission</option>
            {transmissions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min year"
            value={filters.minYear || ""}
            onChange={(e) => setFilters({...filters, minYear: e.target.value})}
            className="bg-black border border-[#BCBEC0]/30 rounded-lg px-3 py-2 text-xs text-[#BCBEC0]"
          />
          <select
            value={filters.availability || ""}
            onChange={(e) =>
              setFilters({...filters, availability: e.target.value})
            }
            className="bg-black border border-[#BCBEC0]/30 rounded-lg px-3 py-2 text-xs text-[#BCBEC0]"
          >
            <option value="">Availability</option>
            <option value="In Stock">In Stock</option>
            <option value="Reserved">Reserved</option>
            <option value="Sold">Sold</option>
          </select>
        </motion.div>
      )}
    </div>
  );
}

/* ─── VEHICLE CARD ─── */
function VehicleCard({
  vehicle,
  onSave,
  saved,
  index = 0,
}: {
  vehicle: (typeof allVehicles)[0];
  onSave: () => void;
  saved: boolean;
  index?: number;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, {once: true, amount: 0.1});
  return (
    <motion.div
      ref={cardRef}
      layout
      initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 28}}
      animate={
        inView
          ? {opacity: 1, y: 0}
          : prefersReduced
            ? {opacity: 1}
            : {opacity: 0, y: 28}
      }
      exit={{opacity: 0, scale: 0.97}}
      transition={{
        duration: 0.55,
        delay: prefersReduced ? 0 : (index % 3) * 0.08,
        ease: EASE_OUT_EXPO,
      }}
      className="group relative bg-black rounded-2xl overflow-hidden flex flex-col"
      style={{boxShadow: "0 4px 24px rgba(0,0,0,0.5)"}}
      whileHover={
        prefersReduced ? {} : {y: -3, boxShadow: "0 16px 48px rgba(0,0,0,0.7)"}
      }
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <motion.img
          src={vehicle.image}
          alt={vehicle.model}
          className="w-full h-full object-cover"
          whileHover={prefersReduced ? {} : {scale: 1.06}}
          transition={{duration: 0.7, ease: EASE_OUT}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {vehicle.isNewArrival && (
            <span className="bg-white/90 backdrop-blur-sm text-black text-[10px] px-2.5 py-0.5 rounded-full font-mono font-medium">
              New Arrival
            </span>
          )}
          {vehicle.isPriceReduced && (
            <span className="bg-[#BCBEC0]/90 backdrop-blur-sm text-black text-[10px] px-2.5 py-0.5 rounded-full font-mono font-medium">
              Price Reduced
            </span>
          )}
          {vehicle.isLimitedAvailability && (
            <span className="bg-white/60 backdrop-blur-sm text-black text-[10px] px-2.5 py-0.5 rounded-full font-mono font-medium">
              Limited
            </span>
          )}
        </div>
        <button
          onClick={onSave}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-sm hover:bg-white/80 hover:text-black transition-all duration-300"
          aria-label={saved ? "Remove from saved" : "Save vehicle"}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-display text-white leading-tight">
            {vehicle.brand}{" "}
            <span className="text-[#BCBEC0]/80">{vehicle.model}</span>
          </h3>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ml-2 font-mono ${vehicle.availability === "In Stock" ? "bg-white/15 text-white border border-white/20" : "bg-[#BCBEC0]/15 text-[#BCBEC0] border border-[#BCBEC0]/20"}`}
          >
            {vehicle.availability}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[#BCBEC0]/55 mb-5 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#BCBEC0]/50" />
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#BCBEC0]/50" />
            {vehicle.mileage.toLocaleString()} km
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#BCBEC0]/50" />
            {vehicle.transmission}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#BCBEC0]/50" />
            {vehicle.fuel}
          </span>
        </div>
        <div className="mt-auto pt-3 border-t border-[#BCBEC0]/20">
          <p className="text-2xl font-mono text-[#BCBEC0] mb-4 tabular-nums">
            KSh {vehicle.price.toLocaleString()}
          </p>
          <div className="flex flex-wrap gap-2">
            <SlidingWhiteButton href={`/inventory/${vehicle.id}`}>
              View Details
            </SlidingWhiteButton>
            <SlidingOutlineButton
              href={`https://wa.me/254700000000?text=I'm interested in the ${vehicle.brand} ${vehicle.model}`}
            >
              WhatsApp
            </SlidingOutlineButton>
            <SlidingOutlineButton href={`tel:+254700000000`}>
              Call
            </SlidingOutlineButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── FEATURED COLLECTION ─── */
function FeaturedCollection({
  title,
  vehicles,
  savedVehicles,
  onSave,
}: {
  title: string;
  vehicles: typeof allVehicles;
  savedVehicles: number[];
  onSave: (id: number) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.15});
  const prefersReduced = usePrefersReducedMotion();
  return (
    <section
      ref={sectionRef}
      className="max-w-[1440px] mx-auto px-6 md:px-16 py-16"
    >
      <motion.div
        initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 16}}
        animate={inView ? {opacity: 1, y: 0} : {}}
        transition={{duration: 0.6, ease: EASE_OUT_EXPO}}
        className="mb-8 flex items-end justify-between"
      >
        <div>
          <p className="text-[10px] tracking-[0.3em] text-[#BCBEC0] uppercase mb-2 font-mono">
            Collection
          </p>
          <h2 className="font-display text-3xl text-white">{title}</h2>
        </div>
        <div className="h-px flex-1 mx-8 bg-gradient-to-r from-[#BCBEC0]/20 to-transparent" />
        <span className="text-xs text-[#BCBEC0]/40 font-mono shrink-0">
          {vehicles.length} vehicles
        </span>
      </motion.div>
      <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide">
        {vehicles.map((v, i) => (
          <motion.div
            key={v.id}
            className="snap-start shrink-0 w-[300px] md:w-[340px]"
            initial={prefersReduced ? {opacity: 1} : {opacity: 0, x: 20}}
            animate={inView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.5, delay: i * 0.08, ease: EASE_OUT_EXPO}}
          >
            <VehicleCard
              vehicle={v}
              saved={savedVehicles.includes(v.id)}
              onSave={() => onSave(v.id)}
              index={i}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── FINANCE CTA ─── */
function FinanceCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.25});
  const prefersReduced = usePrefersReducedMotion();
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const springBgY = useSpring(bgY, SPRING_SMOOTH);
  const stats = [
    {value: 500, suffix: "+", label: "Vehicles Financed"},
    {value: 15, suffix: "+", label: "Banking Partners"},
    {value: 48, suffix: "hr", label: "Avg. Approval Time"},
  ];
  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 px-6 md:px-16"
      style={{background: "#000000"}}
    >
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? {} : {y: springBgY}}
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, #BCBEC0 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-[1440px] mx-auto">
        <motion.div
          initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 24}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-mono">
            Financing
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-[0.9] mb-5">
            Own Your Dream Vehicle
          </h2>
          <p className="text-sm text-[#BCBEC0]/55 max-w-md mx-auto mb-10 leading-relaxed">
            Tailored financing solutions for every budget. Get pre-approved in
            minutes, drive away within 48 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <SlidingWhiteButtonLg href="/finance">
              Calculate Financing
            </SlidingWhiteButtonLg>
            <SlidingOutlineButtonLg href="/finance/pre-approval">
              Get Pre-Approved
            </SlidingOutlineButtonLg>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#BCBEC0]/20 rounded-2xl overflow-hidden max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 16}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.1,
                ease: EASE_OUT_EXPO,
              }}
              className="bg-black/80 backdrop-blur-sm px-8 py-8 text-center"
            >
              <p className="text-3xl font-mono text-[#BCBEC0] mb-1 tabular-nums">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-[#BCBEC0]/50 tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-center text-[11px] text-[#BCBEC0]/30 mt-8"
          initial={{opacity: 0}}
          animate={inView ? {opacity: 1} : {}}
          transition={{delay: 0.7}}
        >
          Financing available through KCB, Equity Bank, NCBA, Co-op Bank and
          more
        </motion.p>
      </div>
    </section>
  );
}

/* ─── TRUST SECTION ─── */
const SP_SLOW = {stiffness: 35, damping: 16, mass: 1};
const SP_SMOOTH_TS = {stiffness: 55, damping: 20, mass: 1};
const SP_PRECISE_TS = {stiffness: 90, damping: 24, mass: 1};
const TOTAL_SCREENS = 12;

function trustPointDefs() {
  return [
    {
      title: "150-Point Inspection",
      desc: "Every vehicle passes our rigorous multi-point inspection before listing.",
      icon: "inspection",
    },
    {
      title: "Verified Mileage",
      desc: "Odometer readings independently verified. No hidden surprises.",
      icon: "gauge",
    },
    {
      title: "Full History Reports",
      desc: "Complete ownership, accident, and service history for every vehicle.",
      icon: "document",
    },
    {
      title: "Warranty Options",
      desc: "Extended warranty packages available on all certified vehicles.",
      icon: "shield",
    },
    {
      title: "Flexible Financing",
      desc: "Partnerships with Kenya's leading banks for competitive rates.",
      icon: "finance",
    },
    {
      title: "Nationwide Delivery",
      desc: "Secure delivery to Nairobi, Mombasa, Kisumu and all major cities.",
      icon: "delivery",
    },
  ];
}
const TRUST_POINTS = trustPointDefs();
const NAV_LABELS = [
  "Inspection",
  "Mileage",
  "History",
  "Warranty",
  "Financing",
  "Delivery",
];
const CARD_W = TRUST_POINTS.map((_, i) => ({
  enter: 0.46 + i * 0.062,
  peak: 0.49 + i * 0.062,
  exit: i === 5 ? 0.85 : 0.53 + i * 0.062,
}));

function AutomotiveIcon({type, className}: {type: string; className?: string}) {
  const base = "stroke-[#BCBEC0]/30 fill-none stroke-[0.8]";
  switch (type) {
    case "inspection":
      return (
        <svg viewBox="0 0 200 200" className={className} aria-hidden>
          {Array.from({length: 10}).map((_, i) => (
            <line
              key={`h${i}`}
              x1="10"
              y1={10 + i * 20}
              x2="190"
              y2={10 + i * 20}
              className={base}
            />
          ))}
          {Array.from({length: 10}).map((_, i) => (
            <line
              key={`v${i}`}
              x1={10 + i * 20}
              y1="10"
              x2={10 + i * 20}
              y2="190"
              className={base}
            />
          ))}
          <path
            d="M40 130 L50 110 L80 95 L120 95 L150 110 L160 130 L40 130Z"
            className="stroke-[#BCBEC0]/50 fill-none stroke-[1.2]"
          />
          <circle
            cx="65"
            cy="130"
            r="12"
            className="stroke-[#BCBEC0]/50 fill-none stroke-[1.2]"
          />
          <circle
            cx="135"
            cy="130"
            r="12"
            className="stroke-[#BCBEC0]/50 fill-none stroke-[1.2]"
          />
          <circle
            cx="100"
            cy="112"
            r="20"
            className="stroke-[#BCBEC0]/60 fill-none stroke-[0.8]"
          />
          <line
            x1="100"
            y1="88"
            x2="100"
            y2="100"
            className="stroke-[#BCBEC0]/60 stroke-[0.8]"
          />
          <line
            x1="100"
            y1="124"
            x2="100"
            y2="136"
            className="stroke-[#BCBEC0]/60 stroke-[0.8]"
          />
          <line
            x1="76"
            y1="112"
            x2="88"
            y2="112"
            className="stroke-[#BCBEC0]/60 stroke-[0.8]"
          />
          <line
            x1="112"
            y1="112"
            x2="124"
            y2="112"
            className="stroke-[#BCBEC0]/60 stroke-[0.8]"
          />
          <line x1="30" y1="80" x2="40" y2="80" className={base} />
          <line x1="160" y1="80" x2="170" y2="80" className={base} />
          <line x1="100" y1="150" x2="100" y2="165" className={base} />
        </svg>
      );
    case "gauge":
      return (
        <svg viewBox="0 0 200 200" className={className} aria-hidden>
          <path
            d="M 40 140 A 70 70 0 1 1 160 140"
            className="stroke-[#BCBEC0]/30 fill-none stroke-[1]"
          />
          {Array.from({length: 11}).map((_, i) => {
            const a = -210 + i * 24;
            const r = (Math.PI / 180) * a;
            const x1 = 100 + 60 * Math.cos(r);
            const y1 = 140 + 60 * Math.sin(r);
            const x2 = 100 + 52 * Math.cos(r);
            const y2 = 140 + 52 * Math.sin(r);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="stroke-[#BCBEC0]/40 stroke-[0.8]"
              />
            );
          })}
          <line
            x1="100"
            y1="140"
            x2="128"
            y2="72"
            className="stroke-[#BCBEC0]/70 stroke-[1.5]"
            strokeLinecap="round"
          />
          <circle
            cx="100"
            cy="140"
            r="6"
            className="stroke-[#BCBEC0]/60 fill-none stroke-[1.2]"
          />
          <circle cx="100" cy="140" r="2" className="fill-[#BCBEC0]/50" />
          <text
            x="42"
            y="168"
            className="fill-[#BCBEC0]/30 text-[8px] font-mono"
          >
            0
          </text>
          <text
            x="152"
            y="168"
            className="fill-[#BCBEC0]/30 text-[8px] font-mono"
          >
            300
          </text>
        </svg>
      );
    case "document":
      return (
        <svg viewBox="0 0 200 200" className={className} aria-hidden>
          <rect
            x="65"
            y="52"
            width="80"
            height="100"
            rx="3"
            className="stroke-[#BCBEC0]/15 fill-none stroke-[0.8]"
          />
          <rect
            x="60"
            y="48"
            width="80"
            height="100"
            rx="3"
            className="stroke-[#BCBEC0]/20 fill-none stroke-[0.8]"
          />
          <rect
            x="55"
            y="44"
            width="80"
            height="100"
            rx="3"
            className="stroke-[#BCBEC0]/40 fill-none stroke-[1]"
          />
          <line
            x1="67"
            y1="68"
            x2="123"
            y2="68"
            className="stroke-[#BCBEC0]/40 stroke-[0.8]"
          />
          <line
            x1="67"
            y1="80"
            x2="123"
            y2="80"
            className="stroke-[#BCBEC0]/30 stroke-[0.8]"
          />
          <line
            x1="67"
            y1="92"
            x2="110"
            y2="92"
            className="stroke-[#BCBEC0]/30 stroke-[0.8]"
          />
          <line
            x1="67"
            y1="104"
            x2="120"
            y2="104"
            className="stroke-[#BCBEC0]/30 stroke-[0.8]"
          />
          <line
            x1="67"
            y1="116"
            x2="105"
            y2="116"
            className="stroke-[#BCBEC0]/30 stroke-[0.8]"
          />
          <path
            d="M80 128 L88 136 L108 116"
            className="stroke-[#BCBEC0]/60 fill-none stroke-[1.5]"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 200 200" className={className} aria-hidden>
          <path
            d="M100 30 L160 55 L160 105 C160 145 130 170 100 180 C70 170 40 145 40 105 L40 55 Z"
            className="stroke-[#BCBEC0]/40 fill-none stroke-[1]"
          />
          <path
            d="M100 50 L145 68 L145 108 C145 136 124 155 100 162 C76 155 55 136 55 108 L55 68 Z"
            className="stroke-[#BCBEC0]/20 fill-none stroke-[0.8]"
          />
          <path
            d="M78 105 L92 119 L124 90"
            className="stroke-[#BCBEC0]/60 fill-none stroke-[2]"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[0, 1].map((i) => (
            <path
              key={i}
              d={`M100 ${38 + i * 8} L${152 - i * 5} ${58 + i * 6} L${152 - i * 5} ${108 + i * 5} C${152 - i * 5} ${140 + i * 4} ${126 - i * 3} ${158 + i * 3} 100 ${165 + i * 3}`}
              className="stroke-[#BCBEC0]/10 fill-none stroke-[0.5]"
            />
          ))}
        </svg>
      );
    case "finance":
      return (
        <svg viewBox="0 0 200 200" className={className} aria-hidden>
          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="30" y1={y} x2="175" y2={y} className={base} />
          ))}
          <rect
            x="40"
            y="100"
            width="18"
            height="60"
            className="stroke-[#BCBEC0]/30 fill-[#BCBEC0]/10 stroke-[0.8]"
          />
          <rect
            x="68"
            y="80"
            width="18"
            height="80"
            className="stroke-[#BCBEC0]/40 fill-[#BCBEC0]/15 stroke-[0.8]"
          />
          <rect
            x="96"
            y="60"
            width="18"
            height="100"
            className="stroke-[#BCBEC0]/50 fill-[#BCBEC0]/20 stroke-[0.8]"
          />
          <rect
            x="124"
            y="40"
            width="18"
            height="120"
            className="stroke-[#BCBEC0]/60 fill-[#BCBEC0]/25 stroke-[0.8]"
          />
          <rect
            x="152"
            y="55"
            width="18"
            height="105"
            className="stroke-[#BCBEC0]/45 fill-[#BCBEC0]/18 stroke-[0.8]"
          />
          <polyline
            points="49,100 77,80 105,60 133,40 161,55"
            className="stroke-[#BCBEC0]/60 fill-none stroke-[1.2]"
            strokeLinejoin="round"
          />
          <line
            x1="30"
            y1="160"
            x2="175"
            y2="160"
            className="stroke-[#BCBEC0]/40 stroke-[1]"
          />
          <line
            x1="30"
            y1="30"
            x2="30"
            y2="160"
            className="stroke-[#BCBEC0]/40 stroke-[1]"
          />
        </svg>
      );
    case "delivery":
      return (
        <svg viewBox="0 0 200 200" className={className} aria-hidden>
          <path
            d="M85 30 L110 28 L128 40 L140 55 L145 75 L150 95 L155 115 L148 135 L138 155 L120 165 L105 172 L90 168 L72 158 L58 140 L50 118 L48 95 L52 72 L62 52 L75 38 Z"
            className="stroke-[#BCBEC0]/30 fill-none stroke-[1]"
          />
          <line
            x1="100"
            y1="55"
            x2="100"
            y2="155"
            className="stroke-[#BCBEC0]/25 stroke-[0.8]"
            strokeDasharray="4 4"
          />
          <line
            x1="62"
            y1="100"
            x2="148"
            y2="105"
            className="stroke-[#BCBEC0]/25 stroke-[0.8]"
            strokeDasharray="4 4"
          />
          <line
            x1="70"
            y1="65"
            x2="140"
            y2="148"
            className="stroke-[#BCBEC0]/15 stroke-[0.6]"
            strokeDasharray="3 6"
          />
          {[
            [100, 105],
            [118, 148],
            [72, 88],
            [95, 60],
            [130, 90],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r={i === 0 ? 5 : 3}
                className="stroke-[#BCBEC0]/60 fill-none stroke-[1]"
              />
              <circle cx={cx} cy={cy} r={1.5} className="fill-[#BCBEC0]/50" />
            </g>
          ))}
          <text
            x="106"
            y="108"
            className="fill-[#BCBEC0]/40 font-mono"
            fontSize="7"
          >
            Nairobi
          </text>
        </svg>
      );
    default:
      return null;
  }
}

function BackgroundDepthLayer({progress}: {progress: MotionValue<number>}) {
  const y1 = useSpring(useTransform(progress, [0, 1], ["0%", "-12%"]), SP_SLOW);
  const y2 = useSpring(useTransform(progress, [0, 1], ["0%", "-6%"]), SP_SLOW);
  const op = useTransform(progress, [0, 0.06, 0.9, 1.0], [0, 1, 1, 0]);
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{opacity: op}}
      aria-hidden
    >
      <motion.div className="absolute inset-0" style={{y: y1}}>
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="trust-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#BCBEC0"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#trust-grid)" />
        </svg>
      </motion.div>
      <motion.div className="absolute inset-0" style={{y: y2}}>
        <div className="absolute top-[15%] left-[5%] font-display text-[22vw] text-[#BCBEC0]/[0.025] leading-none select-none">
          TRUST
        </div>
        <div className="absolute bottom-[10%] right-[3%] font-display text-[18vw] text-[#BCBEC0]/[0.02] leading-none select-none">
          EARNED
        </div>
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(255,255,255,0.7) 100%)",
        }}
      />
    </motion.div>
  );
}

function ForegroundAccentLayer({progress}: {progress: MotionValue<number>}) {
  const y = useSpring(useTransform(progress, [0, 1], ["0%", "8%"]), SP_SLOW);
  const op = useTransform(progress, [0, 0.08, 0.88, 1.0], [0, 1, 1, 0]);
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{opacity: op}}
      aria-hidden
    >
      <motion.div className="absolute inset-0" style={{y}}>
        <div className="absolute top-[18%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/15 to-transparent" />
        <div className="absolute bottom-[18%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/15 to-transparent" />
        <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-[#BCBEC0]/20" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-[#BCBEC0]/20" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-[#BCBEC0]/20" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-[#BCBEC0]/20" />
      </motion.div>
    </motion.div>
  );
}

function VerticalNavRail({
  progress,
  activeCard,
}: {
  progress: MotionValue<number>;
  activeCard: number;
}) {
  const op = useTransform(progress, [0.42, 0.48, 0.8, 0.85], [0, 1, 1, 0]);
  return (
    <motion.div
      className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 z-30"
      style={{opacity: op}}
      aria-hidden
    >
      <div className="absolute right-[3px] top-0 bottom-0 w-px bg-[#BCBEC0]/40" />
      <motion.div
        className="absolute right-[3px] top-0 w-px bg-[#BCBEC0] origin-top"
        style={{scaleY: useTransform(progress, [0.46, CARD_W[5].peak], [0, 1])}}
      />
      {NAV_LABELS.map((label, i) => {
        const isActive = activeCard === i;
        const isPast = activeCard > i;
        return (
          <div key={label} className="relative flex items-center gap-2">
            <span
              className={`text-[9px] font-mono tracking-[0.15em] uppercase transition-all duration-500 ${isActive ? "text-black opacity-100" : isPast ? "text-[#BCBEC0]/60 opacity-70" : "text-[#BCBEC0]/30 opacity-50"}`}
            >
              {String(i + 1).padStart(2, "0")} {label}
            </span>
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive ? "bg-[#BCBEC0] scale-150" : isPast ? "bg-[#BCBEC0]/50" : "bg-[#BCBEC0]/30"}`}
            />
          </div>
        );
      })}
    </motion.div>
  );
}

function TrustCardPanel({
  point,
  index,
  total,
  progress,
}: {
  point: (typeof TRUST_POINTS)[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const w = CARD_W[index];
  const isVisible = useTransform(progress, (v) =>
    v >= w.enter && v < w.exit ? 1 : 0,
  );
  return (
    <motion.div
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center px-6 md:px-20 pointer-events-none"
      style={{opacity: isVisible}}
    >
      <div className="w-full max-w-3xl">
        <div
          className="relative bg-white/75 backdrop-blur-md rounded-3xl overflow-hidden"
          style={{
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
            border: "1px solid rgba(188,190,192,0.7)",
          }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/50 to-transparent" />
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-64 flex-shrink-0 flex items-center justify-center p-10 md:p-12 border-b md:border-b-0 md:border-r border-[#BCBEC0]/30">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(188,190,192,0.06) 0%, transparent 70%)",
                }}
              />
              <AutomotiveIcon
                type={point.icon}
                className="w-40 h-40 relative z-10"
              />
            </div>
            <div className="flex-1 p-10 md:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#BCBEC0] uppercase">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px bg-[#BCBEC0]/30">
                  <div
                    className="h-full bg-[#BCBEC0]"
                    style={{width: `${((index + 1) / total) * 100}%`}}
                  />
                </div>
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-black leading-tight mb-5">
                {point.title}
              </h3>
              <p className="text-base text-[#BCBEC0]/65 leading-relaxed max-w-sm">
                {point.desc}
              </p>
              <div className="flex gap-2 mt-10">
                {Array.from({length: total}).map((_, j) => (
                  <div
                    key={j}
                    className={`h-0.5 flex-1 rounded-full transition-colors duration-700 ${j <= index ? "bg-[#BCBEC0]" : "bg-[#BCBEC0]/30"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/20 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

function FinalMosaicTS({progress}: {progress: MotionValue<number>}) {
  const rawOp = useTransform(progress, [0.82, 0.9, 0.96, 1.0], [0, 1, 1, 0]);
  const rawScale = useTransform(
    progress,
    [0.82, 0.9, 0.96, 1.0],
    [0.96, 1, 1, 0.97],
  );
  const opacity = useSpring(rawOp, SP_SMOOTH_TS);
  const scale = useSpring(rawScale, SP_PRECISE_TS);
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 overflow-y-auto pointer-events-none"
      style={{opacity, scale}}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-mono">
            Why Al Husnain
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-black leading-[0.9] mb-4">
            Trusted By Thousands
            <br />
            <span className="text-[#BCBEC0]">Across Kenya</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px bg-[#BCBEC0]/40" />
            <p className="text-sm text-[#BCBEC0]/60">
              Over a decade of serving Kenya's most discerning vehicle buyers.
            </p>
            <div className="w-16 h-px bg-[#BCBEC0]/40" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#BCBEC0]/30 rounded-2xl overflow-hidden mb-8">
          {[
            {value: 12, suffix: "+", label: "Years in Business"},
            {value: 3200, suffix: "+", label: "Vehicles Sold"},
            {value: 98, suffix: "%", label: "Customer Satisfaction"},
            {value: 6, suffix: "", label: "Financing Partners"},
          ].map((m) => (
            <div key={m.label} className="bg-white/90 px-6 py-8 text-center">
              <p className="text-3xl md:text-4xl font-mono text-black mb-1 tabular-nums leading-none">
                {m.value.toLocaleString()}
                {m.suffix}
              </p>
              <p className="text-[11px] text-[#BCBEC0]/55 tracking-wide uppercase font-mono mt-1">
                {m.label}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRUST_POINTS.map((item, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-sm rounded-xl px-5 py-5 border border-[#BCBEC0]/40 flex items-start gap-4"
              style={{boxShadow: "0 2px 12px rgba(0,0,0,0.06)"}}
            >
              <AutomotiveIcon
                type={item.icon}
                className="w-12 h-12 flex-shrink-0 opacity-80"
              />
              <div>
                <h4 className="text-sm font-display text-black mb-1 leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-[#BCBEC0]/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeader({progress}: {progress: MotionValue<number>}) {
  const rawOp = useTransform(progress, [0, 0.05, 0.15, 0.22], [0, 1, 1, 0]);
  const rawScale = useTransform(progress, [0.08, 0.18], [1, 0.6]);
  const rawY = useTransform(progress, [0.08, 0.22], ["0%", "-28%"]);
  const opacity = useSpring(rawOp, SP_SMOOTH_TS);
  const scale = useSpring(rawScale, SP_PRECISE_TS);
  const y = useSpring(rawY, SP_PRECISE_TS);
  return (
    <motion.div
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none px-6"
      style={{opacity, scale, y, transformOrigin: "top center"}}
    >
      <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-mono">
        Why Al Husnain
      </p>
      <h2
        className="font-display text-black leading-[0.9] mb-5"
        style={{fontSize: "clamp(3.5rem, 10vw, 8rem)"}}
      >
        Trust is earned
      </h2>
      <p className="text-base text-[#BCBEC0]/60 max-w-md mx-auto leading-relaxed">
        Over a decade of serving Kenya's most discerning vehicle buyers.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="w-16 h-px bg-[#BCBEC0]/40" />
        <div className="w-2 h-2 rounded-full border border-[#BCBEC0]/40" />
        <div className="w-16 h-px bg-[#BCBEC0]/40" />
      </div>
    </motion.div>
  );
}

function ScrollHintBar({progress}: {progress: MotionValue<number>}) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const hintOp = useTransform(progress, [0, 0.05, 0.14], [1, 1, 0]);
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#BCBEC0]/20">
        <motion.div
          className="h-full bg-gradient-to-r from-[#BCBEC0] to-white origin-left"
          style={{scaleX}}
        />
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{opacity: hintOp}}
        aria-hidden
      >
        <p className="text-[9px] tracking-[0.35em] text-[#BCBEC0]/40 uppercase font-mono">
          Scroll to explore
        </p>
        <motion.div
          className="w-px h-7 bg-gradient-to-b from-[#BCBEC0]/50 to-transparent"
          animate={{scaleY: [1, 0.3, 1]}}
          transition={{repeat: Infinity, duration: 1.6, ease: "easeInOut"}}
        />
      </motion.div>
    </>
  );
}

export function TrustSection() {
  const prefersReduced = usePrefersReducedMotion();
  if (prefersReduced) return <StaticTrustSection />;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 28,
    damping: 24,
    mass: 1.4,
    restDelta: 0.001,
  });
  const [activeCard, setActiveCard] = useState(-1);
  useEffect(() => {
    return progress.on("change", (v) => {
      let active = -1;
      CARD_W.forEach((w, i) => {
        if (v >= w.peak && v < w.exit + 0.06) active = i;
      });
      setActiveCard(active);
    });
  }, [progress]);
  const bgColor = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 0.92, 1.0],
    ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
  );
  return (
    <div
      ref={wrapperRef}
      style={{height: `${TOTAL_SCREENS * 100}vh`}}
      className="relative"
    >
      <motion.div
        className="sticky top-0 h-screen overflow-hidden"
        style={{backgroundColor: bgColor, scale: 1, opacity: 1}}
      >
        <BackgroundDepthLayer progress={progress} />
        <ForegroundAccentLayer progress={progress} />
        <SectionHeader progress={progress} />
        {TRUST_POINTS.map((tp, i) => (
          <TrustCardPanel
            key={tp.title}
            point={tp}
            index={i}
            total={TRUST_POINTS.length}
            progress={progress}
          />
        ))}
        <FinalMosaicTS progress={progress} />
        <VerticalNavRail progress={progress} activeCard={activeCard} />
        <ScrollHintBar progress={progress} />
      </motion.div>
    </div>
  );
}

function StaticTrustSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.15});
  return (
    <section ref={ref} className="bg-white py-24 px-6 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-mono">
            Why Al Husnain
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-black leading-[0.9] mb-4">
            Trust is earned
          </h2>
          <p className="text-sm text-[#BCBEC0]/70 max-w-md mx-auto">
            Over a decade of serving Kenya's most discerning vehicle buyers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_POINTS.map((item, i) => (
            <div
              key={i}
              className="bg-white/60 rounded-xl p-6 border border-[#BCBEC0]/40 flex items-start gap-4"
            >
              <AutomotiveIcon
                type={item.icon}
                className="w-12 h-12 flex-shrink-0"
              />
              <div>
                <h4 className="text-sm font-display text-black mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#BCBEC0]/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.15});
  const prefersReduced = usePrefersReducedMotion();
  const testimonials = [
    {
      quote:
        "The vehicle exceeded every expectation. The handover was seamless — from first inquiry to driving away took less than two days.",
      author: "Khalid A.",
      role: "Business Owner",
      location: "Nairobi",
      vehicle: "Toyota Land Cruiser Prado",
    },
    {
      quote:
        "Al Husnain made financing straightforward. I was driving my dream car within the week. The team is transparent — no pressure, no hidden costs.",
      author: "Layla M.",
      role: "Entrepreneur",
      location: "Mombasa",
      vehicle: "BMW X5",
    },
    {
      quote:
        "Transparent pricing, thorough inspection reports. I have purchased three vehicles through Al Husnain and will continue to be a client.",
      author: "Omar S.",
      role: "Collector",
      location: "Karen, Nairobi",
      vehicle: "Range Rover Sport",
    },
  ];
  return (
    <section ref={ref} className="bg-black py-24 px-6 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 20}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.6, ease: EASE_OUT_EXPO}}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-mono">
            Client Stories
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-[0.9]">
            What our clients say
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 20}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{
                delay: 0.15 + i * 0.12,
                duration: 0.6,
                ease: EASE_OUT_EXPO,
              }}
              className="group relative bg-black rounded-2xl p-8 border border-[#BCBEC0]/20 flex flex-col overflow-hidden"
              style={{boxShadow: "0 4px 32px rgba(0,0,0,0.4)"}}
              whileHover={
                prefersReduced
                  ? {}
                  : {
                      borderColor: "rgba(188,190,192,0.3)",
                      boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
                    }
              }
            >
              <div
                className={`absolute inset-0 z-0 rounded-2xl bg-white transform translate-y-full group-hover:translate-y-0 ${prefersReduced ? "" : "transition-transform duration-500 ease-out"}`}
              />
              <span
                className="absolute top-6 right-7 text-5xl font-serif leading-none select-none z-10 text-[#BCBEC0]/15 group-hover:text-[#BCBEC0]/25 transition-colors duration-500"
                aria-hidden
              >
                "
              </span>
              <p className="relative z-10 text-sm text-[#BCBEC0]/75 leading-relaxed mb-6 flex-1 group-hover:text-black/80 transition-colors duration-500">
                {t.quote}
              </p>
              <div className="relative z-10 h-px bg-[#BCBEC0]/20 mb-5 group-hover:bg-black/10 transition-colors duration-500" />
              <footer className="relative z-10 flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium mb-0.5 text-white group-hover:text-black transition-colors duration-500">
                    {t.author}
                  </p>
                  <p className="text-xs text-[#BCBEC0]/45 group-hover:text-[#BCBEC0]/70 transition-colors duration-500">
                    {t.role}
                  </p>
                  <p className="text-[10px] text-[#BCBEC0]/30 mt-0.5 font-mono group-hover:text-[#BCBEC0]/50 transition-colors duration-500">
                    {t.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono uppercase tracking-wide text-[#BCBEC0]/60 group-hover:text-black transition-colors duration-500">
                    Purchased
                  </p>
                  <p className="text-xs text-[#BCBEC0]/50 mt-0.5 group-hover:text-[#BCBEC0]/70 transition-colors duration-500">
                    {t.vehicle}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE ─── */
export default function InventoryPage() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({});
  const [savedVehicles, setSavedVehicles] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const prefersReduced = usePrefersReducedMotion();

  const brandSectionRef = useRef<HTMLElement>(null);
  const inventoryRef = useRef<HTMLDivElement>(null);
  const inventorySectionRef = useRef<HTMLElement>(null);
  const scrollToInventory = () =>
    inventoryRef.current?.scrollIntoView({behavior: "smooth", block: "start"});

  const filteredVehicles = useMemo(() => {
    let list = allVehicles;
    if (selectedBrand) list = list.filter((v) => v.brand === selectedBrand);
    if (selectedModel) list = list.filter((v) => v.model === selectedModel);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (v) =>
          v.brand.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q),
      );
    }
    if (filters.bodyType)
      list = list.filter((v) => v.bodyType === filters.bodyType);
    if (filters.fuel) list = list.filter((v) => v.fuel === filters.fuel);
    if (filters.transmission)
      list = list.filter((v) => v.transmission === filters.transmission);
    if (filters.availability)
      list = list.filter((v) => v.availability === filters.availability);
    if (filters.minPrice)
      list = list.filter((v) => v.price >= Number(filters.minPrice));
    if (filters.maxPrice)
      list = list.filter((v) => v.price <= Number(filters.maxPrice));
    if (filters.minYear)
      list = list.filter((v) => v.year >= Number(filters.minYear));
    return list;
  }, [selectedBrand, selectedModel, filters, searchQuery]);

  const shouldShowVehicles =
    selectedBrand !== null || searchQuery.trim().length > 0;
  const newArrivals = shouldShowVehicles
    ? filteredVehicles.filter((v) => v.isNewArrival)
    : [];
  const priceReduced = shouldShowVehicles
    ? filteredVehicles.filter((v) => v.isPriceReduced)
    : [];
  const limitedAvailability = shouldShowVehicles
    ? filteredVehicles.filter((v) => v.isLimitedAvailability)
    : [];

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSearchQuery("");
    scrollToInventory();
  };
  const handleSave = (id: number) => {
    setSavedVehicles((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-black transition-colors duration-700">
      <div className="h-[72px]" />
      <section
        ref={brandSectionRef}
        className="max-w-[1440px] mx-auto px-6 md:px-16 py-20"
      >
        <motion.div
          initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
          className="text-center mb-14"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-mono">
            The Collection
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-white leading-[0.9] mb-4">
            Select a car brand
          </h1>
          <p className="text-sm text-[#BCBEC0]/50 max-w-lg mx-auto leading-relaxed">
            Choose a manufacturer to explore our curated inventory of premium
            vehicles, each fully inspected and ready for Kenya's roads.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {brands.map((brand, i) => (
            <BrandCard
              key={brand.name}
              brand={brand}
              isSelected={selectedBrand === brand.name}
              onClick={() => handleBrandClick(brand.name)}
              index={i}
            />
          ))}
        </div>
      </section>
      <div className="max-w-[1440px] mx-auto px-16">
        <div className="h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/20 to-transparent" />
      </div>
      <section
        ref={inventorySectionRef}
        className="max-w-[1440px] mx-auto px-6 md:px-16 py-12"
      >
        <div ref={inventoryRef} />
        <motion.div
          initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.3}}
          transition={{duration: 0.6, ease: EASE_OUT_EXPO}}
          className="mb-8"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-2 font-mono">
            Inventory
          </p>
          <h2 className="font-display text-3xl text-white">
            {shouldShowVehicles
              ? selectedBrand
                ? `${selectedBrand} Vehicles`
                : `Results for "${searchQuery}"`
              : "Find Your Vehicle"}
          </h2>
        </motion.div>
        <motion.div
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.1}}
          className="mb-8 relative max-w-2xl mx-auto"
        >
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BCBEC0]/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by brand or model..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedBrand(null);
                setSelectedModel(null);
              }}
              className="w-full bg-black border border-[#BCBEC0]/30 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-[#BCBEC0]/40 focus:outline-none focus:border-[#BCBEC0]/50 transition-colors duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BCBEC0]/40 hover:text-[#BCBEC0] transition-colors"
              >
                ✕
              </button>
            )}
          </div>
          <p className="text-[10px] text-[#BCBEC0]/30 mt-2 text-center">
            Type a brand or model name to see matching vehicles
          </p>
        </motion.div>
        {shouldShowVehicles && (
          <>
            <AnimatePresence>
              {selectedBrand && (
                <motion.div
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 10}}
                  className="mb-6"
                >
                  <ModelSelector
                    brand={selectedBrand}
                    selectedModel={selectedModel}
                    onSelectModel={(model) => setSelectedModel(model)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <FilterBar filters={filters} setFilters={setFilters} />
            <div className="flex items-center justify-between mt-6 mb-6">
              <p className="text-sm text-[#BCBEC0]/50 font-mono">
                <span className="text-[#BCBEC0]">
                  {filteredVehicles.length}
                </span>{" "}
                vehicles found
              </p>
              {selectedBrand && (
                <button
                  onClick={() => {
                    setSelectedBrand(null);
                    setSelectedModel(null);
                    setSearchQuery("");
                  }}
                  className="text-xs text-[#BCBEC0] hover:text-white transition-colors underline"
                >
                  ← Back to all brands
                </button>
              )}
            </div>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredVehicles.map((v, i) => (
                  <VehicleCard
                    key={v.id}
                    vehicle={v}
                    saved={savedVehicles.includes(v.id)}
                    onSave={() => handleSave(v.id)}
                    index={i}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
            {filteredVehicles.length === 0 && (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="text-center py-20"
              >
                <p className="text-[#BCBEC0]/40 text-sm mb-4">
                  No vehicles match your current filters.
                </p>
                <button
                  onClick={() => {
                    setFilters({});
                    setSelectedBrand(null);
                    setSelectedModel(null);
                    setSearchQuery("");
                  }}
                  className="text-xs text-[#BCBEC0] underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </>
        )}
        {!shouldShowVehicles && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="text-center py-24"
          >
            <div className="max-w-md mx-auto">
              <span className="text-4xl mb-6 block opacity-20">🚗</span>
              <p className="text-[#BCBEC0]/40 text-lg mb-2">
                Your next vehicle awaits
              </p>
              <p className="text-[#BCBEC0]/30 text-sm">
                Use the search bar above or select a brand from the showroom to
                explore our inventory.
              </p>
            </div>
          </motion.div>
        )}
      </section>
      <div className="max-w-[1440px] mx-auto px-16">
        <div className="h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/20 to-transparent" />
      </div>
      {shouldShowVehicles && (
        <>
          {newArrivals.length > 0 && (
            <FeaturedCollection
              title="New Arrivals"
              vehicles={newArrivals}
              savedVehicles={savedVehicles}
              onSave={handleSave}
            />
          )}
          {priceReduced.length > 0 && (
            <FeaturedCollection
              title="Price Reduced"
              vehicles={priceReduced}
              savedVehicles={savedVehicles}
              onSave={handleSave}
            />
          )}
          {limitedAvailability.length > 0 && (
            <FeaturedCollection
              title="Limited Availability"
              vehicles={limitedAvailability}
              savedVehicles={savedVehicles}
              onSave={handleSave}
            />
          )}
        </>
      )}
      <TrustSection />
      <TestimonialsSection />
      <CTABand />
    </div>
  );
}
