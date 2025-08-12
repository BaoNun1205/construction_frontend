export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
        
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          
          <div className="space-y-8">
            {/* Office Address */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-yellow-600">Office Address</h3>
              <p className="text-gray-600">
                123 Construction Street<br />
                Business District<br />
                City, State 12345
              </p>
            </div>
            
            {/* Contact Details */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-yellow-600">Contact Details</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Phone:</span> +1 (555) 123-4567</p>
                <p><span className="font-medium">Email:</span> info@laiphat.com</p>
                <p><span className="font-medium">Website:</span> www.laiphat.com</p>
              </div>
            </div>
            
            {/* Google Maps */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-yellow-600">Location Map</h3>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Google Maps integration will be added here</p>
              </div>
            </div>
            
            {/* Request Form */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-yellow-600">Request Form</h3>
              <p className="text-gray-600 mb-4">
                Need a custom quote? Fill out our detailed request form.
              </p>
              <button className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition duration-200">
                Open Request Form
              </button>
            </div>
            
            {/* Social Network */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-yellow-600">Social Networks</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
                <a href="#" className="text-blue-400 hover:text-blue-600">Twitter</a>
                <a href="#" className="text-pink-600 hover:text-pink-800">Instagram</a>
                <a href="#" className="text-blue-700 hover:text-blue-900">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
