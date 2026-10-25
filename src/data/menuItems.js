/**
 * Little Lemon Restaurant - Full 20-Dish Culinary Menu Dataset
 * Organized into 8 categories with rich nutritional, ingredient, and pairing details.
 */

export const MENU_CATEGORIES = [
  'All Dishes',
  'Starters',
  'Salads',
  'Pasta',
  'Main Courses',
  'Mediterranean Specials',
  'Vegetarian & Vegan',
  'Desserts',
  'Drinks',
];

export const MENU_ITEMS = [
  // --- STARTERS ---
  {
    id: 'bruschetta-al-pomodoro',
    name: 'Bruschetta al Pomodoro',
    category: 'Starters',
    price: '$7.99',
    priceNumber: 7.99,
    description:
      'Grilled artisan sourdough rubbed with garlic cloves, topped with diced vine-ripened Roma tomatoes, fresh basil ribbons, and aged Modena balsamic glaze.',
    fullDescription:
      'A beloved Mediterranean classic celebrating simple perfection. We start with daily wood-fired artisan sourdough, rub the warm crust with fresh garlic, and crown it with diced field-grown Roma tomatoes marinated in cold-pressed Kalamata extra virgin olive oil, sweet basil, sea salt flakes, and a 12-year aged Modena balsamic reduction.',
    image: '/images/bruschetta.jpg',
    alt: 'Toasted artisan bruschetta with diced marinated tomatoes and fresh basil',
    dietary: 'Vegetarian',
    prepTime: '8-10 mins',
    calories: '280 kcal',
    ingredients: ['Artisan Sourdough', 'Roma Tomatoes', 'Fresh Basil', 'Garlic', 'Extra Virgin Olive Oil', 'Balsamic Glaze'],
    featured: true,
  },
  {
    id: 'santorini-mezze-platter',
    name: 'Santorini Mezze Platter',
    category: 'Starters',
    price: '$14.50',
    priceNumber: 14.50,
    description:
      'Velvety house-made chickpea hummus with paprika, warm pita triangles, crispy falafel, kalamata olives, and marinated artichoke hearts.',
    fullDescription:
      'Designed for convivial sharing. Our signature spread features silky chickpea hummus drizzled with Greek extra virgin olive oil and smoked Spanish paprika, golden herbaceous falafel patties, cured Kalamata olives, fire-roasted sweet peppers, marinated artichoke hearts, and charred flatbread pita baked fresh to order.',
    image: '/images/mezze-platter.jpg',
    alt: 'Mediterranean mezze platter with hummus, pita, falafel, and olives',
    dietary: 'Vegan',
    prepTime: '12-15 mins',
    calories: '490 kcal',
    ingredients: ['Chickpea Hummus', 'Herb Falafel', 'Pita Bread', 'Kalamata Olives', 'Artichoke Hearts', 'Olive Oil'],
    featured: true,
  },
  {
    id: 'crispy-lemon-calamari',
    name: 'Crispy Lemon Calamari',
    category: 'Starters',
    price: '$13.25',
    priceNumber: 13.25,
    description:
      'Tender calamari flash-fried with Mediterranean herbs and sea salt, served with garlic saffron aioli and charred Meyer lemon wedges.',
    fullDescription:
      'Wild Atlantic squid rings and tentacles dusted in light semolina flour seasoned with oregano and sea salt flakes. Flash-fried until crisp and tender, served alongside house-whipped saffron garlic aioli and wood-charred Meyer lemons.',
    image: '/images/hero.jpg',
    alt: 'Golden crispy calamari served with charred lemon and garlic aioli',
    dietary: 'Seafood',
    prepTime: '10-12 mins',
    calories: '390 kcal',
    ingredients: ['Wild Squid', 'Semolina Herb Crust', 'Garlic Saffron Aioli', 'Meyer Lemons', 'Fresh Parsley'],
    featured: false,
  },

  // --- SALADS ---
  {
    id: 'classic-greek-salad',
    name: 'Classic Greek Village Salad',
    category: 'Salads',
    price: '$12.99',
    priceNumber: 12.99,
    description:
      'Crispy romaine hearts, Persian cucumbers, heirloom tomatoes, kalamata olives, red onions, and an authentic slab of barrel-aged Greek feta with wild oregano.',
    fullDescription:
      'The quintessential taste of the Aegean coast. Ripe heirloom tomatoes, crunchy Persian cucumbers, sliced sweet red onions, and plump Kalamata olives tossed in a light Greek red wine vinaigrette. Topped with a generous solid slab of imported barrel-aged sheep milk feta and hand-crushed mountain oregano.',
    image: '/images/greek-salad.jpg',
    alt: 'Authentic Greek salad with feta slab, kalamata olives, cucumbers, and tomatoes',
    dietary: 'Vegetarian',
    prepTime: '8-10 mins',
    calories: '340 kcal',
    ingredients: ['Romaine Hearts', 'Heirloom Tomatoes', 'Persian Cucumbers', 'Barrel-Aged Feta', 'Kalamata Olives', 'Greek Oregano'],
    featured: true,
  },
  {
    id: 'mediterranean-quinoa-bowl',
    name: 'Mediterranean Quinoa & Herb Bowl',
    category: 'Salads',
    price: '$11.50',
    priceNumber: 11.50,
    description:
      'Tricolor organic quinoa tossed with baby arugula, roasted pine nuts, sundried tomatoes, crumbled goat cheese, and a zesty lemon-dill vinaigrette.',
    fullDescription:
      'A nutrient-dense grain salad balancing earthy quinoa with peppery wild arugula, tender sun-dried tomatoes, toasted Mediterranean pine nuts, and tangy goat cheese crumbles, finished with freshly squeezed lemon juice and dill oil.',
    image: '/images/greek-salad.jpg',
    alt: 'Fresh organic quinoa bowl with arugula, pine nuts, and lemon vinaigrette',
    dietary: 'Gluten-Free',
    prepTime: '10 mins',
    calories: '380 kcal',
    ingredients: ['Tricolor Quinoa', 'Wild Arugula', 'Roasted Pine Nuts', 'Sundried Tomatoes', 'Goat Cheese', 'Lemon Dill Vinaigrette'],
    featured: false,
  },

  // --- PASTA ---
  {
    id: 'amalfi-lemon-prawn-linguine',
    name: 'Amalfi Lemon & Garlic Prawn Linguine',
    category: 'Pasta',
    price: '$21.75',
    priceNumber: 21.75,
    description:
      'Bronze-die extruded linguine tossed with jumbo wild prawns, blistered cherry tomatoes, capers, minced garlic, extra virgin olive oil, and aged Parmigiano Reggiano.',
    fullDescription:
      'Imported artisanal bronze-cut linguine cooked al dente, swirled in a silky emulsion of cold-pressed olive oil, minced sweet garlic, white wine, and Meyer lemon zest. Tossed with pan-roasted jumbo wild prawns, burst cherry tomatoes, Sicilian capers, and aged 24-month Parmigiano Reggiano.',
    image: '/images/mediterranean-pasta.jpg',
    alt: 'Plate of Mediterranean lemon prawn linguine with cherry tomatoes and fresh herbs',
    dietary: 'Seafood',
    prepTime: '15-18 mins',
    calories: '580 kcal',
    ingredients: ['Bronze-Die Linguine', 'Jumbo Wild Prawns', 'Cherry Tomatoes', 'Amalfi Lemon Zest', 'Sicilian Capers', 'Parmigiano Reggiano'],
    featured: true,
  },
  {
    id: 'wild-mushroom-truffle-tagliatelle',
    name: 'Wild Mushroom & Truffle Tagliatelle',
    category: 'Pasta',
    price: '$19.50',
    priceNumber: 19.50,
    description:
      'Fresh egg ribbons sauteed with wild chanterelles, porcini mushrooms, fresh thyme, and light white truffle cream sauce.',
    fullDescription:
      'Hand-cut golden egg tagliatelle ribbons folded gently with woodland chanterelle and porcini mushrooms sauteed in sweet butter and garlic. Finished with white wine, fresh thyme leaves, and an intoxicating drizzle of Italian white truffle essence.',
    image: '/images/mediterranean-pasta.jpg',
    alt: 'Fresh tagliatelle pasta with wild mushrooms and truffle cream sauce',
    dietary: 'Vegetarian',
    prepTime: '14-16 mins',
    calories: '610 kcal',
    ingredients: ['Handmade Egg Tagliatelle', 'Chanterelle Mushrooms', 'Porcini', 'Thyme', 'White Truffle Oil', 'Light Cream'],
    featured: false,
  },

  // --- MAIN COURSES ---
  {
    id: 'herb-crusted-lamb-chops',
    name: 'Herb-Crusted Lamb Chops',
    category: 'Main Courses',
    price: '$28.50',
    priceNumber: 28.50,
    description:
      'Charcoal-grilled prime lamb cutlets marinated in rosemary, thyme, and lemon zest. Accompanied by roasted herb potatoes and cool minted cucumber tzatziki.',
    fullDescription:
      'Prime pasture-raised lamb chops marinated for 24 hours in crushed garlic, mountain rosemary, thyme, cracked black pepper, and lemon zest. Seared over glowing charcoal embers to a succulent medium-rare and served with olive-oil roasted baby potatoes and our house-churned minted cucumber tzatziki.',
    image: '/images/lamb-chops.jpg',
    alt: 'Grilled lamb chops with rosemary garnish, roasted potatoes, and minted tzatziki',
    dietary: "Chef's Signature",
    prepTime: '18-22 mins',
    calories: '680 kcal',
    ingredients: ['Prime Lamb Chops', 'Fresh Rosemary & Thyme', 'Roasted Baby Potatoes', 'Minted Greek Tzatziki', 'Charred Lemons'],
    featured: true,
  },
  {
    id: 'pan-seared-mediterranean-sea-bass',
    name: 'Pan-Seared Mediterranean Sea Bass',
    category: 'Main Courses',
    price: '$26.00',
    priceNumber: 26.00,
    description:
      'Wild-caught Mediterranean branzino fillet with crisp skin, braised fennel, charred cherry tomatoes, and a bright lemon caper emulsion.',
    fullDescription:
      'A true showpiece of coastal dining. Fresh Mediterranean branzino seared in a cast-iron pan until the skin is shatteringly crisp while the delicate white flesh remains moist and tender. Rested over slow-braised sweet fennel bulbs and drizzled with a velvety lemon-herb emulsion.',
    image: '/images/hero.jpg',
    alt: 'Gourmet pan-seared sea bass fillet with lemon caper sauce and braised fennel',
    dietary: 'Gluten-Free',
    prepTime: '16-20 mins',
    calories: '510 kcal',
    ingredients: ['Wild Mediterranean Branzino', 'Braised Fennel', 'Cherry Tomatoes', 'Capers', 'Lemon Herb Emulsion'],
    featured: false,
  },
  {
    id: 'traditional-greek-moussaka',
    name: 'Traditional Greek Moussaka',
    category: 'Main Courses',
    price: '$18.99',
    priceNumber: 18.99,
    description:
      'Layered spiced lean beef, roasted eggplant slices, and golden potatoes, crowned with a velvety nutmeg bechamel sauce baked to a deep golden crust.',
    fullDescription:
      'Prepared according to Adrian’s grandmother’s Athens recipe. Alternating layers of tender roasted eggplant, thinly sliced golden potatoes, and spiced ground beef simmered with cinnamon, allspice, and rich tomato passata. Finished with a thick blanket of creamy, golden-baked nutmeg bechamel.',
    image: '/images/lamb-chops.jpg',
    alt: 'Baked traditional moussaka slice with golden bechamel crust',
    dietary: 'Comfort Classic',
    prepTime: '15 mins',
    calories: '640 kcal',
    ingredients: ['Roasted Eggplant', 'Potatoes', 'Spiced Beef Ragu', 'Cinnamon & Nutmeg', 'Creamy Bechamel'],
    featured: false,
  },

  // --- MEDITERRANEAN SPECIALS ---
  {
    id: 'pollo-al-limone-rosemary',
    name: 'Pollo al Limone & Rosemary',
    category: 'Mediterranean Specials',
    price: '$22.50',
    priceNumber: 22.50,
    description:
      'Free-range chicken breast roasted in a cast-iron skillet with whole garlic bulbs, fresh rosemary sprigs, and a reduction of Meyer lemons and dry white wine.',
    fullDescription:
      'Tender organic chicken breast pan-roasted with smashed garlic cloves, fragrant rosemary sprigs, and sweet shallots, deglazed with crisp Pinot Grigio and Meyer lemon juice. Served with steamed tenderstem broccoli and wild rice pilaf.',
    image: '/images/hero.jpg',
    alt: 'Skillet roasted lemon rosemary chicken breast with savory herb pan sauce',
    dietary: 'Gluten-Free',
    prepTime: '16-18 mins',
    calories: '520 kcal',
    ingredients: ['Free-Range Chicken Breast', 'Meyer Lemons', 'Fresh Rosemary', 'White Wine Reduction', 'Garlic Cloves'],
    featured: false,
  },
  {
    id: 'artisan-spinach-spanakopita',
    name: 'Artisan Spinach & Feta Spanakopita',
    category: 'Mediterranean Specials',
    price: '$15.00',
    priceNumber: 15.00,
    description:
      'Flaky layers of handmade phyllo pastry stuffed with organic baby spinach, spring scallions, dill, and crumbled barrel-aged feta cheese.',
    fullDescription:
      'Crispy, golden sheets of paper-thin phyllo pastry rolled and brushed with Greek butter, enclosing a savory filling of fresh wilted baby spinach, spring leeks, dill, eggs, and authentic Greek sheep feta cheese.',
    image: '/images/bruschetta.jpg',
    alt: 'Crispy golden baked spanakopita phyllo triangle with spinach and feta cheese',
    dietary: 'Vegetarian',
    prepTime: '12-14 mins',
    calories: '440 kcal',
    ingredients: ['Handmade Phyllo Pastry', 'Baby Spinach', 'Barrel-Aged Feta', 'Fresh Dill', 'Spring Scallions'],
    featured: false,
  },

  // --- VEGETARIAN & VEGAN OPTIONS ---
  {
    id: 'roasted-stuffed-bell-peppers',
    name: 'Gemista Stuffed Sweet Peppers',
    category: 'Vegetarian & Vegan',
    price: '$16.50',
    priceNumber: 16.50,
    description:
      'Sweet red and yellow bell peppers slow-roasted with a savory herb rice filling, pine nuts, currants, and Greek olive oil drizzle.',
    fullDescription:
      'A beloved vegan staple across Mediterranean islands. Ripe farm-fresh bell peppers hollowed and filled with short-grain rice sauteed with fresh herbs, sweet currants, toasted pine nuts, grated zucchini, and vine tomatoes. Slow-roasted in olive oil until sweet and caramelized.',
    image: '/images/mezze-platter.jpg',
    alt: 'Roasted stuffed bell peppers with Mediterranean herb rice and pine nuts',
    dietary: 'Vegan',
    prepTime: '14-16 mins',
    calories: '410 kcal',
    ingredients: ['Bell Peppers', 'Herb Short-Grain Rice', 'Pine Nuts', 'Currants', 'Greek Olive Oil', 'Fresh Mint'],
    featured: false,
  },
  {
    id: 'grilled-halloumi-vegetable-skewer',
    name: 'Grilled Halloumi & Vegetable Skewers',
    category: 'Vegetarian & Vegan',
    price: '$17.00',
    priceNumber: 17.00,
    description:
      'Cypriot halloumi cheese cubes skewered with zucchini, cherry tomatoes, and red onions, grilled over charcoal with oregano honey glaze.',
    fullDescription:
      'Thick cubes of authentic Cypriot halloumi cheese skewered with fresh zucchini rounds, sweet red peppers, and red onions. Charcoal-grilled until charred and squeaky, drizzled with wildflower honey, lemon juice, and wild oregano.',
    image: '/images/greek-salad.jpg',
    alt: 'Grilled halloumi cheese skewers with charred vegetables and honey oregano glaze',
    dietary: 'Vegetarian',
    prepTime: '12-15 mins',
    calories: '460 kcal',
    ingredients: ['Cypriot Halloumi', 'Zucchini', 'Cherry Tomatoes', 'Red Onions', 'Wildflower Honey', 'Oregano'],
    featured: false,
  },

  // --- DESSERTS ---
  {
    id: 'amalfi-lemon-ricotta-tart',
    name: "Nonna's Amalfi Lemon Ricotta Tart",
    category: 'Desserts',
    price: '$6.50',
    priceNumber: 6.50,
    description:
      'Generations-old family recipe. Delicate sweet crust layered with airy lemon ricotta filling, glossy lemon curd, and candied lemon wheels.',
    fullDescription:
      'The signature dessert that gave Little Lemon its name. A buttery shortcrust pastry shell filled with whipped Italian whole-milk ricotta perfumed with Amalfi lemon zest, topped with a velvety layer of tart lemon curd, dusted with powdered sugar, and crowned with a candied citrus wheel and garden mint.',
    image: '/images/lemon-dessert.jpg',
    alt: 'Slice of authentic lemon dessert cake with candied lemon wheel and mint leaf',
    dietary: 'House Specialty',
    prepTime: '5 mins',
    calories: '360 kcal',
    ingredients: ['Amalfi Lemon Zest & Curd', 'Whole Milk Ricotta', 'Butter Shortcrust', 'Powdered Sugar', 'Candied Citrus'],
    featured: true,
  },
  {
    id: 'pistachio-walnut-baklava',
    name: 'Pistachio & Walnut Baklava',
    category: 'Desserts',
    price: '$7.50',
    priceNumber: 7.50,
    description:
      'Crisp layers of delicate phyllo pastry packed with crushed Turkish pistachios and walnuts, drenched in fragrant orange blossom honey syrup.',
    fullDescription:
      'Thirty gossamer-thin layers of hand-rolled phyllo pastry layered with clarified butter, packed with finely chopped pistachios and walnuts spiced with cinnamon. Soaked in hot orange blossom honey syrup and served crisp and warm.',
    image: '/images/lemon-dessert.jpg',
    alt: 'Golden layered baklava pastry drenched in honey and sprinkled with crushed pistachios',
    dietary: 'Vegetarian',
    prepTime: '5 mins',
    calories: '420 kcal',
    ingredients: ['Paper-thin Phyllo', 'Pistachios & Walnuts', 'Orange Blossom Water', 'Wildflower Honey', 'Cinnamon'],
    featured: false,
  },
  {
    id: 'greek-honey-yogurt-parfait',
    name: 'Greek Yogurt & Fig Parfait',
    category: 'Desserts',
    price: '$6.75',
    priceNumber: 6.75,
    description:
      'Authentic strained thick Greek yogurt topped with stewed Black Mission figs, roasted walnuts, and thyme-infused Aegean honey.',
    fullDescription:
      'Traditional strained Greek sheep milk yogurt with rich creaminess, topped with sweet stewed Greek figs, toasted walnut halves, and an aromatic drizzle of thyme blossom honey.',
    image: '/images/lemon-dessert.jpg',
    alt: 'Creamy Greek yogurt parfait with stewed figs and honey drizzle',
    dietary: 'Gluten-Free',
    prepTime: '5 mins',
    calories: '310 kcal',
    ingredients: ['Strained Greek Yogurt', 'Black Mission Figs', 'Toasted Walnuts', 'Thyme Blossom Honey'],
    featured: false,
  },

  // --- DRINKS ---
  {
    id: 'limoncello-prosecco-spritz',
    name: 'Limoncello & Prosecco Coastal Spritz',
    category: 'Drinks',
    price: '$11.00',
    priceNumber: 11.00,
    description:
      'Artisanal handcrafted Limoncello liqueur, crisp Italian Prosecco, sparkling mineral water, garden mint leaves, and fresh lemon wheels over ice.',
    fullDescription:
      'Bright, effervescent, and deeply refreshing. We blend house-steeped Amalfi Limoncello liqueur with sparkling dry Prosecco DOC, top with San Pellegrino mineral water, bruised garden mint, and Meyer lemon wheels over cracked crystal ice.',
    image: '/images/lemon-spritz.jpg',
    alt: 'Sparkling Limoncello spritz in a stem glass with fresh mint sprig and lemon slices',
    dietary: 'Cocktail',
    prepTime: '3-5 mins',
    calories: '160 kcal',
    ingredients: ['House Limoncello', 'Prosecco DOC', 'San Pellegrino Sparkling Water', 'Fresh Garden Mint', 'Meyer Lemon'],
    featured: true,
  },
  {
    id: 'pomegranate-mint-cooler',
    name: 'Pomegranate & Wild Mint Cooler',
    category: 'Drinks',
    price: '$5.50',
    priceNumber: 5.50,
    description:
      'Cold-brewed organic wild mountain tea infused with freshly pressed pomegranate juice, crushed garden mint, and a touch of wild honey.',
    fullDescription:
      'A vibrant alcohol-free refreshment. Greek mountain herbal tea brewed cold for 12 hours, blended with 100% tart pomegranate juice, crushed sweet mint leaves, and raw orange blossom honey, served over crushed ice.',
    image: '/images/lemon-spritz.jpg',
    alt: 'Refreshing iced pomegranate mint herbal cooler over ice with lemon garnish',
    dietary: 'Non-Alcoholic',
    prepTime: '3 mins',
    calories: '110 kcal',
    ingredients: ['Greek Mountain Tea', 'Pressed Pomegranate Juice', 'Crushed Sweet Mint', 'Raw Honey', 'Lemon Slice'],
    featured: false,
  },
  {
    id: 'mediterranean-espresso-freddo',
    name: 'Freddo Espresso with Cardamom',
    category: 'Drinks',
    price: '$4.75',
    priceNumber: 4.75,
    description:
      'Double shot of dark roasted espresso frothed over ice with a hint of green cardamom and sweet cream foam.',
    fullDescription:
      'The beloved Greek afternoon ritual. A double shot of premium espresso whipped vigorously with ice until thick and velvety, infused with ground green cardamom and topped with optional creamy cold milk foam.',
    image: '/images/lemon-spritz.jpg',
    alt: 'Iced Freddo espresso with thick velvety coffee crema in a tall glass',
    dietary: 'Coffee',
    prepTime: '3-4 mins',
    calories: '80 kcal',
    ingredients: ['Double Espresso Shot', 'Cracked Ice', 'Green Cardamom', 'Cold Milk Foam'],
    featured: false,
  },
];
