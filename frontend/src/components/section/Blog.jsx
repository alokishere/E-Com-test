import React from "react";

const Blog = () => {
  const data = [
    {
      image:
        "https://mantraherbal.in/cdn/shop/articles/SEOon_Saffron_Ashwagandha_Mahanarayan_Oil_For_Joint_And_Muscle_Support_3_47ecbd7c-cb4a-4452-848c-0fda00738620.jpg?v=1767432109&width=1200",
      title: "Why Warm Oil Massage Is Essential for Winter Wellness",
      dis: "Winter often brings more than just cold weather, it also triggers joint pain, muscle stiffness, body fatigue, and dryness, especially in ...",
    },
    {
      image:
        "https://mantraherbal.in/cdn/shop/articles/SEOon_dry.jpg?v=1765521878&width=1200",
      title: "Why Warm Oil Massage Is Essential for Winter Wellness",
      dis: "Winter often brings more than just cold weather, it also triggers joint pain, muscle stiffness, body fatigue, and dryness, especially in ...",
    },
    {
      image:
        "https://mantraherbal.in/cdn/shop/articles/SEOon_Gulab_Arka_Blog_Post_1_ad850f72-7391-41a4-905f-6cb562ba2349.jpg?v=1759143633&width=1200",
      title: "Why Warm Oil Massage Is Essential for Winter Wellness",
      dis: "Winter often brings more than just cold weather, it also triggers joint pain, muscle stiffness, body fatigue, and dryness, especially in ...",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-20 mb-12 rounded-tl-[35px] py-2 rounded-br-[35px] border-[3px] border-[#A7F3D0] shadow-lg bg-[#1D4D6F]">
          <h2 className="text-3xl font-bold text-[#FFFF] tracking-tight uppercase ">
            Blog
          </h2>
          <button className="text-sm hidden sm:block font-semibold text-[#FFFF] hover:text-black transition-colors border-b-2 border-transparent hover:border-black uppercase tracking-wider">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.map((item, index) => (
            <article key={index} className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl mb-6 aspect-4/3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {item.dis}
              </p>
              <div className="mt-4 inline-block text-sm font-bold text-gray-900 border-b border-black pb-0.5">
                Read More
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
