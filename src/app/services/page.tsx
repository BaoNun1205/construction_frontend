export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      
      {/* Construction Technology */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Construction Technology</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Infrastructure Development</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Residential Construction</li>
              <li>Commercial Construction</li>
              <li>Industrial Construction</li>
              <li>Infrastructure</li>
              <li>Architectural Design</li>
              <li>Interior Design</li>
              <li>Landscape Design</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Consulting & Advisory</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Construction Supervision</li>
              <li>Quality Control</li>
              <li>Safety Management</li>
              <li>Project Planning</li>
              <li>Environmental Assessment</li>
              <li>Budget Consultation</li>
              <li>Legal Consultation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Project Management */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Project Management</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Budget Management</h3>
            <p className="text-gray-600">Comprehensive financial planning and cost control</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Schedule Management</h3>
            <p className="text-gray-600">Efficient timeline planning and execution</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Quality Assurance</h3>
            <p className="text-gray-600">Maintaining highest standards throughout construction</p>
          </div>
        </div>
      </section>

      {/* Consultation Services */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Consultation Services</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Advisory & Consultation</h3>
            <p className="text-gray-600">Expert guidance for your construction projects</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Initial Assessment</h3>
            <p className="text-gray-600">Comprehensive project evaluation and recommendations</p>
          </div>
        </div>
      </section>
    </div>
  );
}
