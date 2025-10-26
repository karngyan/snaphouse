import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy/')({
  head: () => ({
    meta: [
      {
        title: 'privacy policy | snaphouse',
      },
    ],
  }),
  component: PrivacyPage,
})

const lastUpdated = new Date('2025-10-26').toLocaleDateString('en-IN')

function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-1">Privacy Policy</h2>
      <p className="text-sm text-gray-600 mb-8">Last updated: {lastUpdated}</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="font-medium mb-2">1. Introduction</h2>
          <p className="mb-2">
            Welcome to snaphouse. We are committed to protecting your personal
            information and your right to privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you use our mobile application and services.
          </p>
          <p>
            By using snaphouse, you agree to the collection and use of
            information in accordance with this policy. If you do not agree with
            our policies and practices, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">2. Company Information</h2>
          <p>Legal Name: snaphouse</p>
          <p>Address: Ranchi, India</p>
          <p>
            Contact Email:{' '}
            <a href="mailto:support@snaphouse.in" className="underline">
              support@snaphouse.in
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">3. Information We Collect</h2>
          <p className="mb-2">
            We collect personal information that you provide to us and
            information that is automatically collected when you use our
            services. The types of information we collect include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact Information: Phone number, email address</li>
            <li>
              Account Information: Username, profile details, photographer
              credentials
            </li>
            <li>
              Photos and Media: Event photos you upload, gallery images, and
              related metadata (EXIF data, timestamps, location tags)
            </li>
            <li>
              Event Data: Event information, QR codes generated, gallery
              organization and settings
            </li>
            <li>
              Location Data: Optional location information associated with
              events and photos
            </li>
            <li>
              Payment Information: Payment details processed through our secure
              payment partners for premium features
            </li>
            <li>Usage Data: Information about how you interact with our app</li>
            <li>
              Device Information: Device type, operating system, browser type,
              and IP address
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium mb-2">4. How We Collect Information</h2>
          <p className="mb-2">We collect information through:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Direct Input: Information you provide when creating an account,
              uploading photos, creating events, or using our services
            </li>
            <li>
              Photo Uploads: Photos and associated metadata you upload to create
              event galleries
            </li>
            <li>
              Automatic Collection: Data collected automatically through your
              use of the app, including cookies and similar technologies
            </li>
            <li>
              QR Code Scanning: Information collected when attendees access
              event galleries through QR codes
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium mb-2">5. How We Use Your Information</h2>
          <p className="mb-2">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Account Management: To create and manage your account,
              authenticate your identity
            </li>
            <li>
              Service Provision: To provide, maintain, and improve our photo
              sharing and event management services
            </li>
            <li>
              Photo Storage and Sharing: To store, organize, and enable sharing
              of event photos through galleries and QR codes
            </li>
            <li>
              QR Code Generation: To create and manage QR codes for event
              gallery access
            </li>
            <li>
              Customer Support: To respond to your inquiries and provide
              assistance
            </li>
            <li>
              Personalization: To enhance your experience with personalized
              recommendations and features
            </li>
            <li>
              Communication: To send you important updates, notifications, and
              information about our services
            </li>
            <li>
              Security: To protect against unauthorized access and maintain the
              security of your account and photos
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium mb-2">6. Data Security</h2>
          <p className="mb-2">
            We take the security of your personal information and photos
            seriously. All data collected is encrypted using industry-standard
            encryption protocols. We implement appropriate technical and
            organizational security measures to protect your information and
            photos against unauthorized access, alteration, disclosure, or
            destruction.
          </p>
          <p>
            However, please note that no method of transmission over the
            internet or electronic storage is 100% secure. While we strive to
            use commercially acceptable means to protect your information, we
            cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">7. Third-Party Service Providers</h2>
          <p className="mb-2">
            We work with trusted third-party service providers to deliver our
            services. These partners may have access to your personal
            information only to perform specific tasks on our behalf and are
            obligated not to disclose or use it for any other purpose. Our
            third-party partners include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Clerk: For authentication and user management</li>
            <li>
              Cloud Storage Providers: For secure photo storage and hosting
            </li>
            <li>
              Payment Processors: Razorpay, Paytm, and PhonePe for secure
              payment processing (for premium features)
            </li>
            <li>
              Infrastructure Providers: For application hosting and deployment
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium mb-2">
            8. Cookies and Tracking Technologies
          </h2>
          <p className="mb-2">
            We use cookies and similar tracking technologies to track activity
            on our app and store certain information. We use cookies for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Login tracking and session management</li>
            <li>Maintaining your preferences</li>
            <li>Improving app performance and user experience</li>
            <li>
              Analytics and understanding how users interact with our services
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium mb-2">9. Data Retention</h2>
          <p className="mb-2">
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law.
          </p>
          <p>
            When you request deletion of your account and data, we will process
            your request promptly. However, please note that your data may
            remain in our systems for up to 30 days after your deletion request
            to ensure complete removal across all our systems and backups.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">10. Your Rights and Choices</h2>
          <p className="mb-2">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Access: You can request access to the personal information we hold
              about you
            </li>
            <li>
              Correction: You can update or correct your personal information
              through your account settings
            </li>
            <li>
              Deletion: You can request deletion of your account and personal
              data at any time
            </li>
            <li>
              Opt-Out: You can opt-out of receiving promotional communications
              from us
            </li>
            <li>
              Data Portability: You can request a copy of your data in a
              structured, commonly used format
            </li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, please contact us at{' '}
            <a href="mailto:support@snaphouse.in" className="underline">
              support@snaphouse.in
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">11. Geographic Scope</h2>
          <p>
            snaphouse services are intended for users in India only. By using
            our services, you consent to the collection, storage, and processing
            of your information in India in accordance with this Privacy Policy
            and applicable Indian data protection laws.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">12. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18.
            We do not knowingly collect personal information from children. If
            you are a parent or guardian and believe that your child has
            provided us with personal information, please contact us, and we
            will take steps to delete such information.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">
            13. Changes to This Privacy Policy
          </h2>
          <p className="mb-2">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date at the top of this policy. You
            are advised to review this Privacy Policy periodically for any
            changes.
          </p>
          <p>
            Changes to this Privacy Policy are effective when they are posted on
            this page. Your continued use of our services after any
            modifications indicates your acceptance of the updated Privacy
            Policy.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">14. Contact Us</h2>
          <p className="mb-2">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our data practices, please contact us at:
          </p>
          <div className="mt-2">
            <p>snaphouse</p>
            <p>Ranchi, India</p>
            <p>
              Email:{' '}
              <a href="mailto:support@snaphouse.in" className="underline">
                support@snaphouse.in
              </a>
            </p>
          </div>
        </section>

        <section className="pt-4 mt-4 border-t text-xs text-gray-600">
          <p>
            By using snaphouse, you acknowledge that you have read, understood,
            and agree to be bound by this Privacy Policy.
          </p>
        </section>
      </div>
    </div>
  )
}
