export default function ConstructionTechnologyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Construction Technology</h1>
      
      {/* Infrastructure Development */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Infrastructure Development</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-green-800">Residential Construction</h3>
            <p className="text-green-700 text-sm">
              Building homes and residential complexes with modern techniques and sustainable materials.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-green-800">Commercial Construction</h3>
            <p className="text-green-700 text-sm">
              Office buildings, retail spaces, and commercial facilities construction.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-green-800">Industrial Construction</h3>
            <p className="text-green-700 text-sm">
              Manufacturing facilities, warehouses, and industrial infrastructure.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-green-800">Infrastructure</h3>
            <p className="text-green-700 text-sm">
              Roads, bridges, utilities, and public infrastructure development.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-green-800">Architectural Design</h3>
            <p className="text-green-700 text-sm">
              Creative and functional architectural solutions for all project types.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-green-800">Interior Design</h3>
            <p className="text-green-700 text-sm">
              Complete interior design and fit-out services for residential and commercial spaces.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-green-800">Landscape Design</h3>
            <p className="text-green-700 text-sm">
              Beautiful and functional outdoor spaces, gardens, and landscape architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Technology & Innovation</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4">Modern Construction Methods</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Prefabricated construction</li>
              <li>• Green building techniques</li>
              <li>• Smart building integration</li>
              <li>• Energy-efficient systems</li>
              <li>• Sustainable materials</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4">Quality Assurance</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Regular quality inspections</li>
              <li>• Material testing and certification</li>
              <li>• Safety standard compliance</li>
              <li>• Progress monitoring</li>
              <li>• Final quality verification</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Project Portfolio */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Project Portfolio</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="font-medium mb-2">Residential Complex</h3>
              <p className="text-sm text-gray-600">Modern apartment complex with sustainable features</p>
            </div>
          </div>
          <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="font-medium mb-2">Commercial Building</h3>
              <p className="text-sm text-gray-600">Office tower with smart building systems</p>
            </div>
          </div>
          <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="font-medium mb-2">Industrial Facility</h3>
              <p className="text-sm text-gray-600">Manufacturing plant with advanced infrastructure</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
