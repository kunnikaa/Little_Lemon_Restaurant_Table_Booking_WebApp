/**
 * Little Lemon Restaurant - Extensive Culinary Menu Dataset
 * 16 thoughtfully curated Mediterranean dishes across 7 categories.
 */

export const MENU_CATEGORIES = [
  'All',
  'Starters',
  'Salads',
  'Mains',
  'Pasta',
  'Specials',
  'Desserts',
  'Drinks',
];

export const MENU_ITEMS = [
  // --- STARTERS ---
  {
    id: 'starter-bruschetta',
    name: 'Bruschetta al Pomodoro',
    category: 'Starters',
    price: '$7.99',
    description:
      'Grilled artisan sourdough rubbed with garlic cloves, topped with diced vine-ripened Roma tomatoes, fresh basil ribbons, and aged Modena balsamic reduction.',
    image: '/images/bruschetta.jpg',
    alt: 'Crispy toasted bruschetta with marinated diced tomatoes and fresh basil',
    dietary: 'Vegetarian',
    featured: true,
  },
  {
    id: 'starter-mezze-platter',
    name: 'Santorini Mezze Platter',
    category: 'Starters',
    price: '$14.50',
    description:
      'Velvety house-made chickpea hummus with cold-pressed olive oil, warm pita triangles, crispy falafel, kalamata olives, and marinated artichoke hearts.',
    image: '/images/mezze-platter.jpg',
    alt: 'Mediterranean mezze platter with creamy hummus, falafel, kalamata olives, and warm pita bread',
    dietary: 'Vegan',
    featured: true,
  },
  {
    id: 'starter-calamari',
    name: 'Crispy Lemon Calamari',
    category: 'Starters',
    price: '$13.25',
    description:
      'Tender Rhode Island squid lightly dredged with herbs and sea salt, flash-fried to golden perfection, served with garlic saffron aioli and charred lemon wedges.',
    image: '/images/hero.jpg',
    alt: 'Crispy calamari served with charred lemon and garlic herb aioli',
    dietary: 'Seafood',
    featured: false,
  },

  // --- SALADS ---
  {
    id: 'salad-greek',
    name: 'Classic Greek Village Salad',
    category: 'Salads',
    price: '$12.99',
    description:
      'Crispy romaine hearts, Persian cucumbers, heirloom tomatoes, kalamata olives, thinly sliced red onions, and a generous slab of authentic barrel-aged feta with wild oregano.',
    image: '/images/greek-salad.jpg',
    alt: 'Authentic Greek salad with feta slab, kalamata olives, cucumbers, and tomatoes',
    dietary: 'Vegetarian',
    featured: true,
  },
  {
    id: 'salad-med-quinoa',
    name: 'Mediterranean Herb & Quinoa Bowl',
    category: 'Salads',
    price: '$11.50',
    description:
      'Tricolor organic quinoa tossed with baby arugula, roasted pine nuts, sundried tomatoes, crumbled goat cheese, and a zesty lemon-dill vinaigrette.',
    image: '/images/greek-salad.jpg',
    alt: 'Fresh Mediterranean quinoa salad with greens and lemon dressing',
    dietary: 'Gluten-Free',
    featured: false,
  },

  // --- MAINS ---
  {
    id: 'main-lamb-chops',
    name: 'Herb-Crusted Lamb Chops',
    category: 'Mains',
    price: '$28.50',
    description:
      'Charcoal-grilled prime lamb cutlets marinated in rosemary, thyme, and lemon zest. Accompanied by roasted herb potatoes and cool minted cucumber tzatziki.',
    image: '/images/lamb-chops.jpg',
    alt: 'Grilled lamb chops with rosemary garnish, roasted potatoes, and minted tzatziki',
    dietary: "Chef's Signature",
    featured: true,
  },
  {
    id: 'main-sea-bass',
    name: 'Pan-Seared Mediterranean Sea Bass',
    category: 'Mains',
    price: '$26.00',
    description:
      'Wild-caught Mediterranean branzino fillet with crisp skin, braised fennel, charred cherry tomatoes, and a bright lemon caper emulsion.',
    image: '/images/hero.jpg',
    alt: 'Gourmet pan-seared sea bass fillet with lemon caper sauce and roasted vegetables',
    dietary: 'Gluten-Free',
    featured: false,
  },
  {
    id: 'main-moussaka',
    name: 'Traditional Greek Moussaka',
    category: 'Mains',
    price: '$18.99',
    description:
      'Layered spiced lean beef, roasted eggplant slices, and golden potatoes, crowned with a velvety nutmeg bechamel sauce baked to a deep golden crust.',
    image: '/images/lamb-chops.jpg',
    alt: 'Baked traditional moussaka slice with golden bechamel top',
    dietary: 'Comfort Classic',
    featured: false,
  },

  // --- PASTA ---
  {
    id: 'pasta-lemon-shrimp',
    name: 'Amalfi Lemon & Garlic Prawn Linguine',
    category: 'Pasta',
    price: '$21.75',
    description:
      'Bronze-die extruded linguine tossed with jumbo wild prawns, blistered cherry tomatoes, capers, minced garlic, extra virgin olive oil, and aged Parmigiano Reggiano.',
    image: '/images/mediterranean-pasta.jpg',
    alt: 'Plate of Mediterranean lemon prawn linguine with cherry tomatoes and fresh herbs',
    dietary: 'Seafood',
    featured: true,
  },
  {
    id: 'pasta-truffle-tagliatelle',
    name: 'Wild Mushroom & Truffle Tagliatelle',
    category: 'Pasta',
    price: '$19.50',
    description:
      'Fresh egg ribbons sauteed with wild chanterelles, porcini mushrooms, fresh thyme, and light white truffle cream sauce.',
    image: '/images/mediterranean-pasta.jpg',
    alt: 'Fresh tagliatelle pasta with wild mushrooms and truffle sauce',
    dietary: 'Vegetarian',
    featured: false,
  },

  // --- SPECIALS ---
  {
    id: 'special-lemon-chicken',
    name: 'Pollo al Limone & Rosemary',
    category: 'Specials',
    price: '$22.50',
    description:
      'Free-range chicken breast roasted in a cast-iron skillet with whole garlic bulbs, fresh rosemary sprigs, and a reduction of Meyer lemons and dry white wine.',
    image: '/images/hero.jpg',
    alt: 'Skillet roasted lemon rosemary chicken breast with savory herb pan sauce',
    dietary: 'Gluten-Free',
    featured: false,
  },
  {
    id: 'special-spanakopita',
    name: 'Artisan Spinach & Feta Spanakopita',
    category: 'Specials',
    price: '$15.00',
    description:
      'Flaky layers of handmade phyllo pastry stuffed with organic baby spinach, spring scallions, dill, and crumbled barrel-aged feta cheese.',
    image: '/images/bruschetta.jpg',
    alt: 'Crispy golden baked spanakopita phyllo triangle with spinach and cheese filling',
    dietary: 'Vegetarian',
    featured: false,
  },

  // --- DESSERTS ---
  {
    id: 'dessert-lemon-cake',
    name: "Nonnas Secret Amalfi Lemon Ricotta Tart",
    category: 'Desserts',
    price: '$6.50',
    description:
      'Generations-old family recipe. Delicate sweet crust layered with airy lemon ricotta filling, glossy lemon curd, powdered sugar, and candied lemon wheels.',
    image: '/images/lemon-dessert.jpg',
    alt: 'Slice of authentic lemon dessert cake with candied lemon wheel and mint leaf',
    dietary: 'House Specialty',
    featured: true,
  },
  {
    id: 'dessert-baklava',
    name: 'Pistachio & Walnut Baklava',
    category: 'Desserts',
    price: '$7.50',
    description:
      'Crisp layers of delicate phyllo pastry packed with crushed Turkish pistachios and walnuts, drenched in fragrant orange blossom honey syrup.',
    image: '/images/lemon-dessert.jpg',
    alt: 'Golden layered baklava pastry dusted with crushed emerald pistachios',
    dietary: 'Vegetarian',
    featured: false,
  },

  // --- DRINKS ---
  {
    id: 'drink-lemon-spritz',
    name: 'Limoncello & Prosecco Coastal Spritz',
    category: 'Drinks',
    price: '$11.00',
    description:
      'Artisanal handcrafted Limoncello liqueur, crisp Italian Prosecco, sparkling mineral water, garden mint leaves, and fresh lemon wheels over ice.',
    image: '/images/lemon-spritz.jpg',
    alt: 'Sparkling Limoncello spritz in a stem glass with fresh mint sprig and lemon slices',
    dietary: 'Cocktail',
    featured: true,
  },
  {
    id: 'drink-pomegranate-iced-tea',
    name: 'Mediterranean Pomegranate & Mint Cooler',
    category: 'Drinks',
    price: '$5.50',
    description:
      'Cold-brewed organic wild mountain tea infused with freshly pressed pomegranate juice, crushed garden mint, and a touch of wild honey.',
    image: '/images/lemon-spritz.jpg',
    alt: 'Refreshing iced pomegranate mint herbal cooler over ice',
    dietary: 'Non-Alcoholic',
    featured: false,
  },
];
