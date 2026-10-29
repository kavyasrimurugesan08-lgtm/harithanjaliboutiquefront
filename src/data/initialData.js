// Static boutique catalog data for reliable client-side and Vercel rendering
export const initialData = {
  settings: {
    storeName: "Harithanjali Boutique",
    logoUrl: "/logo.png",
    tagline: "Trendy Collections for Every You.",
    currency: "₹",
    currencyCode: "INR",
    shippingCharge: 100,
    freeShippingThreshold: 1999,
    taxRate: 0,
    phone: "8144052522",
    email: "contact@harithanjaliboutique.com",
    address: "2/32 Perumal Kovil Medu, Main Road, Seelanaickanpatti, Salem – 636201.",
    workingHours: "Mon - Sat: 10:00 AM - 9:00 PM | Sunday: 11:00 AM - 8:00 PM",
    whatsappNumber: "918144052522",
    instagramHandle: "@_harithanjali_boutique",
    instagramUrl: "https://instagram.com/_harithanjali_boutique",
    youtubeName: "Harithanjali Boutique",
    facebookName: "Harithanjali Boutique",
    allowOnlinePayment: false,
    allowWhatsAppOrders: true,
    allowCodOrders: true
  },
  content: {
    announcement: {
      enabled: true,
      text: "✨ Grand Festive Collection Now Live! Free Shipping on orders above ₹1999 | Direct WhatsApp Orders Available!"
    },
    hero: {
      badge: "ROYAL HERITAGE & MODERN LUXURY",
      title: "Trendy Collections for Every You",
      subtitle: "Experience Salem’s finest destination for handcrafted sarees, royal anarkalis, designer kurtis, and contemporary ethnic fusion.",
      ctaText: "Explore Collection",
      ctaLink: "/shop",
      secondaryCtaText: "New Arrivals",
      secondaryCtaLink: "/shop?new=true",
      imageUrl: "/hero/hero_1.jpg"
    },
    promoBanner: {
      tag: "EXCLUSIVE SALEM BOUTIQUE OFFER",
      title: "Celebrations In Regal Purple & Gold",
      subtitle: "Indulge in pure mulberry silks, intricate zardozi embroidery, and handcrafted designer co-ords tailored to your perfection.",
      discountCode: "HARITHA10",
      discountText: "Use code HARITHA10 for 10% off your first festive purchase",
      imageUrl: "/hero/hero_1.jpg"
    },
    about: {
      title: "Crafted with Passion, Rooted in Salem",
      lead: "Harithanjali Boutique is more than just a fashion destination; it is a celebration of womanhood, style, and bespoke craftsmanship.",
      story: "Founded with a vision to bring high-fashion ethnic aesthetics and contemporary trendy silhouettes under one roof in Salem, Harithanjali Boutique curates exclusive collections that empower women to embrace their unique elegance. From festive weddings to chic daily wear, each garment is handpicked for exceptional fabric quality, intricate needlework, and flattering cuts.",
      highlights: [
        "Handpicked Pure Silk & Artisanal Weaves",
        "Custom Sizing & Tailoring Support on WhatsApp",
        "Exclusive Limited-Edition Seasonal Releases",
        "Fast & Insured Pan-India Express Delivery"
      ],
      imageUrl: "/hero/hero_4.jpg"
    }
  },
  categories: [
    {
      id: "cat_sarees",
      name: "Festive & Silk Sarees",
      slug: "sarees",
      description: "Traditional Kanjivaram, Banarasi, and contemporary designer drape sarees with rich borders.",
      imageUrl: "https://static.wixstatic.com/media/faf1ba_78c7a05c62a24c61a99d18980455fc89~mv2.jpg/v1/fill/w_536,h_705,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/faf1ba_78c7a05c62a24c61a99d18980455fc89~mv2.jpg",
      featured: true
    },
    {
      id: "cat_kurtis",
      name: "Designer Kurtis & Tunics",
      slug: "kurtis",
      description: "Everyday chic and office-ready handcrafted cotton, chanderi, and silk kurtis.",
      imageUrl: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80",
      featured: true
    },
    {
      id: "cat_coords",
      name: "Trendy Co-ord Sets",
      slug: "coord-sets",
      description: "Modern fusion silhouettes featuring chic jacket sets, crop tops, and palazzo pairings.",
      imageUrl: "https://urbancodes.in/cdn/shop/files/25_1.jpg?v=1690189597",
      featured: true
    },
    {
      id: "cat_lehengas",
      name: "Bridal & Party Lehengas",
      slug: "lehengas",
      description: "Heavily embroidered royal skirts paired with designer blouses and organza dupattas.",
      imageUrl: "https://www.anantexports.in/cdn/shop/files/1000307161.jpg?v=1774840011&width=1500",
      featured: true
    },
    {
      id: "cat_dupattas",
      name: "Handcrafted Dupattas",
      slug: "dupattas",
      description: "Statement banarasi, kalamkari, and phulkari dupattas to elevate any ensemble.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgQ84vBOEEnU_IgxEpMWu6u7ZUJTkGnzqtaESb-p6hXgzqBMckvAi4Uys&s=10",
      featured: false
    }
  ],
  products: [
    {
      id: "prod_1",
      name: "Royal Amethyst Kanjivaram Pure Silk Saree",
      slug: "royal-amethyst-kanjivaram-silk-saree",
      sku: "HB-SAR-001",
      category: "sarees",
      price: 8999,
      salePrice: 6999,
      stock: 8,
      description: "An ethereal deep purple Kanjivaram pure silk saree woven with radiant golden zari floral jaal and contrasting temple border. Accompanied by a matching unstitched designer blouse piece.",
      fabric: "Pure Mulberry Silk with Tested Zari",
      careInstructions: "Dry Clean Only. Store in breathable muslin cloth.",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMHTjm2XkWfgKd2c74F658W__qXiC2emGEFO1E3InGqSE4bl1qpg-gyZc&s=10",
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
      ],
      sizes: ["Free Size (Includes Blouse)"],
      colors: ["Deep Purple", "Burgundy Wine", "Royal Violet"],
      isFeatured: true,
      isNewArrival: true,
      status: "published",
      rating: 4.9,
      reviewsCount: 24,
      createdAt: "2026-10-25T10:00:00Z"
    },
    {
      id: "prod_2",
      name: "Crimson Scarlet Banarasi Brocade Bridal Saree",
      slug: "crimson-scarlet-banarasi-brocade-saree",
      sku: "HB-SAR-002",
      category: "sarees",
      price: 11999,
      salePrice: 8999,
      stock: 6,
      description: "Spectacular vermilion scarlet red Banarasi bridal saree adorned with intricate gold kadhwa floral weaving, scalloped zari pallu, and heavy brocade designer blouse piece.",
      fabric: "Pure Banarasi Katan Silk",
      careInstructions: "Dry Clean Recommended. Do not spray perfume directly on zari.",
      images: [
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
      ],
      sizes: ["Free Size (Includes Blouse)"],
      colors: ["Crimson Red", "Sindoor Scarlet", "Maroon"],
      isFeatured: true,
      isNewArrival: true,
      status: "published",
      rating: 5,
      reviewsCount: 18,
      createdAt: "2026-10-24T14:00:00Z"
    },
    {
      id: "prod_3",
      name: "Golden Ochre Chanderi Tissue Festive Saree",
      slug: "golden-ochre-chanderi-tissue-saree",
      sku: "HB-SAR-003",
      category: "sarees",
      price: 6499,
      salePrice: 4799,
      stock: 10,
      description: "Lustrous festive saree woven in golden ochre tissue silk, enriched with fine meenakari floral buttas, heritage border, and light tasseled pallu for celebratory perfection.",
      fabric: "Handwoven Chanderi Tissue Silk",
      careInstructions: "Dry clean only.",
      images: [
        "/lookbook/test_1.jpg"
      ],
      sizes: ["Free Size (Includes Blouse)"],
      colors: ["Golden Ochre", "Mustard Yellow", "Honey Gold"],
      isFeatured: true,
      isNewArrival: true,
      status: "published",
      rating: 4.8,
      reviewsCount: 15,
      createdAt: "2026-10-23T11:00:00Z"
    },
    {
      id: "prod_4",
      name: "Peacock Royal Blue Temple Border Kanchipuram Saree",
      slug: "peacock-royal-blue-kanchipuram-saree",
      sku: "HB-SAR-004",
      category: "sarees",
      price: 9499,
      salePrice: 7499,
      stock: 5,
      description: "Regal peacock royal blue pure silk saree with traditional Korvai temple spires woven along the broad zari border and an elaborate grand pallu. Salem boutique favorite.",
      fabric: "Pure Kanchipuram Silk with Gold Zari",
      careInstructions: "Dry Clean Only.",
      images: [
        "https://photos.vardanethnic.in/media/2025/05/Maahi-178-Traditional-Wear-Stylish-Silk-Saree-Collection-6.jpg"
      ],
      sizes: ["Free Size (Includes Blouse)"],
      colors: ["Royal Cobalt Blue", "Peacock Teal", "Indigo"],
      isFeatured: true,
      isNewArrival: true,
      status: "published",
      rating: 4.9,
      reviewsCount: 22,
      createdAt: "2026-10-22T09:30:00Z"
    },
    {
      id: "prod_5",
      name: "Ivory Pearl Embroidered Organza Saree",
      slug: "ivory-pearl-embroidered-organza-saree",
      sku: "HB-SAR-005",
      category: "sarees",
      price: 6499,
      salePrice: 4999,
      stock: 7,
      description: "Delicate sheer ivory organza saree with hand-stitched faux pearl borders, cutwork pallu, and subtle pastel floral threadwork. Comes with raw silk unstitched blouse fabric.",
      fabric: "Pure Sheer Organza Silk",
      careInstructions: "Dry Clean Only.",
      images: [
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
      ],
      sizes: ["Free Size (Includes Blouse)"],
      colors: ["Ivory White", "Off White", "Champagne Pearl"],
      isFeatured: true,
      isNewArrival: true,
      status: "published",
      rating: 4.9,
      reviewsCount: 16,
      createdAt: "2026-10-21T15:20:00Z"
    },
    {
      id: "prod_6",
      name: "Emerald Green Zari Butta Paithani Silk Saree",
      slug: "emerald-green-zari-butta-paithani-saree",
      sku: "HB-SAR-006",
      category: "sarees",
      price: 8499,
      salePrice: 6299,
      stock: 6,
      description: "Deep royal emerald green silk saree highlighted with shimmering zari peacock buttas, classic kaleidoscopic muniya border, and rich pallu. Ideal for weddings and temple festivals.",
      fabric: "Artisanal Paithani Pure Silk",
      careInstructions: "Dry clean only.",
      images: [
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80"
      ],
      sizes: ["Free Size (Includes Blouse)"],
      colors: ["Emerald Green", "Forest Green", "Bottle Green"],
      isFeatured: false,
      isNewArrival: true,
      status: "published",
      rating: 4.8,
      reviewsCount: 11,
      createdAt: "2026-10-20T12:00:00Z"
    },
    {
      id: "prod_7",
      name: "Pastel Lilac Embroidered Net & Satin Saree",
      slug: "pastel-lilac-embroidered-saree",
      sku: "HB-SAR-007",
      category: "sarees",
      price: 5499,
      salePrice: 3999,
      stock: 9,
      description: "Modern cocktail drape in graceful pastel lilac soft net paired with satin borders, micro-sequins, and a pre-draped contemporary lookbook appeal.",
      fabric: "Soft Net & Satin Blend",
      careInstructions: "Dry Clean Only.",
      images: [
        "https://assets.ajio.com/medias/sys_master/root/20230731/7hIQ/64c7a11fa9b42d15c97bfbff/-473Wx593H-466399961-teal-MODEL.jpg"
      ],
      sizes: ["Free Size (Includes Blouse)"],
      colors: ["Pastel Lilac", "Soft Lavender", "Mauve"],
      isFeatured: false,
      isNewArrival: false,
      status: "published",
      rating: 4.7,
      reviewsCount: 9,
      createdAt: "2026-10-19T08:30:00Z"
    },
    {
      id: "prod_8",
      name: "Blush Rose Gold Shimmer Draped Party Saree",
      slug: "blush-rose-gold-shimmer-saree",
      sku: "HB-SAR-008",
      category: "sarees",
      price: 6999,
      salePrice: 5199,
      stock: 7,
      description: "Ethereal rose gold metallic thread saree with feather-light fall, shimmering drape, and modern designer blouse piece. Handcrafted for evening galas and sangeet.",
      fabric: "Metallic Shimmer Tissue Georgette",
      careInstructions: "Dry clean only.",
      images: [
        "https://d3nsby4zkkv8rx.cloudfront.net/image/cache/data/silk-designer-traditional-saree-135137-1200x1650.jpg"
      ],
      sizes: ["Free Size (Includes Blouse)"],
      colors: ["Rose Gold", "Blush Pink", "Champagne"],
      isFeatured: false,
      isNewArrival: false,
      status: "published",
      rating: 4.9,
      reviewsCount: 14,
      createdAt: "2026-10-18T14:10:00Z"
    },
    {
      id: "prod_9",
      name: "Lavender Bloom Embroidered Georgette Anarkali",
      slug: "lavender-bloom-georgette-anarkali",
      sku: "HB-ANA-009",
      category: "anarkalis",
      price: 4599,
      salePrice: 3499,
      stock: 12,
      description: "Stunning pastel lavender floor-length anarkali suit set with delicate tonal sequin embroidery, pearl work on the neckline, matching pants, and a scalloped organza dupatta.",
      fabric: "Pure Micro Georgette & Shantoon Lining",
      careInstructions: "Dry Clean Only.",
      images: [
        "https://ivalinmabia.com/cdn/shop/files/lavender-and-dark-blue-cotton-anarkali-anarkalis-276.webp?v=1766765901&width=1500"
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Soft Lavender", "Lilac Frost", "Powder Pink"],
      isFeatured: true,
      isNewArrival: true,
      status: "published",
      rating: 4.8,
      reviewsCount: 19,
      createdAt: "2026-10-25T11:30:00Z"
    },
    {
      id: "prod_10",
      name: "Sunlit Ochre Yellow Chanderi Silk Kurti Set",
      slug: "sunlit-ochre-yellow-chanderi-kurti-set",
      sku: "HB-KUR-010",
      category: "kurtis",
      price: 2899,
      salePrice: 2199,
      stock: 15,
      description: "Vibrant mustard yellow straight-fit kurti crafted from lustrous Chanderi silk with gota patti detailing around the yoke. Paired with comfortable cigarette trousers and dupatta.",
      fabric: "Chanderi Silk with Cotton Voile Lining",
      careInstructions: "Hand wash separately with mild liquid detergent or Dry Clean.",
      images: [
        "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Mustard Yellow", "Marigold", "Sunshine Gold"],
      isFeatured: true,
      isNewArrival: true,
      status: "published",
      rating: 4.7,
      reviewsCount: 31,
      createdAt: "2026-10-24T09:15:00Z"
    },
    {
      id: "prod_11",
      name: "Midnight Cobalt Silk Fusion Co-ord Set",
      slug: "midnight-cobalt-silk-fusion-coord-set",
      sku: "HB-CRD-011",
      category: "coord-sets",
      price: 3899,
      salePrice: 2999,
      stock: 9,
      description: "A striking modern ethnic 2-piece ensemble featuring an asymmetrical high-low tunic with zari sleeve cuffs, paired with tailored flared palazzo pants.",
      fabric: "Raw Silk Blend",
      careInstructions: "Gentle dry clean recommended.",
      images: [
        "https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/e/m/embroidered-pure-cotton-co-ord-set-in-white-v1-twj6071.jpg"
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Royal Cobalt Blue", "Sapphire", "Indigo"],
      isFeatured: true,
      isNewArrival: true,
      status: "published",
      rating: 4.9,
      reviewsCount: 14,
      createdAt: "2026-10-23T14:40:00Z"
    },
    {
      id: "prod_12",
      name: "Crimson Velvet Heritage Bridal Lehenga",
      slug: "crimson-velvet-heritage-bridal-lehenga",
      sku: "HB-LEH-012",
      category: "lehengas",
      price: 18999,
      salePrice: 14999,
      stock: 4,
      description: "A showstopper bridal lehenga in deep crimson royal micro-velvet, embellished with golden zardozi, hand-cut dabka, and shimmering sequins with dual dupattas.",
      fabric: "Heavy Micro Velvet with Canvas & Can-can",
      careInstructions: "Specialist Dry Clean Only.",
      images: [
        "https://mokosh.in/cdn/shop/files/01_6c229984-a7cd-411a-a299-47428f64126b.png?v=1785230833"
      ],
      sizes: ["Semi-Stitched (Fits XS to XXL)"],
      colors: ["Crimson Red", "Royal Maroon", "Ruby Red"],
      isFeatured: true,
      isNewArrival: true,
      status: "published",
      rating: 5,
      reviewsCount: 11,
      createdAt: "2026-10-22T08:00:00Z"
    },
    {
      id: "prod_13",
      name: "Sunset Tangerine Handloom Chanderi Dupatta",
      slug: "sunset-tangerine-handloom-chanderi-dupatta",
      sku: "HB-DUP-013",
      category: "dupattas",
      price: 1599,
      salePrice: 1199,
      stock: 20,
      description: "Exquisite lightweight Chanderi dupatta highlighted with shimmering gold zari borders and hand-tied tassels. Transforms any plain kurti or suit into an enchanting festive look.",
      fabric: "Handloom Chanderi Cotton Silk (2.5 meters)",
      careInstructions: "Dry Clean or Gentle Cold Water Wash.",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgQ84vBOEEnU_IgxEpMWu6u7ZUJTkGnzqtaESb-p6hXgzqBMckvAi4Uys&s=10"
      ],
      sizes: ["Free Size (2.5m)"],
      colors: ["Tangerine Orange", "Flame Coral", "Amber"],
      isFeatured: false,
      isNewArrival: true,
      status: "published",
      rating: 4.6,
      reviewsCount: 8,
      createdAt: "2026-10-21T16:00:00Z"
    },
    {
      id: "prod_14",
      name: "Plum Purple Peplum Chinon Sharara Ensemble",
      slug: "plum-purple-peplum-sharara-ensemble",
      sku: "HB-SHA-014",
      category: "anarkalis",
      price: 5299,
      salePrice: 3999,
      stock: 7,
      description: "Flattering short peplum top adorned with mirrorwork along the neckline, paired with voluminous multi-tiered flared sharara pants and a net dupatta with mirror lace.",
      fabric: "Heavy Chinon Silk",
      careInstructions: "Dry clean only.",
      images: [
        "https://royalanarkali.com/wp-content/uploads/2026/02/fair-dark-purple-roman-silk-embroidery-work-anarkali-suit-md-3077-dark-purple.webp"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Plum Purple", "Mulberry", "Wine"],
      isFeatured: false,
      isNewArrival: true,
      status: "published",
      rating: 4.8,
      reviewsCount: 12,
      createdAt: "2026-10-20T10:00:00Z"
    }
  ]
};
