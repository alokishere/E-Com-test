import React from "react";

const categories = [
  {
    title: "Man's Health",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Weight Management",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Daily Wellness",
    image:
      "https://mantraherbal.in/cdn/shop/files/Our_Formulation_Process_medium.jpg?v=1754301805",
  },
  {
    title: "Skin Care",
    image:
      "https://mantraherbal.in/cdn/shop/files/Our_Mission_medium.jpg?v=1754301805",
  },
  {
    title: "Hair Care",
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2969&auto=format&fit=crop",
  },
  {
    title: "Woman's Health",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
  },
];

const ShopByCat = () => {
  return (
    <section className="py-16 bg-white font-serif">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl text-[#C5A987] tracking-wider mb-3">
            SHOP BY CATEGORY
          </h2>
          <div className="w-24 h-px bg-[#C5A987] mx-auto opacity-50"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* Card Container */}
              <div className="relative p-6 w-full aspect-square transition-transform duration-500 group-hover:scale-[1.02]">
                {/* Decorative Frame */}
                {/* Outer styling lines */}
                <div className="absolute inset-0 border border-[#C5A987]/30"></div>

                {/* Corner decorative images (simulated with pseudo-elements or css shapes if no tech) */}
                {/* Top Left Leaf */}
                <div className="absolute -top-4 -left-4 w-24 h-24 opacity-20 bg-[url('https://cdn-icons-png.flaticon.com/512/66/66250.png')] bg-no-repeat bg-contain rotate-90 pointer-events-none"></div>
                {/* Bottom Right Leaf */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-20 bg-[url('https://cdn-icons-png.flaticon.com/512/66/66250.png')] bg-no-repeat bg-contain -rotate-90 pointer-events-none"></div>

                {/* Main Image Box */}
                <div className="h-full w-full relative z-10 overflow-hidden bg-[#FAF6EA]">
                  <div className="absolute inset-4 border border-[#C5A987]/50 z-20 pointer-events-none"></div>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-6 text-2xl md:text-3xl text-[#C5A987] text-center tracking-wide group-hover:text-[#a38865] transition-colors">
                {cat.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCat;
