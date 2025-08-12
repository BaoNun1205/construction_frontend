export default function ConsultationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Consultation Services</h1>
      
      {/* Supervision Services */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Construction Supervision</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4">Quality Supervision</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Construction quality monitoring
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Material quality inspection
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Workmanship assessment
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Progress evaluation
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4">Safety Management</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Safety protocol implementation
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Risk assessment and mitigation
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Worker safety training
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Compliance monitoring
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Advisory Services */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Advisory & Consultation</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-blue-800">Project Planning</h3>
            <p className="text-blue-700 text-sm mb-4">
              Comprehensive project planning from conception to completion.
            </p>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Feasibility studies</li>
              <li>• Timeline development</li>
              <li>• Resource allocation</li>
              <li>• Budget planning</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-blue-800">Technical Consultation</h3>
            <p className="text-blue-700 text-sm mb-4">
              Expert technical advice for complex construction challenges.
            </p>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Engineering solutions</li>
              <li>• Material selection</li>
              <li>• Method optimization</li>
              <li>• Problem solving</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-blue-800">Regulatory Compliance</h3>
            <p className="text-blue-700 text-sm mb-4">
              Ensuring all projects meet legal and regulatory requirements.
            </p>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Building code compliance</li>
              <li>• Permit acquisition</li>
              <li>• Environmental regulations</li>
              <li>• Safety standards</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Project Management */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Project Management Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Budget Management</h3>
              <p className="text-gray-600 mb-3">
                Complete financial oversight and cost control throughout the project lifecycle.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cost estimation and budgeting</li>
                <li>• Financial tracking and reporting</li>
                <li>• Change order management</li>
                <li>• Cost optimization strategies</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Schedule Management</h3>
              <p className="text-gray-600 mb-3">
                Efficient timeline planning and execution to meet project deadlines.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Critical path planning</li>
                <li>• Resource scheduling</li>
                <li>• Progress monitoring</li>
                <li>• Delay mitigation</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Our Consultation Process</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 mt-1">1</div>
                <div>
                  <h4 className="font-medium">Initial Assessment</h4>
                  <p className="text-sm text-gray-600">Project evaluation and requirement analysis</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 mt-1">2</div>
                <div>
                  <h4 className="font-medium">Proposal Development</h4>
                  <p className="text-sm text-gray-600">Detailed consultation plan and timeline</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 mt-1">3</div>
                <div>
                  <h4 className="font-medium">Implementation</h4>
                  <p className="text-sm text-gray-600">Active consultation and support delivery</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 mt-1">4</div>
                <div>
                  <h4 className="font-medium">Follow-up</h4>
                  <p className="text-sm text-gray-600">Ongoing support and project review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Project?</h2>
        <p className="mb-6">
          Get expert consultation for your construction project. Our team is ready to help you succeed.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-200">
          Schedule a Consultation
        </button>
      </section>
    </div>
  );
}
