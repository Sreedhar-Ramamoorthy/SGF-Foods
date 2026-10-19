export const GROUP_URL = import.meta.env.VITE_GROUP_URL || 'http://localhost:5173'
export const GROUP_NAME = 'Sri Gopal Group'

export const COMPANY = {
  name: 'Sri Gopal Foods',
  address: ['No: 8/1169, Alagu Nagar, Poonampalayam', 'Manachanallur Tk, Manachanallur Block', 'Tiruchirappalli, Tamil Nadu – 621009'],
}

export const FREE_DELIVERY_AT = 499
export const DELIVERY_FEE = 40

// Ids match the sections on the group landing page (used for deep links back to it).
export const GROUP_BUSINESSES = [
  { id: 'transport', name: 'Sri Gopal Transports', color: '#3fa9ff' },
  { id: 'farms', name: 'Sri Gopal Farms', color: '#7bd34f' },
  { id: 'investments', name: 'Sri Gopal Investments', color: '#ffc933' },
  { id: 'food', name: 'Sri Gopal Foods', color: '#ff7a45' },
  { id: 'realestate', name: 'Sri Gopal Real Estates', color: '#b98bff' },
]

// NOTE: the menu, prices, combos and reviews below are SAMPLE content — replace with the real menu and genuine customer reviews before launch.

export const CATEGORIES = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'south', label: 'South Indian', icon: '🍛' },
  { id: 'north', label: 'North Indian', icon: '🥘' },
  { id: 'chinese', label: 'Chinese', icon: '🥡' },
  { id: 'fast', label: 'Fast Food', icon: '🍔' },
  { id: 'desserts', label: 'Desserts', icon: '🍨' },
  { id: 'drinks', label: 'Beverages', icon: '🥤' },
]

export const MENU = [
  { id: 'biryani', name: 'Chettinad Chicken Biryani', desc: 'Seeraga samba rice slow-cooked dum style with fiery Chettinad masala.', emoji: '🍛', cat: 'south', veg: false, price: 249, rating: 4.9, time: 25, tag: 'Bestseller', bg: '#ffe0c7' },
  { id: 'dosa', name: 'Ghee Roast Masala Dosa', desc: 'Paper-thin crispy dosa, golden ghee, spiced potato masala and chutneys.', emoji: '🫓', cat: 'south', veg: true, price: 129, rating: 4.8, time: 15, bg: '#fff0c2' },
  { id: 'tiffin', name: 'Mini Tiffin Combo', desc: 'Idli, vada, pongal and kesari with sambar and three chutneys.', emoji: '🍱', cat: 'south', veg: true, price: 169, rating: 4.7, time: 15, bg: '#e3f4d7' },
  { id: 'chicken65', name: 'Chicken 65', desc: 'Crispy, curry-leaf tempered chicken with a hit of red chilli.', emoji: '🍗', cat: 'south', veg: false, price: 199, rating: 4.8, time: 20, tag: 'Spicy', bg: '#ffd9d0' },
  { id: 'paneer', name: 'Paneer Butter Masala', desc: 'Soft paneer cubes in a velvety tomato-cashew gravy.', emoji: '🥘', cat: 'north', veg: true, price: 229, rating: 4.7, time: 20, bg: '#ffe4cc' },
  { id: 'butterchicken', name: 'Butter Chicken & Naan', desc: 'Tandoori chicken in silky makhani sauce with two butter naans.', emoji: '🍲', cat: 'north', veg: false, price: 279, rating: 4.8, time: 25, tag: 'Chef special', bg: '#ffdcc2' },
  { id: 'noodles', name: 'Veg Hakka Noodles', desc: 'Wok-tossed noodles with crunchy vegetables and soy-garlic.', emoji: '🍜', cat: 'chinese', veg: true, price: 159, rating: 4.6, time: 15, bg: '#fff1cf' },
  { id: 'dimsum', name: 'Chilli Chicken Dim Sum', desc: 'Steamed dumplings with a sweet-chilli dipping sauce.', emoji: '🥟', cat: 'chinese', veg: false, price: 189, rating: 4.7, time: 18, bg: '#f3e6ff' },
  { id: 'burger', name: 'Double Smash Burger', desc: 'Two smashed patties, cheddar, caramelised onions and house sauce.', emoji: '🍔', cat: 'fast', veg: false, price: 219, rating: 4.8, time: 15, tag: 'New', bg: '#ffe7c4' },
  { id: 'pizza', name: 'Farmhouse Pizza', desc: 'Wood-fired base, mozzarella, peppers, mushrooms and olives.', emoji: '🍕', cat: 'fast', veg: true, price: 299, rating: 4.6, time: 22, bg: '#ffe2d4' },
  { id: 'fries', name: 'Peri-Peri Loaded Fries', desc: 'Crispy fries, peri-peri dust, cheese sauce and jalapeños.', emoji: '🍟', cat: 'fast', veg: true, price: 119, rating: 4.5, time: 10, bg: '#fff3c4' },
  { id: 'lava', name: 'Choco Lava Cake', desc: 'Warm chocolate cake with a molten centre.', emoji: '🍰', cat: 'desserts', veg: true, price: 149, rating: 4.9, time: 10, tag: 'Must try', bg: '#f1e1d6' },
  { id: 'falooda', name: 'Kulfi Falooda', desc: 'Malai kulfi, rose syrup, basil seeds and vermicelli.', emoji: '🍨', cat: 'desserts', veg: true, price: 129, rating: 4.7, time: 8, bg: '#ffe0ee' },
  { id: 'coffee', name: 'Kumbakonam Filter Coffee', desc: 'Strong decoction, frothy milk, served in a davara set.', emoji: '☕', cat: 'drinks', veg: true, price: 59, rating: 4.9, time: 5, bg: '#ecdcca' },
  { id: 'lassi', name: 'Alphonso Mango Lassi', desc: 'Thick, creamy lassi blended with ripe Alphonso mangoes.', emoji: '🥭', cat: 'drinks', veg: true, price: 89, rating: 4.8, time: 5, bg: '#fff0bf' },
  { id: 'soda', name: 'Fresh Lime Soda', desc: 'Sweet-salt lime soda with mint. Perfect with biryani.', emoji: '🍋', cat: 'drinks', veg: true, price: 69, rating: 4.6, time: 5, bg: '#eef7c9' },
]

export const COMBOS = [
  { id: 'c-feast', name: 'Biryani Feast', desc: 'Biryani + Chicken 65 + Mango Lassi', emoji: '🍛', extras: ['🍗', '🥭'], price: 449, mrp: 537, veg: false, g: ['#ff7a45', '#ff3d6e'] },
  { id: 'c-tiffin', name: 'Morning Tiffin', desc: 'Masala Dosa + Mini Tiffin + Filter Coffee', emoji: '🫓', extras: ['🍱', '☕'], price: 299, mrp: 357, veg: true, g: ['#ffb703', '#fb8500'] },
  { id: 'c-burger', name: 'Burger Night', desc: 'Smash Burger + Loaded Fries + Lime Soda', emoji: '🍔', extras: ['🍟', '🍋'], price: 329, mrp: 407, veg: false, g: ['#e63946', '#9d0208'] },
  { id: 'c-north', name: 'Punjabi Thali', desc: 'Paneer Butter Masala + Naan + Falooda', emoji: '🥘', extras: ['🫓', '🍨'], price: 379, mrp: 458, veg: true, g: ['#2a9d8f', '#1d6f66'] },
  { id: 'c-wok', name: 'Wok Box', desc: 'Hakka Noodles + Dim Sum + Lime Soda', emoji: '🍜', extras: ['🥟', '🍋'], price: 349, mrp: 417, veg: false, g: ['#7b2cbf', '#4c1d95'] },
]

export const ITEMS = Object.fromEntries([...MENU, ...COMBOS].map((d) => [d.id, d]))

export const REVIEWS = [
  { name: 'Priya S.', city: 'Chennai', text: 'The Chettinad biryani tastes exactly like home. Arrived piping hot in 22 minutes!', color: '#ff7a45' },
  { name: 'Arun K.', city: 'Coimbatore', text: 'Filter coffee delivered still frothy. I did not think that was possible.', color: '#2a9d8f' },
  { name: 'Fathima R.', city: 'Madurai', text: 'Live tracking is spot on and the packaging is properly spill-proof. 10/10.', color: '#7b2cbf' },
  { name: 'Karthik M.', city: 'Trichy', text: 'Biryani Feast combo is ridiculous value. Feeds two hungry people easily.', color: '#e63946' },
  { name: 'Divya N.', city: 'Bengaluru', text: 'Ghee roast dosa stayed crisp all the way. Whatever they are doing, it works.', color: '#fb8500' },
  { name: 'Rahul V.', city: 'Salem', text: 'Ordered at 11pm, still got it in 30 minutes. The smash burger is legit.', color: '#1d6f66' },
  { name: 'Meena J.', city: 'Puducherry', text: 'Clean, fresh and not oily. Finally a delivery app I trust for my kids.', color: '#ff3d6e' },
  { name: 'Vijay A.', city: 'Tirunelveli', text: 'Choco lava cake had a perfect molten centre. Dangerous to have this nearby.', color: '#4c1d95' },
]
