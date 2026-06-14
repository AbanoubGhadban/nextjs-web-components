export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  status: "online" | "offline" | "busy" | "away";
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
}

export function getProducts(): Product[] {
  return [
    {
      id: "1",
      name: "Wireless Headphones Pro",
      description:
        "Premium noise-canceling wireless headphones with 40-hour battery life, spatial audio, and adaptive EQ.",
      price: 299.99,
      category: "Electronics",
      stock: 45,
      rating: 4.8,
      image: "🎧",
    },
    {
      id: "2",
      name: "Mechanical Keyboard RGB",
      description:
        "Hot-swappable mechanical keyboard with per-key RGB, gasket mount, PBT keycaps, and USB-C.",
      price: 159.99,
      category: "Electronics",
      stock: 120,
      rating: 4.6,
      image: "⌨️",
    },
    {
      id: "3",
      name: "Ultrawide Monitor 34\"",
      description:
        "34-inch curved ultrawide QHD monitor with 165Hz refresh rate, HDR400, and USB-C PD.",
      price: 549.99,
      category: "Electronics",
      stock: 18,
      rating: 4.7,
      image: "🖥️",
    },
    {
      id: "4",
      name: "Ergonomic Standing Desk",
      description:
        "Electric height-adjustable standing desk with memory presets, cable management, and bamboo top.",
      price: 699.99,
      category: "Furniture",
      stock: 30,
      rating: 4.9,
      image: "🪑",
    },
    {
      id: "5",
      name: "Smart Water Bottle",
      description:
        "Temperature-tracking smart water bottle with hydration reminders and LED temperature display.",
      price: 39.99,
      category: "Accessories",
      stock: 200,
      rating: 4.3,
      image: "🍶",
    },
    {
      id: "6",
      name: "Laptop Backpack Premium",
      description:
        "Anti-theft laptop backpack with USB charging port, waterproof fabric, and hidden pockets.",
      price: 89.99,
      category: "Accessories",
      stock: 85,
      rating: 4.5,
      image: "🎒",
    },
    {
      id: "7",
      name: "Wireless Mouse Ergonomic",
      description:
        "Vertical ergonomic wireless mouse with adjustable DPI, silent clicks, and Bluetooth 5.0.",
      price: 49.99,
      category: "Electronics",
      stock: 150,
      rating: 4.4,
      image: "🖱️",
    },
    {
      id: "8",
      name: "4K Webcam Studio",
      description:
        "4K HDR webcam with auto-framing, built-in ring light, noise-canceling mic, and privacy shutter.",
      price: 179.99,
      category: "Electronics",
      stock: 55,
      rating: 4.6,
      image: "📸",
    },
  ];
}

export function getProduct(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function getTeamMembers(): TeamMember[] {
  return [
    { name: "Sarah Chen", role: "Lead Engineer", avatar: "", status: "online" },
    { name: "Marcus Johnson", role: "Product Designer", avatar: "", status: "online" },
    { name: "Aisha Patel", role: "Backend Developer", avatar: "", status: "busy" },
    { name: "Tom Wilson", role: "DevOps Engineer", avatar: "", status: "away" },
    { name: "Elena Rodriguez", role: "Frontend Developer", avatar: "", status: "online" },
    { name: "James Park", role: "QA Engineer", avatar: "", status: "offline" },
  ];
}

export function getActivities(): Activity[] {
  return [
    {
      id: "1",
      user: "Sarah Chen",
      action: "deployed",
      target: "v2.4.0 to production",
      time: "5 min ago",
    },
    {
      id: "2",
      user: "Marcus Johnson",
      action: "updated",
      target: "dashboard design specs",
      time: "12 min ago",
    },
    {
      id: "3",
      user: "Aisha Patel",
      action: "merged",
      target: "PR #342 - Auth refactor",
      time: "28 min ago",
    },
    {
      id: "4",
      user: "Tom Wilson",
      action: "configured",
      target: "new monitoring alerts",
      time: "1 hour ago",
    },
    {
      id: "5",
      user: "Elena Rodriguez",
      action: "created",
      target: "web components library",
      time: "2 hours ago",
    },
  ];
}

export function getDashboardStats() {
  return {
    revenue: { value: "$48,250", change: "+12.5%", trend: "up" as const },
    users: { value: "2,847", change: "+8.2%", trend: "up" as const },
    orders: { value: "1,234", change: "-3.1%", trend: "down" as const },
    conversion: { value: "3.24%", change: "+0.8%", trend: "up" as const },
  };
}

export function getChartData() {
  return [
    { label: "Mon", value: 120 },
    { label: "Tue", value: 180 },
    { label: "Wed", value: 150 },
    { label: "Thu", value: 220 },
    { label: "Fri", value: 280 },
    { label: "Sat", value: 190 },
    { label: "Sun", value: 140 },
  ];
}
