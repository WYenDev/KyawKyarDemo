import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Thant Zin',
    location: 'Yangon',
    rating: 5,
    text: 'Excellent service! I found my dream car at AutoMax. The staff was professional and the process was smooth. Highly recommended!',
    car: '2020 Toyota Camry'
  },
  {
    id: 2,
    name: 'Mya Mya Win',
    location: 'Mandalay',
    rating: 5,
    text: 'Very trustworthy dealer. They helped me find the perfect family car within my budget. Great after-sales service too!',
    car: '2019 Honda CR-V'
  },
  {
    id: 3,
    name: 'Kyaw Soe',
    location: 'Naypyidaw',
    rating: 5,
    text: 'Best car shopping experience ever! Transparent pricing, quality cars, and fantastic customer service. Will definitely come back!',
    car: '2021 Mazda CX-5'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say 
            about their experience with AutoMax Myanmar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-8 relative">
              <Quote className="h-8 w-8 text-blue-200 absolute top-6 right-6" />
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>

              {/* Customer Info */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-700">{testimonial.car}</p>
                    <p className="text-xs text-gray-500">Purchased</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-2">98%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-2">3500+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-2">95%</div>
              <div className="text-gray-600">Repeat Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;