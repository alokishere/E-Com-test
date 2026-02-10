import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Star, ThumbsUp, FileText, Lightbulb, HelpCircle, MessageSquare } from "lucide-react";

const ProductDetailsBottom = ({ data }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [activeSection, setActiveSection] = useState("description");
  const [isScrolling, setIsScrolling] = useState(false);

  // Refs for each section
  const descriptionRef = useRef(null);
  const ingredientsRef = useRef(null);
  const faqRef = useRef(null);
  const reviewsRef = useRef(null);

  const sectionRefs = {
    description: descriptionRef,
    ingredients: ingredientsRef,
    faq: faqRef,
    reviews: reviewsRef,
  };

  // Sample data
  const productData = {
    description: `Pamper your skin with the age-old tradition of Ubtan and let your dull, tanned skin rejuvenate, feel fresh & bright. Undo the effects of tan, pollution, dirt, harmful UV rays, and harsh weather conditions.`,
    
    keyIngredients: [
      {
        name: "Turmeric",
        description: "With anti-Inflammatory and antiseptic properties, Turmeric protects the skin naturally. It revives the skin by bringing out its natural glow while delaying premature aging.",
        icon: "🌿"
      },
      {
        name: "Walnut Beads",
        description: "Walnut Beads exfoliates the dead cells from the upper layer of the skin leaving the skin refreshed and bright.",
        icon: "🥜"
      },
      {
        name: "Saffron",
        description: "Saffron contains many vitamins and antioxidants that are beneficial for the skin. It not only adds to the skin's natural radiance & glow but also soothes it.",
        icon: "✨"
      },
      {
        name: "Carrot Seed Oil",
        description: "Helps remove tan and spots from the skin while revealing a natural glow.",
        icon: "🥕"
      }
    ],

    faqs: [
      {
        question: "Will it Make My Skin Dry?",
        answer: "No, this product is formulated with natural moisturizing ingredients like Carrot Seed Oil and Saffron that keep your skin hydrated while cleansing."
      },
      {
        question: "How Often Should I Use It?",
        answer: "We recommend using this face wash twice daily - morning and night - for best results. Adjust frequency based on your skin's response."
      },
      {
        question: "Will the Beads Damage My Sensitive Skin?",
        answer: "The Walnut Beads are finely ground and gentle. However, if you have very sensitive skin, use gently or reduce frequency to 3-4 times a week."
      },
      {
        question: "What Are the Benefits of Ubtan Natural Glow Face Wash?",
        answer: "It removes tan, brightens skin, exfoliates dead cells, reduces excess oil, and helps achieve a natural glow with regular use."
      },
      {
        question: "Will it Make My Skin Clear?",
        answer: "Yes, with regular use, it helps reduce acne, blackheads, and breakouts due to the antiseptic properties of turmeric and natural exfoliation."
      },
      {
        question: "Is it Free Sulfates & Toxins?",
        answer: "Yes, this product is completely sulfate-free and contains no harmful chemicals or toxins, making it safe for all skin types."
      },
      {
        question: "Can Teenagers Use It?",
        answer: "Absolutely! This face wash is suitable for teenagers and is particularly beneficial for oily and acne-prone skin common during teenage years."
      }
    ],

    reviews: [
      {
        author: "Girija",
        date: "Jan 30, 2026",
        rating: 5,
        verified: true,
        title: "Best for Sensitive Skin",
        content: "After using mama Earth ubtan facewash my face remains acne free and i have sensitive skin but it does not have any side-effects on my skin my face remains clean and glow",
        helpful: 245
      },
      {
        author: "Veena Mehra",
        date: "Jan 28, 2026",
        rating: 5,
        verified: true,
        title: "Great for Oil Control",
        content: "I have been using this facewash for the last 2 months ... Helps in reducing excess oil and exfoliate too.. must try.",
        helpful: 189
      },
      {
        author: "Akshya sharma",
        date: "Jan 9, 2026",
        rating: 5,
        verified: true,
        title: "Highly Effective",
        content: "Its really effective..I am using it since past 2 months now.. loved the results.. do try out",
        helpful: 156
      },
      {
        author: "Ankita",
        date: "Jan 3, 2026",
        rating: 5,
        verified: true,
        title: "Must Have in Skincare Routine",
        content: "This face wash is really good. It removes dirt, dead skin and black heads. Goodness of turmeric and saffron make my skin glowing and healthy. It is must have in your daily skin care routine.",
        helpful: 312
      }
    ],

    ratings: {
      average: 4.9,
      total: 185,
      distribution: [
        { stars: 5, count: 166 },
        { stars: 4, count: 17 },
        { stars: 3, count: 2 },
        { stars: 2, count: 0 },
        { stars: 1, count: 0 }
      ]
    }
  };

  // Detect scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "description", ref: descriptionRef },
        { id: "ingredients", ref: ingredientsRef },
        { id: "faq", ref: faqRef },
        { id: "reviews", ref: reviewsRef }
      ];

      for (let section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const ref = sectionRefs[sectionId];
    
    if (ref.current) {
      const offsetTop = ref.current.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const sections = [
    { id: "description", label: "Description", icon: FileText },
    { id: "ingredients", label: "Ingredients", icon: Lightbulb },
    { id: "faq", label: "FAQs", icon: HelpCircle },
    { id: "reviews", label: "Reviews", icon: MessageSquare }
  ];

  return (
    <div className="bg-white">
      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-4 sm:gap-8">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 py-4 px-2 font-bold text-sm sm:text-base transition-all whitespace-nowrap border-b-4 ${
                    activeSection === section.id
                      ? "text-cyan-600 border-cyan-500"
                      : "text-gray-600 border-transparent hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Description Section */}
        <section
          ref={descriptionRef}
          className="py-12 border-b border-gray-200"
        >
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                Product Description
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {productData.description}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Use</h3>
              <div className="bg-gradient-to-br from-cyan-50 to-green-50 border-l-4 border-cyan-500 p-8 rounded-lg">
                <ol className="space-y-4 text-gray-700">
                  {[
                    "Wet your face with lukewarm water",
                    "Take a small amount of the face wash and apply it gently on your face",
                    "Massage in circular motions for 1-2 minutes",
                    "Rinse thoroughly with water",
                    "Use morning and night for best results"
                  ].map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="font-bold text-cyan-600 flex-shrink-0 text-xl">{idx + 1}.</span>
                      <span className="text-lg">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Suitable For</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["All Skin Types", "Oily Skin", "Acne-Prone", "Sensitive Skin", "Tanned Skin", "Dull Skin", "Combination", "Normal Skin"].map((item) => (
                  <div key={item} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg text-center border border-gray-300 hover:border-cyan-300 transition-colors">
                    <p className="text-gray-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Ingredients Section */}
        <section
          ref={ingredientsRef}
          className="py-12 border-b border-gray-200"
        >
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-black text-gray-900">Key Ingredients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productData.keyIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-xl p-6 hover:border-cyan-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-5xl">{ingredient.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{ingredient.name}</h4>
                      <p className="text-gray-700 leading-relaxed text-sm">{ingredient.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section
          ref={faqRef}
          className="py-12 border-b border-gray-200"
        >
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-black text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            {productData.faqs.map((faq, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-cyan-300 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-900 text-left">{faq.question}</span>
                  <div className="flex-shrink-0 ml-4">
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-6 h-6 text-cyan-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                </button>
                {expandedFAQ === index && (
                  <div className="p-6 bg-gradient-to-br from-cyan-50 to-white border-t-2 border-gray-200 animate-slide-down">
                    <p className="text-gray-700 leading-relaxed text-lg">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section
          ref={reviewsRef}
          className="py-12"
        >
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-black text-gray-900 mb-8">
              Customer Ratings & Reviews
            </h2>

            {/* Rating Distribution */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Overall Rating */}
                <div className="bg-gradient-to-br from-green-50 to-cyan-50 p-8 rounded-xl text-center border-2 border-green-200">
                  <div className="text-6xl font-black text-gray-900 mb-3">
                    {productData.ratings.average}
                  </div>
                  <div className="flex justify-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.floor(productData.ratings.average)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 font-bold text-lg">
                    Based on {productData.ratings.total} reviews
                  </p>
                </div>

                {/* Rating Breakdown */}
                <div className="md:col-span-2 space-y-4">
                  {productData.ratings.distribution.map((dist) => (
                    <div key={dist.stars} className="flex items-center gap-4">
                      <div className="flex items-center gap-2 w-24">
                        <span className="font-bold text-gray-700 text-lg">{dist.stars}</span>
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-green-500"
                          style={{
                            width: `${(dist.count / productData.ratings.total) * 100}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-gray-700 font-bold w-12 text-right">
                        {dist.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Reviews from Customers</h3>
              <div className="space-y-6">
                {productData.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-cyan-300 transition-all"
                  >
                    {/* Review Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-gray-900 text-lg">{review.author}</h4>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                              ✓ Verified User
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review Title */}
                    <h5 className="font-bold text-gray-900 text-lg mb-3">{review.title}</h5>

                    {/* Review Content */}
                    <p className="text-gray-700 leading-relaxed mb-5 text-base">{review.content}</p>

                    {/* Helpful Button */}
                    <button className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 font-bold transition-colors group">
                      <ThumbsUp className="w-5 h-5 group-hover:fill-cyan-600" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>

              {/* View All Reviews */}
              <div className="text-center mt-8">
                <button className="px-10 py-4 border-2 border-cyan-500 text-cyan-600 font-bold text-lg rounded-full hover:bg-cyan-50 transition-all">
                  View All {productData.ratings.total} Reviews
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 500px;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsBottom;