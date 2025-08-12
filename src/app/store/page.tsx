export default function StorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Construction Store</h1>
      
      {/* Store Categories */}
      <section className="mb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Material Categories */}
          <div className="bg-orange-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-orange-800">Materials</h2>
            <ul className="space-y-2 text-orange-700">
              <li>Xi măng - Thép - Gạch (Cement - Steel - Brick)</li>
              <li>Vật liệu xây dựng (Construction Materials)</li>
              <li>Sơn - Chống thấm (Paint - Waterproofing)</li>
              <li>Cửa - Kính - Phụ kiện (Doors - Glass - Accessories)</li>
            </ul>
          </div>

          {/* Equipment */}
          <div className="bg-yellow-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-yellow-800">Equipment</h2>
            <ul className="space-y-2 text-yellow-700">
              <li>Máy móc xây dựng (Construction Machinery)</li>
              <li>Thiết bị công trình (Construction Equipment)</li>
              <li>Thiết bị an toàn (Safety Equipment)</li>
              <li>Dụng cụ cầm tay (Hand Tools)</li>
            </ul>
          </div>

          {/* Services */}
          <div className="bg-green-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Services</h2>
            <ul className="space-y-2 text-green-700">
              <li>Delivery Service</li>
              <li>Installation Support</li>
              <li>Technical Consultation</li>
              <li>Maintenance & Repair</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Contact</h2>
            <ul className="space-y-2 text-blue-700">
              <li>Order Hotline</li>
              <li>Customer Support</li>
              <li>Store Location</li>
              <li>Business Hours</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Product cards will be added here */}
          <div className="border rounded-lg p-4">
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
            <h3 className="font-medium mb-2">Product Name</h3>
            <p className="text-gray-600 text-sm mb-2">Product description</p>
            <p className="font-semibold">Price: Contact</p>
          </div>
          {/* More product cards... */}
        </div>
      </section>

      {/* Store Information */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Store Information</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">History & Development</h3>
            <p className="text-gray-600 mb-4">
              Our construction store has been serving the community with quality materials and equipment.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Quality assurance on all products</li>
              <li>• Competitive pricing</li>
              <li>• Expert consultation</li>
              <li>• Reliable delivery service</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Customer Service</h3>
            <p className="text-gray-600 mb-4">
              We provide comprehensive support for all your construction needs.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Product recommendations</li>
              <li>• Technical support</li>
              <li>• After-sales service</li>
              <li>• Bulk order discounts</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
