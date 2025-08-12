export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About Us</h1>
      
      {/* Company Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Company Introduction</h2>
        <p className="text-gray-600 mb-4">
          Welcome to LaiPhat - your trusted partner in construction and development.
        </p>
      </section>

      {/* Latest Projects */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Latest Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project cards will be added here */}
        </div>
      </section>

      {/* Core Services */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Core Services</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Consultation and Advice</li>
          <li>Construction Progress Supervision</li>
          <li>Interior Design Consulting</li>
          <li>Architectural Design</li>
          <li>Construction Consulting</li>
          <li>Landscape Design</li>
        </ul>
      </section>

      {/* Registration Form */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Registration Form</h2>
        <p className="text-gray-600">
          Get in touch with us for your construction needs.
        </p>
      </section>
    </div>
  );
}
