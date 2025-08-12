export default function QualityControlPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Quality Control Services</h1>
      
      {/* Quality Assurance Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Quality Assurance Overview</h2>
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <p className="text-gray-700 leading-relaxed">
            Our comprehensive quality control services ensure that every aspect of your construction project 
            meets the highest standards of excellence. From initial material inspection to final project 
            verification, we maintain rigorous quality standards throughout the entire construction process.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <h3 className="font-medium mb-2">Material Testing</h3>
            <p className="text-sm text-gray-600">Comprehensive testing of all construction materials</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl">🔍</span>
            </div>
            <h3 className="font-medium mb-2">Regular Inspections</h3>
            <p className="text-sm text-gray-600">Scheduled quality inspections at every phase</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-600 text-2xl">📋</span>
            </div>
            <h3 className="font-medium mb-2">Documentation</h3>
            <p className="text-sm text-gray-600">Detailed quality reports and certifications</p>
          </div>
        </div>
      </section>

      {/* Quality Control Process */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Quality Control Process</h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">1</div>
            <div className="flex-1">
              <h3 className="font-medium mb-2">Pre-Construction Quality Planning</h3>
              <p className="text-gray-600 mb-2">
                Develop comprehensive quality control plans and establish standards before construction begins.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Quality standards definition</li>
                <li>• Inspection schedule creation</li>
                <li>• Material specification review</li>
                <li>• Testing protocol establishment</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">2</div>
            <div className="flex-1">
              <h3 className="font-medium mb-2">Material Quality Verification</h3>
              <p className="text-gray-600 mb-2">
                Rigorous testing and certification of all materials before use in construction.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Material strength testing</li>
                <li>• Compliance certification</li>
                <li>• Supplier quality audits</li>
                <li>• Batch testing procedures</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">3</div>
            <div className="flex-1">
              <h3 className="font-medium mb-2">Construction Phase Monitoring</h3>
              <p className="text-gray-600 mb-2">
                Continuous monitoring and inspection during active construction phases.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Daily progress inspections</li>
                <li>• Workmanship quality checks</li>
                <li>• Safety compliance monitoring</li>
                <li>• Milestone quality reviews</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">4</div>
            <div className="flex-1">
              <h3 className="font-medium mb-2">Final Quality Verification</h3>
              <p className="text-gray-600 mb-2">
                Comprehensive final inspection and quality certification before project handover.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Complete system testing</li>
                <li>• Final quality certification</li>
                <li>• Defect identification and correction</li>
                <li>• Quality documentation handover</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Services */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Testing Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4">Material Testing</h3>
            <div className="space-y-3">
              <div className="bg-white border-l-4 border-green-500 p-4">
                <h4 className="font-medium text-green-800">Concrete Testing</h4>
                <p className="text-sm text-gray-600">Compressive strength, slump test, and durability analysis</p>
              </div>
              <div className="bg-white border-l-4 border-blue-500 p-4">
                <h4 className="font-medium text-blue-800">Steel Testing</h4>
                <p className="text-sm text-gray-600">Tensile strength, hardness, and chemical composition</p>
              </div>
              <div className="bg-white border-l-4 border-orange-500 p-4">
                <h4 className="font-medium text-orange-800">Soil Testing</h4>
                <p className="text-sm text-gray-600">Bearing capacity, moisture content, and compaction tests</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Structural Testing</h3>
            <div className="space-y-3">
              <div className="bg-white border-l-4 border-purple-500 p-4">
                <h4 className="font-medium text-purple-800">Load Testing</h4>
                <p className="text-sm text-gray-600">Structural load capacity and safety verification</p>
              </div>
              <div className="bg-white border-l-4 border-red-500 p-4">
                <h4 className="font-medium text-red-800">Non-Destructive Testing</h4>
                <p className="text-sm text-gray-600">Ultrasonic, radiographic, and magnetic particle testing</p>
              </div>
              <div className="bg-white border-l-4 border-yellow-500 p-4">
                <h4 className="font-medium text-yellow-800">Environmental Testing</h4>
                <p className="text-sm text-gray-600">Air quality, noise levels, and environmental impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Quality Standards & Certifications</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="font-medium mb-2">ISO 9001</h3>
            <p className="text-sm text-gray-600">Quality Management Systems</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="font-medium mb-2">OHSAS 18001</h3>
            <p className="text-sm text-gray-600">Occupational Health & Safety</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="font-medium mb-2">ISO 14001</h3>
            <p className="text-sm text-gray-600">Environmental Management</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="font-medium mb-2">Local Standards</h3>
            <p className="text-sm text-gray-600">National Building Codes</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Need Quality Control Services?</h2>
          <p className="mb-6">
            Ensure your construction project meets the highest quality standards with our expert quality control services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-200">
              Request Quality Assessment
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition duration-200">
              Download Quality Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
