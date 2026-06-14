import ContactForm from "@/components/client/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          Get in touch with our team. This page mixes server-rendered web
          components with an interactive client-side form.
        </p>
      </div>

      {/* Server rendered info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <app-card variant="primary" hoverable>
          <div className="text-center space-y-2">
            <span className="text-3xl">📧</span>
            <h3 className="font-semibold text-blue-900">Email</h3>
            <p className="text-sm text-blue-700">hello@webcomp.dev</p>
          </div>
        </app-card>
        <app-card variant="success" hoverable>
          <div className="text-center space-y-2">
            <span className="text-3xl">📞</span>
            <h3 className="font-semibold text-green-900">Phone</h3>
            <p className="text-sm text-green-700">+1 (555) 123-4567</p>
          </div>
        </app-card>
        <app-card variant="warning" hoverable>
          <div className="text-center space-y-2">
            <span className="text-3xl">📍</span>
            <h3 className="font-semibold text-amber-900">Location</h3>
            <p className="text-sm text-amber-700">San Francisco, CA</p>
          </div>
        </app-card>
      </div>

      <app-alert variant="info" title="Server + Client Composition">
        The info cards above are server-rendered web components. The form below
        is a Client Component with interactive web components.
      </app-alert>

      {/* Client component form */}
      <ContactForm />
    </div>
  );
}
