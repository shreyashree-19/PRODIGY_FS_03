export const mockStores = [
  {
    id: "store-1",
    name: "Green Grocers & Farm Fresh",
    tagline: "Direct from Karnataka hydroponic & organic farms",
    rating: 4.9,
    reviewsCount: 1420,
    distanceKm: 1.2,
    deliveryTimeMins: 15,
    minOrder: 99,
    freeDeliveryThreshold: 249,
    address: "12th Main Rd, Indiranagar, Bengaluru, Karnataka 560038",
    phone: "+91 98450 12890",
    openingHours: "07:00 AM - 10:30 PM",
    isOpen: true,
    category: "Fresh Produce",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    tags: ["Organic", "Farm Direct", "Hydroponic", "Same-day Plucked"]
  },
  {
    id: "store-2",
    name: "The Artisan Crust & Dairy Co.",
    tagline: "Sourdough, cultured butter & artisanal cheeses",
    rating: 4.8,
    reviewsCount: 890,
    distanceKm: 2.1,
    deliveryTimeMins: 20,
    minOrder: 149,
    freeDeliveryThreshold: 399,
    address: "80 Feet Rd, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    phone: "+91 80 4125 7890",
    openingHours: "08:00 AM - 09:30 PM",
    isOpen: true,
    category: "Bakery & Dairy",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    tags: ["Artisanal", "Woodfired", "No Preservatives", "A2 Milk"]
  },
  {
    id: "store-3",
    name: "Nature's Gourmet & Pantry",
    tagline: "Cold-pressed oils, single-origin spices & superfoods",
    rating: 4.7,
    reviewsCount: 640,
    distanceKm: 3.4,
    deliveryTimeMins: 25,
    minOrder: 199,
    freeDeliveryThreshold: 499,
    address: "100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008",
    phone: "+91 98801 54321",
    openingHours: "09:00 AM - 10:00 PM",
    isOpen: true,
    category: "Gourmet & Organic",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    tags: ["Cold Pressed", "Gluten Free", "Superfoods", "Zero Pesticides"]
  },
  {
    id: "store-4",
    name: "Daily Express Supermarket",
    tagline: "All daily essentials, personal care & munchies",
    rating: 4.6,
    reviewsCount: 2310,
    distanceKm: 0.8,
    deliveryTimeMins: 12,
    minOrder: 49,
    freeDeliveryThreshold: 199,
    address: "Old Airport Road, Kodihalli, Bengaluru, Karnataka 560008",
    phone: "+91 80 2521 9988",
    openingHours: "Open 24/7",
    isOpen: true,
    category: "Supermarket & Snacks",
    image: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    tags: ["24/7 Delivery", "Best Value", "Packaged Goods", "Express"]
  },
  {
    id: "store-5",
    name: "Herb & Care Wellness Chemist",
    tagline: "Ayurvedic remedies, first aid & personal hygiene",
    rating: 4.9,
    reviewsCount: 520,
    distanceKm: 1.5,
    deliveryTimeMins: 15,
    minOrder: 99,
    freeDeliveryThreshold: 299,
    address: "CMH Road, Indiranagar, Bengaluru, Karnataka 560038",
    phone: "+91 97412 88410",
    openingHours: "08:00 AM - 11:00 PM",
    isOpen: true,
    category: "Personal & Wellness",
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    tags: ["Pharmacy", "Wellness", "Organic Skin Care", "First Aid"]
  }
];

export const mockCategories = [
  { id: "all", name: "All Items", icon: "Sparkles", count: 28 },
  { id: "produce", name: "Fresh Produce", icon: "Apple", count: 8 },
  { id: "bakery-dairy", name: "Dairy & Bakery", icon: "Croissant", count: 6 },
  { id: "gourmet", name: "Gourmet & Pantry", icon: "Utensils", count: 5 },
  { id: "snacks", name: "Snacks & Drinks", icon: "Coffee", count: 5 },
  { id: "wellness", name: "Personal & Wellness", icon: "HeartPulse", count: 4 }
];

export const mockProducts = [
  {
    id: "prod-1",
    name: "Fresh Alphonso Mangoes (Ratnagiri)",
    category: "produce",
    storeId: "store-1",
    storeName: "Green Grocers & Farm Fresh",
    price: 349,
    originalPrice: 450,
    unit: "1 kg (approx 4-5 pcs)",
    rating: 4.9,
    reviewsCount: 312,
    stock: 18,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80",
    badge: "Seasonal Special",
    tags: ["Fruit", "Seasonal", "GI Tagged", "Sweet"],
    description: "Handpicked naturally ripened Grade-A Ratnagiri Alphonso mangoes. Heavenly aroma, rich saffron-colored pulp, with unmatched sweetness.",
    specifications: {
      "Origin": "Ratnagiri, Maharashtra",
      "Ripening": "100% Carbine-Free Straw Ripened",
      "Shelf Life": "4-5 days at room temperature",
      "Storage": "Cool dry place, refrigerate once fully ripe"
    },
    nutrition: { calories: "60 kcal / 100g", carbs: "15g", protein: "0.8g", fat: "0.4g" },
    featured: true,
    isTrending: true
  },
  {
    id: "prod-2",
    name: "Hydroponic Baby Spinach",
    category: "produce",
    storeId: "store-1",
    storeName: "Green Grocers & Farm Fresh",
    price: 65,
    originalPrice: 85,
    unit: "200 g pack",
    rating: 4.8,
    reviewsCount: 145,
    stock: 25,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    badge: "Hydroponic",
    tags: ["Greens", "Pesticide Free", "Iron Rich", "Salad Ready"],
    description: "Tender, triple-washed baby spinach leaves grown in clean nutrient water without chemical soil pesticides. Ready for salads, smoothies, or curries.",
    specifications: {
      "Farming": "Soil-less Hydroponics",
      "Pesticides": "0% Residual Chemicals",
      "Preparation": "Pre-washed & ozone sanitized",
      "Shelf Life": "5 days in refrigerator"
    },
    nutrition: { calories: "23 kcal / 100g", carbs: "3.6g", protein: "2.9g", fat: "0.4g" },
    featured: true,
    isTrending: false
  },
  {
    id: "prod-3",
    name: "Artisan Sourdough Country Loaf",
    category: "bakery-dairy",
    storeId: "store-2",
    storeName: "The Artisan Crust & Dairy Co.",
    price: 180,
    originalPrice: 220,
    unit: "450 g loaf",
    rating: 4.9,
    reviewsCount: 220,
    stock: 9,
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80",
    badge: "Fresh Baked 7 AM",
    tags: ["Sourdough", "Vegan", "Fermented", "Gut Friendly"],
    description: "Slow-fermented for 36 hours with wild sourdough culture and stoneground unbleached wheat flour. Crispy crackling crust and tender open crumb.",
    specifications: {
      "Fermentation": "36-Hour Wild Yeast Starter",
      "Ingredients": "Stoneground Wheat, Himalayan Salt, Spring Water",
      "Preservatives": "None",
      "Shelf Life": "3-4 days"
    },
    nutrition: { calories: "240 kcal / 100g", carbs: "48g", protein: "9g", fat: "1.2g" },
    featured: true,
    isTrending: true
  },
  {
    id: "prod-4",
    name: "Fresh Malai Paneer (Cow Milk)",
    category: "bakery-dairy",
    storeId: "store-2",
    storeName: "The Artisan Crust & Dairy Co.",
    price: 135,
    originalPrice: 160,
    unit: "250 g block",
    rating: 4.9,
    reviewsCount: 480,
    stock: 22,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    badge: "Melt In Mouth",
    tags: ["Dairy", "High Protein", "Fresh Made", "No Starch"],
    description: "Super soft, authentic fresh Malai Paneer crafted daily morning using pure grass-fed cow milk. Zero preservatives or artificial thickeners.",
    specifications: {
      "Source": "Local Grass-fed Cows",
      "Process": "Traditional Lemon Curd Setting",
      "Fat Content": "22% Natural Milk Fat",
      "Shelf Life": "4 days refrigerated"
    },
    nutrition: { calories: "265 kcal / 100g", carbs: "3.5g", protein: "18.3g", fat: "20g" },
    featured: true,
    isTrending: true
  },
  {
    id: "prod-5",
    name: "Pure A2 Gir Cow Vedic Ghee",
    category: "gourmet",
    storeId: "store-3",
    storeName: "Nature's Gourmet & Pantry",
    price: 899,
    originalPrice: 1100,
    unit: "500 ml jar",
    rating: 5.0,
    reviewsCount: 195,
    stock: 14,
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
    badge: "Bilona Method",
    tags: ["A2 Ghee", "Ayurvedic", "Grass Fed", "Golden Grain"],
    description: "Traditional hand-churned Bilona Ghee made from curd of indigenous pasture-grazed Gir cows. Granular golden texture with divine aroma and high smoking point.",
    specifications: {
      "Extraction": "Bilona Two-Way Churning",
      "Container": "Food Grade UV-Protected Glass Jar",
      "Purity": "100% Pure Milk Fat",
      "Shelf Life": "12 months"
    },
    nutrition: { calories: "900 kcal / 100g", carbs: "0g", protein: "0g", fat: "99.8g" },
    featured: true,
    isTrending: false
  },
  {
    id: "prod-6",
    name: "Cold-Pressed Extra Virgin Mustard Oil",
    category: "gourmet",
    storeId: "store-3",
    storeName: "Nature's Gourmet & Pantry",
    price: 240,
    originalPrice: 280,
    unit: "1 Litre bottle",
    rating: 4.7,
    reviewsCount: 88,
    stock: 16,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    badge: "Wood Churned (Kachi Ghani)",
    tags: ["Cooking Oil", "Pungent", "Heart Healthy", "Cold Pressed"],
    description: "Extracted in wooden Kolhus at low temperatures below 40°C to preserve natural antioxidants, fiery pungency, and vital omega fatty acids.",
    specifications: {
      "Pressing": "Wood-press Cold Process",
      "Chemicals": "Unrefined & Hexane-Free",
      "Smoke Point": "250°C",
      "Shelf Life": "9 months"
    },
    nutrition: { calories: "884 kcal / 100g", carbs: "0g", protein: "0g", fat: "100g" },
    featured: false,
    isTrending: false
  },
  {
    id: "prod-7",
    name: "Artisan Dark Roast Filter Coffee Blend",
    category: "snacks",
    storeId: "store-4",
    storeName: "Daily Express Supermarket",
    price: 260,
    originalPrice: 320,
    unit: "250 g pack",
    rating: 4.8,
    reviewsCount: 340,
    stock: 30,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
    badge: "Chikmagalur Single Estate",
    tags: ["Coffee", "Chicory 20%", "Traditional", "Bold"],
    description: "80% Arabica & Robusta beans from misty Chikmagalur hills blended with 20% roast chicory for the authentic south Indian morning filter kaapi experience.",
    specifications: {
      "Roast Level": "Dark French Roast",
      "Grind": "Medium-Fine for Filter & Aeropress",
      "Estate": "Baba Budangiri Highlands",
      "Packaging": "Degassing Valve Foil Pouch"
    },
    nutrition: { calories: "5 kcal / cup", carbs: "0.8g", protein: "0.2g", fat: "0g" },
    featured: true,
    isTrending: true
  },
  {
    id: "prod-8",
    name: "Heritage Cold Brew Kombucha (Ginger Lemon)",
    category: "snacks",
    storeId: "store-4",
    storeName: "Daily Express Supermarket",
    price: 140,
    originalPrice: 175,
    unit: "330 ml glass bottle",
    rating: 4.6,
    reviewsCount: 110,
    stock: 12,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    badge: "Probiotic",
    tags: ["Beverage", "Low Sugar", "Fermented", "Refreshing"],
    description: "Sparkling live fermented tea infused with cold-pressed ginger and organic lemon. Packed with natural gut-friendly probiotic cultures.",
    specifications: {
      "Probiotic Count": "1 Billion CFUs / bottle",
      "Sugar": "Only 3.2g natural raw cane sugar",
      "Carbonation": "100% Naturally Fermented Fizz",
      "Storage": "Keep refrigerated below 5°C"
    },
    nutrition: { calories: "32 kcal / bottle", carbs: "4g", protein: "0g", fat: "0g" },
    featured: false,
    isTrending: false
  },
  {
    id: "prod-9",
    name: "Organic Forest Raw Honey",
    category: "gourmet",
    storeId: "store-3",
    storeName: "Nature's Gourmet & Pantry",
    price: 420,
    originalPrice: 510,
    unit: "500 g glass jar",
    rating: 4.9,
    reviewsCount: 270,
    stock: 15,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    badge: "Wildflower Raw",
    tags: ["Raw Honey", "Wild Harvest", "Unpasteurized", "Immunity"],
    description: "Unfiltered, unheated wild forest honey collected ethically by tribal cooperatives in the Western Ghats. Preserves pollen and natural enzymes.",
    specifications: {
      "Processing": "Raw, Unheated, Micro-filtered",
      "Pollen Count": "High Multi-Floral Pollen",
      "Container": "Heavy Amber Glass Jar",
      "Shelf Life": "Indefinite (does not spoil)"
    },
    nutrition: { calories: "64 kcal / tbsp", carbs: "17g", protein: "0.1g", fat: "0g" },
    featured: true,
    isTrending: true
  },
  {
    id: "prod-10",
    name: "Neem & Tea Tree Clarifying Face Wash",
    category: "wellness",
    storeId: "store-5",
    storeName: "Herb & Care Wellness Chemist",
    price: 290,
    originalPrice: 350,
    unit: "150 ml bottle",
    rating: 4.8,
    reviewsCount: 160,
    stock: 20,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    badge: "Dermat Tested",
    tags: ["Skincare", "Sulphate Free", "Ayurvedic", "Anti-Blemish"],
    description: "Botanical clarifying gel cleanser enriched with organic cold-pressed neem seed extract, Australian tea tree oil, and soothing aloe vera.",
    specifications: {
      "Skin Type": "Oily, Acne-Prone & Sensitive",
      "Parabens/SLS": "0% Harsh Chemicals",
      "pH Level": "5.5 Balanced Skin Barrier",
      "Certifications": "Cruelty-Free & Vegan"
    },
    nutrition: null,
    featured: false,
    isTrending: false
  },
  {
    id: "prod-11",
    name: "Himalayan Pink Rock Salt (Fine Grain)",
    category: "gourmet",
    storeId: "store-3",
    storeName: "Nature's Gourmet & Pantry",
    price: 95,
    originalPrice: 120,
    unit: "1 kg pouch",
    rating: 4.7,
    reviewsCount: 310,
    stock: 45,
    image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=600&q=80",
    badge: "84 Trace Minerals",
    tags: ["Mineral Salt", "Unrefined", "Pantry", "Clean Food"],
    description: "Pure unprocessed pink crystalline salt harvested from deep fossil salt deposits in the foothills of the Himalayas. Rich in natural electrolytes.",
    specifications: {
      "Minerals": "Contains 84 trace minerals & iron",
      "Bleaching": "Unbleached, zero anti-caking chemicals",
      "Purity": "100% Food Grade",
      "Shelf Life": "24 months"
    },
    nutrition: { sodium: "380 mg / g", minerals: "Trace magnesium, potassium, calcium" },
    featured: false,
    isTrending: false
  },
  {
    id: "prod-12",
    name: "Avocados (Hass Export Grade)",
    category: "produce",
    storeId: "store-1",
    storeName: "Green Grocers & Farm Fresh",
    price: 210,
    originalPrice: 280,
    unit: "2 pcs (approx 400g)",
    rating: 4.8,
    reviewsCount: 198,
    stock: 14,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
    badge: "Rich & Creamy",
    tags: ["Avocado", "Keto", "Healthy Fats", "Salad"],
    description: "Buttery, nutty, and velvety Hass avocados with pebbled dark skins. High in monounsaturated fats and essential potassium.",
    specifications: {
      "Ripeness": "Semi-ripe, ready in 24-48 hrs",
      "Origin": "Kodaikanal Hill Orchards",
      "Packaging": "Protective mesh sleeve",
      "Shelf Life": "4-6 days"
    },
    nutrition: { calories: "160 kcal / 100g", carbs: "8.5g", protein: "2g", fat: "14.7g" },
    featured: true,
    isTrending: true
  },
  {
    id: "prod-13",
    name: "Almond Milk (Unsweetened Barista Blend)",
    category: "bakery-dairy",
    storeId: "store-2",
    storeName: "The Artisan Crust & Dairy Co.",
    price: 199,
    originalPrice: 250,
    unit: "1 Litre carton",
    rating: 4.7,
    reviewsCount: 140,
    stock: 19,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    badge: "Plant Based",
    tags: ["Dairy Free", "Vegan", "Keto", "Lactose Free"],
    description: "Rich and creamy plant milk crafted with Californian almonds. Micro-foams beautifully for morning lattes and matcha drinks.",
    specifications: {
      "Almond Content": "12% Whole Roasted Almonds",
      "Added Sugar": "0% Free Sugars",
      "Fortification": "Enriched with Calcium & Vitamin D2/B12",
      "Shelf Life": "9 months unopened"
    },
    nutrition: { calories: "39 kcal / 100ml", carbs: "1.2g", protein: "1.5g", fat: "3.1g" },
    featured: false,
    isTrending: false
  },
  {
    id: "prod-14",
    name: "Crispy Roasted Makhana (Peri Peri)",
    category: "snacks",
    storeId: "store-4",
    storeName: "Daily Express Supermarket",
    price: 99,
    originalPrice: 130,
    unit: "80 g pouch",
    rating: 4.9,
    reviewsCount: 420,
    stock: 35,
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80",
    badge: "Guilt Free Crunch",
    tags: ["Snacks", "Roasted", "Gluten Free", "Spicy"],
    description: "Jumbo lotus water lily seeds slow-roasted in pure olive oil and tossed with zesty African Bird's Eye chili peri peri seasoning.",
    specifications: {
      "Cooking Method": "100% Roasted, Never Deep Fried",
      "Oil Used": "Cold Pressed Extra Light Olive Oil",
      "Shelf Life": "6 months",
      "Allergens": "Manufactured in a nut-free facility"
    },
    nutrition: { calories: "110 kcal / 28g", carbs: "18g", protein: "4g", fat: "2.5g" },
    featured: true,
    isTrending: true
  },
  {
    id: "prod-15",
    name: "Wild Lavender & Chamomile Calming Tea",
    category: "wellness",
    storeId: "store-5",
    storeName: "Herb & Care Wellness Chemist",
    price: 360,
    originalPrice: 420,
    unit: "50 g loose leaf tin",
    rating: 4.9,
    reviewsCount: 95,
    stock: 11,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    badge: "Deep Sleep Blend",
    tags: ["Herbal Tea", "Caffeine Free", "Calming", "Organic"],
    description: "A soothing floral nightcap made from whole Kashmiri lavender blossoms, whole German chamomile heads, and sweet spearmint leaves.",
    specifications: {
      "Caffeine": "0 mg (100% Caffeine Free)",
      "Packaging": "Airtight collectible tin",
      "Brewing": "Steep 1 tsp in 95°C water for 4 mins",
      "Shelf Life": "18 months"
    },
    nutrition: null,
    featured: false,
    isTrending: false
  },
  {
    id: "prod-16",
    name: "Farm Fresh Desi Brown Eggs (Free Range)",
    category: "bakery-dairy",
    storeId: "store-1",
    storeName: "Green Grocers & Farm Fresh",
    price: 115,
    originalPrice: 140,
    unit: "6 pcs pack",
    rating: 4.9,
    reviewsCount: 512,
    stock: 40,
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80",
    badge: "Free Range & Antibiotic Free",
    tags: ["Eggs", "Protein", "Farm Fresh", "Omega 3"],
    description: "Eggs laid by pasture-raised Kadaknath and Desi hens fed natural flaxseeds and grains. Golden bright yolks rich in Omega-3.",
    specifications: {
      "Farm": "Hennur Pasture Eco-Farm",
      "Antibiotics": "0% Hormone or Antibiotic Fed",
      "Yolk Color": "Natural Deep Amber Golden",
      "Shelf Life": "21 days refrigerated"
    },
    nutrition: { calories: "72 kcal / egg", carbs: "0.4g", protein: "6.3g", fat: "4.8g" },
    featured: true,
    isTrending: true
  }
];

export const mockCoupons = [
  {
    code: "WELCOME50",
    discountPercent: 0,
    flatDiscount: 50,
    minOrderValue: 249,
    description: "₹50 flat discount for your first neighborhood purchase",
    maxDiscount: 50,
    expiry: "31 Dec 2026"
  },
  {
    code: "LOCALMART20",
    discountPercent: 20,
    flatDiscount: 0,
    minOrderValue: 399,
    description: "20% OFF up to ₹120 on fresh produce & bakery items",
    maxDiscount: 120,
    expiry: "31 Dec 2026"
  },
  {
    code: "FREEDEL",
    discountPercent: 0,
    flatDiscount: 35,
    minOrderValue: 199,
    description: "Instant FREE delivery on any order above ₹199",
    maxDiscount: 35,
    expiry: "31 Dec 2026"
  },
  {
    code: "SUPER100",
    discountPercent: 0,
    flatDiscount: 100,
    minOrderValue: 699,
    description: "Flat ₹100 OFF on pantry & gourmet baskets above ₹699",
    maxDiscount: 100,
    expiry: "31 Dec 2026"
  }
];

export const mockMealKits = [
  {
    id: "meal-1",
    title: "Paneer Butter Masala Dinner Kit",
    subtitle: "Cook a restaurant-grade dinner for 4 in 25 mins",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    badge: "AI Chef Recipe",
    prepTime: "25 mins",
    difficulty: "Easy",
    servings: 4,
    discountedPrice: 389,
    originalPrice: 475,
    productIds: ["prod-4", "prod-5", "prod-2"],
    recipeSteps: [
      "Dice fresh malai paneer into 1-inch cubes.",
      "Heat 2 tbsp pure A2 Ghee and saute ginger, garlic, and tomato puree until fragrant.",
      "Add baby spinach puree for a rich wholesome twist, then fold in cream and simmer paneer for 6 minutes.",
      "Serve warm with freshly toasted sourdough or steaming jeera rice."
    ]
  },
  {
    id: "meal-2",
    title: "Healthy Morning Breakfast Basket",
    subtitle: "High-protein eggs, sourdough slices & artisan filter coffee",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    badge: "Energy Morning",
    prepTime: "10 mins",
    difficulty: "Quick",
    servings: 2,
    discountedPrice: 499,
    originalPrice: 620,
    productIds: ["prod-16", "prod-3", "prod-7", "prod-12"],
    recipeSteps: [
      "Toast 2 thick slices of Country Sourdough until golden brown.",
      "Mash creamy Hass avocado with pink rock salt and fresh cracked black pepper.",
      "Poach or fry 2 Desi Brown eggs to sunny-side perfection.",
      "Brew bold Chikmagalur filter coffee and enjoy a wholesome energetic start!"
    ]
  }
];

export const mockUsers = [
  {
    id: "user-1",
    name: "Aarav Sharma",
    email: "aarav.customer@localmart.in",
    role: "customer",
    phone: "+91 98201 44552",
    coins: 380, // ₹38 value
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    savedAddresses: [
      {
        id: "addr-1",
        label: "Home",
        name: "Aarav Sharma",
        phone: "+91 98201 44552",
        flat: "Flat 402, Lotus Orchid Apts",
        area: "100ft Road, HAL 2nd Stage, Indiranagar",
        city: "Bengaluru",
        pincode: "560038",
        isDefault: true
      },
      {
        id: "addr-2",
        label: "Work",
        name: "Aarav Sharma",
        phone: "+91 98201 44552",
        flat: "7th Floor, Tech Hub Tower 3",
        area: "Embassy GolfLinks Business Park, Domlur",
        city: "Bengaluru",
        pincode: "560071",
        isDefault: false
      }
    ]
  },
  {
    id: "user-2",
    name: "Rajesh Kumar (Store Partner)",
    email: "rajesh.store@localmart.in",
    role: "store_owner",
    phone: "+91 98450 12890",
    storeId: "store-1",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "user-3",
    name: "Admin Team",
    email: "admin@localmart.in",
    role: "admin",
    phone: "+91 80 4000 8888",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
  }
];

export const mockOrders = [
  {
    id: "LM-89241",
    createdAt: "2026-11-06T14:32:00.000Z",
    userId: "user-1",
    customerName: "Aarav Sharma",
    customerPhone: "+91 98201 44552",
    storeId: "store-1",
    storeName: "Green Grocers & Farm Fresh",
    status: "Delivered",
    deliveryPartner: {
      name: "Suresh Gowda",
      phone: "+91 97422 10923",
      vehicle: "Honda Activa (KA-03-HM-4902)",
      rating: 4.9
    },
    items: [
      {
        productId: "prod-1",
        name: "Fresh Alphonso Mangoes (Ratnagiri)",
        price: 349,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=200&q=80"
      },
      {
        productId: "prod-2",
        name: "Hydroponic Baby Spinach",
        price: 65,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=200&q=80"
      }
    ],
    itemTotal: 479,
    deliveryFee: 0,
    discount: 50,
    couponApplied: "WELCOME50",
    coinsRedeemed: 20,
    total: 409,
    paymentMethod: "UPI / Razorpay",
    paymentStatus: "Paid",
    deliveryAddress: "Flat 402, Lotus Orchid Apts, 100ft Road, Indiranagar, Bengaluru - 560038",
    timeline: [
      { step: "Order Placed", time: "02:32 PM", completed: true },
      { step: "Packed at Store", time: "02:36 PM", completed: true },
      { step: "Picked up by Suresh", time: "02:41 PM", completed: true },
      { step: "Delivered at Doorstep", time: "02:51 PM", completed: true }
    ]
  },
  {
    id: "LM-89315",
    createdAt: "2026-11-07T12:15:00.000Z",
    userId: "user-1",
    customerName: "Aarav Sharma",
    customerPhone: "+91 98201 44552",
    storeId: "store-2",
    storeName: "The Artisan Crust & Dairy Co.",
    status: "Out for Delivery",
    deliveryPartner: {
      name: "Mahesh Rao",
      phone: "+91 99014 55122",
      vehicle: "Electric Yulu Delivery Scooter",
      rating: 4.8
    },
    items: [
      {
        productId: "prod-3",
        name: "Artisan Sourdough Country Loaf",
        price: 180,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=200&q=80"
      },
      {
        productId: "prod-4",
        name: "Fresh Malai Paneer (Cow Milk)",
        price: 135,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=200&q=80"
      }
    ],
    itemTotal: 450,
    deliveryFee: 25,
    discount: 0,
    couponApplied: null,
    coinsRedeemed: 0,
    total: 475,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    deliveryAddress: "Flat 402, Lotus Orchid Apts, 100ft Road, Indiranagar, Bengaluru - 560038",
    timeline: [
      { step: "Order Placed", time: "12:15 PM", completed: true },
      { step: "Packed at Store", time: "12:20 PM", completed: true },
      { step: "Out for Delivery", time: "12:26 PM", completed: true },
      { step: "Delivered", time: "Est. 12:40 PM", completed: false }
    ]
  }
];

