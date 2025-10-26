import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms/')({
  head: () => ({
    meta: [
      {
        title: 'terms of service | snaphouse',
      },
    ],
  }),
  component: TermsPage,
})

const lastUpdated = new Date('2025-10-26').toLocaleDateString('en-IN')

function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-1">Terms of Service</h2>
      <p className="text-sm text-gray-600 mb-8">Last updated: {lastUpdated}</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="font-medium mb-2">1. Acceptance of Terms</h2>
          <p className="mb-2">
            Welcome to snaphouse. By accessing or using our mobile application
            and services, you agree to be bound by these Terms of Service. If
            you do not agree to these terms, please do not use our services.
          </p>
          <p>
            These terms constitute a legally binding agreement between you and
            snaphouse. We reserve the right to update these terms at any time,
            and your continued use of our services constitutes acceptance of any
            changes.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">2. About snaphouse</h2>
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
          <h2 className="font-medium mb-2">3. Description of Services</h2>
          <p className="mb-2">
            snaphouse provides a photo events sharing platform that allows users
            to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Upload and share event photos professionally</li>
            <li>Create and manage photo galleries for events</li>
            <li>Generate QR codes for attendees to access event photos</li>
            <li>Browse and download photos from events they attended</li>
            <li>Organize and categorize event photography</li>
            <li>
              Enable secure photo sharing between photographers and attendees
            </li>
          </ul>
          <p className="mt-2">
            Our services are currently available only to users in India.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">4. User Accounts</h2>
          <p className="mb-2">
            To use snaphouse, you must create an account by providing accurate
            and complete information. You are responsible for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized access</li>
            <li>
              Ensuring your account information remains accurate and up to date
            </li>
          </ul>
          <p className="mt-2">
            You must be at least 18 years old to create an account and use our
            services.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">5. Payment Terms</h2>
          <p className="mb-2">
            snaphouse may offer paid features for photographers, including
            premium storage and advanced features. Payments are processed
            through third-party payment processors including Razorpay, Paytm,
            and PhonePe. By making a payment, you agree to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide accurate payment information</li>
            <li>Pay all fees and charges associated with your account</li>
            <li>
              Comply with the terms and conditions of our payment processors
            </li>
          </ul>
          <p className="mt-2">
            All fees are non-refundable unless otherwise stated or required by
            law. We reserve the right to change our pricing at any time with
            prior notice to users.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">6. User Responsibilities</h2>
          <p className="mb-2">When using snaphouse, you agree to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the services only for lawful purposes</li>
            <li>Upload only photos that you own or have rights to share</li>
            <li>Respect the intellectual property rights of others</li>
            <li>Not upload inappropriate, offensive, or illegal content</li>
            <li>Not interfere with or disrupt the services</li>
            <li>Not attempt to gain unauthorized access to our systems</li>
            <li>Not upload malicious code or harmful content</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Respect the privacy of individuals in photos you upload</li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium mb-2">7. Prohibited Activities</h2>
          <p className="mb-2">You may not:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the services for any illegal or unauthorized purpose</li>
            <li>Upload photos that violate privacy rights or laws</li>
            <li>Upload copyrighted photos without proper authorization</li>
            <li>Harass, abuse, or harm other users</li>
            <li>
              Impersonate any person or entity or misrepresent your affiliation
            </li>
            <li>Collect or harvest data from other users without consent</li>
            <li>
              Reverse engineer, decompile, or disassemble any part of our
              services
            </li>
            <li>
              Use automated systems or bots to access or scrape our services
            </li>
            <li>
              Transmit spam, chain letters, or other unsolicited communications
            </li>
            <li>
              Upload photos containing nudity, violence, or other prohibited
              content
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium mb-2">8. Intellectual Property</h2>
          <p className="mb-2">
            All content, features, and functionality of snaphouse, including but
            not limited to text, graphics, logos, images, and software, are
            owned by snaphouse or its licensors and are protected by
            intellectual property laws.
          </p>
          <p>
            You are granted a limited, non-exclusive, non-transferable license
            to access and use our services for personal, non-commercial purposes
            only. You may not copy, modify, distribute, sell, or lease any part
            of our services without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">9. User Content</h2>
          <p className="mb-2">
            You retain ownership of any photos and content you upload to
            snaphouse. By uploading content, you grant snaphouse a worldwide,
            non-exclusive, royalty-free license to use, store, display, and
            process your photos solely for the purpose of providing and
            improving our services, including generating QR codes, creating
            galleries, and enabling photo sharing with event attendees.
          </p>
          <p className="mb-2">
            You are solely responsible for your content and must ensure it does
            not violate any laws or third-party rights. You represent and
            warrant that:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              You own or have the necessary rights to all photos you upload
            </li>
            <li>
              You have obtained necessary permissions from individuals appearing
              in photos
            </li>
            <li>
              Your photos do not infringe on any third-party intellectual
              property rights
            </li>
            <li>Your photos comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium mb-2">10. Privacy and Photo Usage</h2>
          <p className="mb-2">
            We take privacy seriously. When uploading photos to snaphouse,
            photographers are responsible for ensuring compliance with all
            applicable privacy laws and obtaining necessary consents.
          </p>
          <p className="mb-2">Important guidelines:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Photographers must obtain appropriate consent from individuals
              before uploading their photos
            </li>
            <li>
              Attendees can request removal of photos where they appear by
              contacting support@snaphouse.in
            </li>
            <li>
              We reserve the right to remove any photos that violate privacy
              rights or our terms
            </li>
            <li>
              Photos shared via QR codes are accessible only to those with the
              specific event link
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium mb-2">11. Service Availability</h2>
          <p>
            We strive to provide continuous access to our services, but we do
            not guarantee that our services will be available at all times.
            Services may be interrupted for maintenance, updates, or due to
            factors beyond our control. We reserve the right to modify, suspend,
            or discontinue any part of our services without notice.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">12. Account Termination</h2>
          <p className="mb-2">
            We reserve the right to suspend or terminate your account at any
            time if you violate these terms or engage in conduct that we deem
            harmful to snaphouse, other users, or third parties.
          </p>
          <p>
            You may delete your account at any time through the app settings.
            Upon deletion, your data will be removed from our systems within 30
            days, as outlined in our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">13. Disclaimers</h2>
          <p className="mb-2">
            snaphouse services are provided "as is" and "as available" without
            any warranties of any kind, either express or implied. We disclaim
            all warranties, including but not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Warranties of merchantability or fitness for a purpose</li>
            <li>
              Warranties regarding the accuracy or completeness of information
            </li>
            <li>Warranties of uninterrupted or error-free service</li>
            <li>Warranties regarding security or data protection</li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium mb-2">14. Limitation of Liability</h2>
          <p className="mb-2">
            To the maximum extent permitted by law, snaphouse and its
            affiliates, officers, employees, and partners shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages arising from or related to your use of our services.
          </p>
          <p>
            Our total liability for any claims arising from your use of
            snaphouse shall not exceed the amount you paid to us in the 12
            months prior to the claim, or ₹1,000, whichever is greater.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">15. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless snaphouse and its
            affiliates from any claims, damages, losses, liabilities, and
            expenses (including legal fees) arising from your use of our
            services, your violation of these terms, or your violation of any
            rights of another party.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">16. Third-Party Services</h2>
          <p>
            Our services may contain links to or integrate with third-party
            websites, apps, or services (such as payment processors, QR code
            generators, and cloud storage providers). We are not responsible for
            the content, privacy practices, or terms of service of any
            third-party services. Your use of third-party services is at your
            own risk.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">17. Governing Law and Disputes</h2>
          <p className="mb-2">
            These Terms of Service shall be governed by and construed in
            accordance with the laws of India. Any disputes arising from these
            terms or your use of snaphouse shall be subject to the exclusive
            jurisdiction of the courts in Ranchi, Jharkhand, India.
          </p>
          <p>
            Before filing any legal action, you agree to first attempt to
            resolve any dispute by contacting us at support@snaphouse.in.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">18. Changes to Terms</h2>
          <p className="mb-2">
            We may update these Terms of Service from time to time. When we make
            changes, we will update the "Last updated" date at the top of this
            page and notify you through the app or via email.
          </p>
          <p>
            Your continued use of snaphouse after changes are posted constitutes
            your acceptance of the updated terms. If you do not agree to the
            changes, you must stop using our services.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">19. Severability</h2>
          <p>
            If any provision of these terms is found to be invalid or
            unenforceable, the remaining provisions shall continue in full force
            and effect. The invalid provision shall be modified to the minimum
            extent necessary to make it valid and enforceable.
          </p>
        </section>

        <section>
          <h2 className="font-medium mb-2">20. Contact Us</h2>
          <p className="mb-2">
            If you have any questions, concerns, or disputes regarding these
            Terms of Service, please contact us at:
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
            and agree to be bound by these Terms of Service.
          </p>
        </section>
      </div>
    </div>
  )
}
