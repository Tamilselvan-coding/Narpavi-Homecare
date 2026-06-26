import { Fragment, type ReactElement, type ReactNode } from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

type PolicyBlock = {
  text: string;
  listStyle?: 'disc' | 'circle' | 'square' | 'decimal' | 'lower-alpha';
  level?: number;
};

const privacyPolicyBlocks: readonly PolicyBlock[] = [
    {
        "text":  "Privacy Policy"
    },
    {
        "text":  "Effective Date: August 2025\nCompany Name: Narpavi Homehealth \u0026 Life Care Pvt Ltd\nWebsite: www.nhlcare.com "
    },
    {
        "text":  "At Narpavi Homehealth \u0026 Life Care  Pvt Ltd, we value and respect your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our home healthcare services."
    },
    {
        "text":  "1. Interpretation of Terms"
    },
    {
        "text":  "For the purpose of this Privacy Policy (and other related legal documents such as the Disclaimer and Terms \u0026 Conditions):"
    },
    {
        "text":  "\"You\" or \"Your\" refers to the user, which includes:",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Patients receiving services",
        "listStyle":  "circle",
        "level":  1
    },
    {
        "text":  "Family members or authorized caregivers, Nurses, healthcare professionals",
        "listStyle":  "circle",
        "level":  1
    },
    {
        "text":  "Website visitors",
        "listStyle":  "circle",
        "level":  1
    },
    {
        "text":  "Anyone who accesses or uses our website, mobile services, or contacts us in any way",
        "listStyle":  "circle",
        "level":  1
    },
    {
        "text":  "\"We,\" \"Us,\" \"Our,\" or \"Company\" refers to Narpavi Homehealth \u0026 Life Care Pvt Ltd, the registered healthcare entity responsible for managing this website and delivering services.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "\"Shall\" and \"Will\" imply a mandatory obligation.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "\"Including\" means \"including without limitation.\"",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "\"Services\" refers to the home healthcare offerings provided by us, such as nursing care, ICU at home, medical Equipment, Home Visits, Rehabilitation, physiotherapy, caregiver assistance, wellness and related support services.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "By using this website or availing of our services, you agree to the definitions and meanings assigned above throughout this document."
    },
    {
        "text":  "2. General Information"
    },
    {
        "text":  "The content and services offered on this website by Narpavi Homehealth \u0026 Life Care Pvt Ltd are intended for general informational and healthcare service coordination purposes only."
    },
    {
        "text":  "We strive to keep all information accurate and up-to-date, but we make no guarantees regarding its completeness or suitability for your specific health situation."
    },
    {
        "text":  "The website should not be used for emergency medical needs.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Users are encouraged to seek direct consultation with licensed medical professionals for all health-related decisions.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "The information provided should not be treated as a substitute for professional medical advice, diagnosis, or treatment.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Use of this website and services is at your own discretion and subject to acceptance of all our terms and policies."
    },
    {
        "text":  "3. Applicability of This Privacy Policy"
    },
    {
        "text":  "This Privacy Policy Applies To:"
    },
    {
        "text":  "This Privacy Policy applies to all individuals and entities who interact with Narpavi Homehealth \u0026 Life Care Pvt Ltd, including:"
    },
    {
        "text":  "Patients receiving home healthcare, ICU at home, medical Equipment, Home Visits, Rehabilitation, physiotherapy, caregiver assistance, wellness and related support services.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Family members, guardians, or authorized representatives who provide information or coordinate care",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Website visitors who browse, contact, or fill out forms on our platform",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Individuals communicating with us via phone, WhatsApp, email, or any digital platform",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Healthcare professionals, Nurses or caregivers onboarded or referred through our systems (to the extent personal data is shared)",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Applicants applying for jobs,vendors, caregiving roles, or partnerships through our website",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "4. This Privacy Policy Does Not Apply To:"
    },
    {
        "text":  "Third-party websites, apps, or services that may be linked from our website (e.g., external hospitals, labs, diagnostics providers, payment gateways)",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "These entities operate under their own privacy policies and practices. We encourage you to review their terms independently.",
        "listStyle":  "circle",
        "level":  1
    },
    {
        "text":  "Data collected by third parties directly (for example, if a lab collects data directly from you, or if you provide health info on another website)",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Employees, vendors, or business partners with separate contractual data handling policies — unless explicitly covered",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Offline interactions that do not involve data collection or communication through our digital systems",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "5. Collection of Personally Identifiable Information"
    },
    {
        "text":  "In the course of delivering healthcare services and operating our website, Narpavi Homehealth \u0026 Life Care Pvt Ltd may collect Personally Identifiable Information (PII) from you. This includes any data that can be used to directly or indirectly identify an individual."
    },
    {
        "text":  "Purpose of Collection: To verify identity and eligibility for services, To assess medical needs and deliver appropriate care, To maintain accurate health records and treatment plans, For billing, invoicing, and regulatory documentation, To comply with legal or public health requirements"
    },
    {
        "text":  "We collect and process this data only with your explicit or informed consent and store it securely, in compliance with India’s Digital Personal Data Protection Act, 2023 and relevant healthcare regulations."
    },
    {
        "text":  "We may collect the following types of personal and health-related information:"
    },
    {
        "text":  "Personal Information: Name, age, gender, address, contact number, email, emergency contact.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Health Information: Medical history, diagnosis, medications, prescriptions, doctor referrals, treatment plans.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Usage Data: IP address, browser type, device info, pages visited, time spent on the site.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Payment Information: UPI/Bank details (if applicable), only processed through secure gateways.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "6. How We Use Your Information"
    },
    {
        "text":  "We use the collected information for:"
    },
    {
        "text":  "Providing and managing home healthcare and nursing services",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Scheduling appointments and follow-ups",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Coordinating with doctors, nurses, and caregivers",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Processing payments and generating invoices",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Improving website functionality and user experience",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Sending health updates, reminders, and promotional material (with your consent)",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "7. Sharing of Information"
    },
    {
        "text":  "We do not sell or rent your personal information. Your data may be shared with:"
    },
    {
        "text":  "Medical professionals involved in your care",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Authorized staff for service delivery",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Payment gateway providers (for billing)",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Legal or regulatory authorities if required by law",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "8. Your Rights"
    },
    {
        "text":  "You have the right to:"
    },
    {
        "text":  "Access or correct your personal data",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Withdraw consent at any time",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Request data deletion, unless required for medical/legal reasons",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Ask how your data is used and with whom it\u0027s shared",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "To exercise these rights, email us at care@nhlcare.com"
    },
    {
        "text":  "9. Retention of Data"
    },
    {
        "text":  "We retain your personal and medical data only as long as necessary to fulfill the purpose for which it was collected, or as required by law or medical practice standards."
    },
    {
        "text":  "10. Updates to This Policy"
    },
    {
        "text":  "We may update this Privacy Policy periodically. Any changes will be posted on this page with the updated revision date."
    },
    {
        "text":  "11. Medical Emergency Policy"
    },
    {
        "text":  "In the event of a medical emergency during the course of home healthcare services, Narpavi Homehealth \u0026 Life Care Pvt Ltd and its authorized medical professionals reserve the right to take immediate and necessary actions in the best interest of the patient’s health and life."
    },
    {
        "text":  "This may include:"
    },
    {
        "text":  "Assessing the critical condition of the patient",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Administering emergency medical support (within the scope of available equipment and staff expertise)",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Coordinating ambulance or emergency transport services",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Shifting the patient to the nearest appropriate hospital, clinic, or emergency care center",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Notifying family members or emergency contacts promptly",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "These actions are taken in good faith and in accordance with professional medical judgment, solely to protect and preserve the life and health of the patient."
    },
    {
        "text":  "We do not assume responsibility for outcomes beyond our control once the patient is transferred to a hospital or external facility."
    },
    {
        "text":  "12. Cookies and How We Use Them"
    },
    {
        "text":  "Our website uses cookies of Essential, Analytical, Functionality, Marketing \u0026 Retargeting etc  and similar tracking technologies to improve your browsing experience and provide personalized services. "
    },
    {
        "text":  "How You Can Control Cookies"
    },
    {
        "text":  "You have full control over your cookie settings. You can:"
    },
    {
        "text":  "Accept or reject cookies when prompted during your first visit",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Change cookie settings through your browser (Chrome, Firefox, Safari, etc.)",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Delete existing cookies from your device at any time",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Please note that disabling certain cookies may impact your experience on our website."
    },
    {
        "text":  "13. Use of Demographic, Profile Data and Sharing of Aggregate Information"
    },
    {
        "text":  "We may collect and use demographic and profile data such as your age, gender, location, occupation, health conditions, and lifestyle information to better understand and serve your healthcare needs."
    },
    {
        "text":  "Purpose of Collection and Use: Personalized Care Planning, Service Optimization, Health Risk Assessment, Customer Communication, Regulatory Reporting \u0026 Compliance, Anonymization and Aggregation"
    },
    {
        "text":  "We may share aggregate, non-personally identifiable demographic and profile data with third parties for purposes such as industry research, health trend analysis, academic studies, or service improvements."
    },
    {
        "text":  "What This Means:"
    },
    {
        "text":  "The data shared does not include any personal identifiers such as your name, contact details, or specific health records.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Information is combined with that of other users to present general patterns — for example:",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "“60% of our home care patients are above 60 years old”",
        "listStyle":  "circle",
        "level":  1
    },
    {
        "text":  "“30% of ICU-at-home requests come from Tier-2 cities”",
        "listStyle":  "circle",
        "level":  1
    },
    {
        "text":  "Third parties may include:",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Healthcare research organizations",
        "listStyle":  "circle",
        "level":  1
    },
    {
        "text":  "Government/public health bodies",
        "listStyle":  "circle",
        "level":  1
    },
    {
        "text":  "Universities or academic institutions",
        "listStyle":  "circle",
        "level":  1
    },
    {
        "text":  "Business partners (for non-commercial insight only)",
        "listStyle":  "circle",
        "level":  1
    },
    {
        "text":  "Analytics service providers",
        "listStyle":  "circle",
        "level":  1
    },
    {
        "text":  "Why We Share This Information:"
    },
    {
        "text":  "To help improve public health understanding and planning",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "To inform product/service development and innovation",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "To contribute to academic and clinical research in elderly or critical care",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "To enhance the delivery of home-based healthcare services in India",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "We ensure such data is fully anonymized and cannot be traced back to any individual."
    },
    {
        "text":  "We do not sell or trade personal information under any circumstances."
    },
    {
        "text":  "14. Feedback, Concerns, and Grievance Redressal"
    },
    {
        "text":  "We are committed to maintaining transparency and protecting your personal and health-related information. If you have any questions, concerns, or complaints regarding:"
    },
    {
        "text":  "How your data is collected, stored, or used",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Any unauthorized access or data breach",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Accuracy of your personal or medical records",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Consent-related issues",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Any misuse of information",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "You can contact our Grievance Officer at the details below."
    },
    {
        "text":  "Grievance Officer Details:"
    },
    {
        "text":  "Name: D.Sivaguru\nEmail: care@nhlcare.com\nPhone: 9600002303\nAddress:Innova8Millenia, 2nd Floor, East Wing, RNZ, Millenia Tech Park, Campus 1A, OMR, Perunkudi, Chennai 600096"
    },
    {
        "text":  "We will acknowledge your concern within 48 hours and aim to resolve it within 7 working days, in accordance with the applicable laws of India."
    },
    {
        "text":  "15. Communication Methods and Consent"
    },
    {
        "text":  "We may contact you using various communication methods for the purpose of providing quality home healthcare services, sharing important updates, or responding to your inquiries."
    },
    {
        "text":  "By Sharing your personal contact details, you agree to be contacted by Narpavi Homehealth and Life Care Pvt. Ltd. . You do not have any objection to receive various mode of communication from Narpavi. This consent shall supersede any preferences set through Do Not Disturb ( DND Register ) or National Customer Preference Register ( NCPR)"
    },
    {
        "text":  "Modes of Communication:"
    },
    {
        "text":  "Email: For appointment confirmations, care updates, reports, billing, and general information.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Phone/Calls: For urgent care coordination, real-time health updates, or consent verification.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "SMS/WhatsApp: For reminders, appointment schedules, or health alerts.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "In-App Notifications (if applicable): For updates related to services and user experience.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Purpose of Communication:"
    },
    {
        "text":  "To share important health-related updates or changes in treatment plans",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "To send appointment or payment reminders",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "To respond to queries or feedback",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "To send service announcements, newsletters, or promotional content (only with prior consent)",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Your Rights and Preferences:"
    },
    {
        "text":  "You may choose to:"
    },
    {
        "text":  "Opt out of marketing communications by clicking the unsubscribe link in emails or notifying us directly.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Limit contact to specific modes (e.g., only email or SMS).",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Withdraw communication consent at any time by contacting our support team.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "We will never spam, misuse, or share your communication details with third parties without your explicit consent."
    },
    {
        "text":  "16. Website Disclaimer"
    },
    {
        "text":  "Narpavi Homehealth \u0026 Life Care Pvt Ltd\nWebsite: www.nhlcare.com\nEffective Date: 1st  October 2025"
    },
    {
        "text":  "1. Not a Substitute for Professional Medical Advice"
    },
    {
        "text":  "All content on this website — including articles, service descriptions, blogs, and FAQs — is intended for informational purposes only and should not be considered as medical advice, diagnosis, or treatment."
    },
    {
        "text":  "Always seek the advice of a qualified physician or healthcare provider with any questions you may have regarding a medical condition."
    },
    {
        "text":  "3. Service Limitations"
    },
    {
        "text":  "While we strive to ensure that our services meet high-quality standards, outcomes of home healthcare services can vary based on individual patient conditions and circumstances. Narpavi Homehealth \u0026 Life Care Pvt Ltd will not be held liable for:"
    },
    {
        "text":  "Any unforeseen medical complications",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Delays due to third-party services (e.g., ambulance, labs)",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Refusal or non-cooperation by the patient or family",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "5. Limitation of Liability"
    },
    {
        "text":  "Narpavi Homehealth \u0026 Life Care Pvt Ltd, its employees, affiliates, and service providers shall not be liable for any direct, indirect, incidental, or consequential damages resulting from:"
    },
    {
        "text":  "Use or inability to use the website",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Reliance on any content or service descriptions",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Delays in medical attention due to website reliance",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "17. Legal Jurisdiction"
    },
    {
        "text":  "This Privacy Policy and any disputes arising from it shall be governed by and interpreted in accordance with the laws of India."
    },
    {
        "text":  "By using our website and services, you agree that any legal action or proceeding related to this Privacy Policy shall be subject to the exclusive jurisdiction of the courts located in Chennai, India."
    },
    {
        "text":  "18. External Links"
    },
    {
        "text":  "Our website may contain links to third-party websites, applications, or services that are not operated or controlled by Narpavi Homehealth \u0026 Life Care Pvt Ltd."
    },
    {
        "text":  "We provide these links for informational or convenience purposes only. Please note:"
    },
    {
        "text":  "We do not endorse or take responsibility for the content, accuracy, or privacy practices of these external sites.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Once you leave our website, our Privacy Policy no longer applies, and you are subject to the terms and policies of the external website.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "We encourage you to review the privacy policies and terms of service of any third-party websites before providing your personal or health information.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Narpavi Homehealth \u0026 Life Care Pvt Ltd will not be held liable for any loss, damage, or consequences resulting from your interaction with these external websites."
    },
    {
        "text":  "19. Un authorized Use of This Website"
    },
    {
        "text":  "You agree to use this website only for lawful and intended purposes. Any unauthorized use of the website or its content is strictly prohibited."
    },
    {
        "text":  "Unauthorized activities include but are not limited to:"
    },
    {
        "text":  "Attempting to gain un authorized access to our servers, databases, or other secure areas",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Collecting or harvesting personal data of other users",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Copying, reproducing, modifying, or distributing website content without written permission",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Using the website in a way that could damage, disable, or impair our services",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Impersonating any person, healthcare provider, or representative of Narpavi Homehealth \u0026 Life Care Pvt Ltd",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Uploading or transmitting viruses, malicious code, or harmful scripts",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Engaging in fraudulent, deceptive, or unlawful activity using the site or its services",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "We reserve the right to restrict or terminate access to the website for any user who violates these terms and may pursue legal action where applicable under Indian law."
    },
    {
        "text":  "20. Trademark Notice"
    },
    {
        "text":  "All trademarks, logos, service names, and branding displayed on this website — including but not limited to “Narpavi Homehealth \u0026 Life Care Pvt Ltd”, its logo, slogans, and service names — are the intellectual property of Narpavi Homehealth \u0026 Life Care Pvt Ltd."
    },
    {
        "text":  "These marks may not be used:"
    },
    {
        "text":  "In connection with any product or service that is not provided by us",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "In any way that may cause confusion among patients or users",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "To disparage or misrepresent our company, services, or reputation",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Without our prior written consent",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Unauthorised use or reproduction of our trademarks or branding elements is strictly prohibited and may result in legal action under applicable intellectual property laws in India."
    },
    {
        "text":  "If you believe any content on this website infringes on your trademark rights, please contact us immediately at care@nhlcare.com"
    },
    {
        "text":  "21. Intellectual Property Rights"
    },
    {
        "text":  "Unless otherwise stated, all content on this website is the intellectual property of Narpavi Homehealth \u0026 Life Care Pvt Ltd and is protected under applicable copyright, trademark, and other intellectual property laws of India."
    },
    {
        "text":  "This includes but is not limited to:"
    },
    {
        "text":  "Text, graphics, icons, and images",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Logos, service names, and brand elements",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Website design, layout, and user interface",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Articles, blogs, and educational materials",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Videos, illustrations, and downloadable brochures",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Service descriptions, care plans, and pricing structures",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Custom software, web tools, or forms used in the platform",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Usage Restrictions:"
    },
    {
        "text":  "You may not:"
    },
    {
        "text":  "Reproduce, republish, distribute, or publicly display any material without express written permission",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Copy or adapt source code or backend architecture",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Use our name, branding, or logo for commercial or promotional use",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Extract or reuse any data or content for commercial purposes",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Authorized use is granted only for:"
    },
    {
        "text":  "Personal, non-commercial use of the website",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Downloading publicly available brochures, service descriptions, or booking forms for personal healthcare use",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Violations"
    },
    {
        "text":  "Any misuse, reproduction, or infringement of our intellectual property may result in legal action under Indian law, including but not limited to the Copyright Act, 1957, and the Trademarks Act, 1999."
    },
    {
        "text":  "22. User Responsibility"
    },
    {
        "text":  "By accessing or using the services of Narpavi Homehealth \u0026 Life Care Pvt Ltd, you agree to use the website and our healthcare services in a lawful, respectful, and responsible manner."
    },
    {
        "text":  "As a user, you are responsible for:"
    },
    {
        "text":  "Providing accurate, complete, and up-to-date personal, medical, and contact information",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Using the services only for lawful purposes and not misrepresenting your identity or eligibility",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Maintaining the confidentiality of your login credentials (if applicable)",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Reviewing and understanding the terms of our policies, including Privacy Policy, Disclaimer, and Terms \u0026 Conditions",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Seeking emergency care independently if your condition is urgent or life-threatening",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Cooperating with medical staff and following prescribed treatment plans responsibly",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Not using the website to post or transmit any offensive, unlawful, or malicious content",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Not attempting to hack, alter, disrupt, or reverse-engineer the website or its software",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Failure to Comply May Result In:"
    },
    {
        "text":  "Temporary or permanent suspension of access to services",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Reporting of illegal activity to relevant authorities",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Legal action for damages or misuse under applicable Indian laws",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "23. No Guarantee on Information"
    },
    {
        "text":  "While Narpavi Homehealth \u0026 Life Care Pvt Ltd makes every effort to ensure that the information provided on this website is accurate, up-to-date, and reliable, we do not make any warranties or guarantees, express or implied, regarding:"
    },
    {
        "text":  "The accuracy, completeness, or timeliness of any content or service descriptions",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "The applicability of health-related information to your specific condition",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "The availability or uninterrupted functioning of the website",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "The error-free nature of the website content or functionality",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "The information provided, including articles, blogs, service details, and care protocols, is intended for general informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment."
    },
    {
        "text":  "Users are responsible for verifying any critical information before acting upon it."
    },
    {
        "text":  "We reserve the right to update, modify, or remove content at any time without prior notice."
    },
    {
        "text":  "24. Data Storage"
    },
    {
        "text":  "All personal, medical, and communication data collected by Narpavi Homehealth \u0026 Life Care Pvt Ltd is stored securely in compliance with applicable data protection regulations in India, including the Digital Personal Data Protection Act, 2023."
    },
    {
        "text":  "Where We Store Data:"
    },
    {
        "text":  "Data is stored on secure servers located within India or in trusted cloud environments that comply with data security standards (such as ISO 27001, HIPAA, or equivalent).",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Physical records (if maintained) are stored in restricted-access facilities with appropriate confidentiality protocols.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "How We Protect Stored Data:"
    },
    {
        "text":  "Data is encrypted both at rest and in transit using industry-standard encryption techniques",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Access is restricted to authorized personnel only, based on a strict need-to-know basis",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Firewalls, intrusion detection systems, and regular audits are in place to prevent unauthorized access or breaches",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Backup systems ensure data recovery in case of technical failures or disasters",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Data Retention Period:"
    },
    {
        "text":  "We retain personal and health data only for as long as necessary to:"
    },
    {
        "text":  "Fulfill the purposes for which it was collected",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Comply with medical, legal, and regulatory requirements",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Resolve disputes and enforce agreements",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "After the retention period ends, data is securely deleted or anonymized, unless retention is required by law or for legitimate healthcare or legal reasons."
    },
    {
        "text":  "25. How Long We Keep Your Personal Information and Why"
    },
    {
        "text":  "We retain your personal, health, and communication data only for as long as necessary to fulfill the purpose for which it was collected, or as required under applicable laws and regulations in India."
    },
    {
        "text":  "Data Deletion or Anonymization:"
    },
    {
        "text":  "After the retention period, data will be securely deleted, or where appropriate, anonymized so that it can no longer identify you.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "You may also request deletion of your personal data at any time (unless retention is required by law or medical standards).",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "26. User-Generated Content Policy"
    },
    {
        "text":  "Users may be allowed to submit content on our website or digital platforms, including but not limited to Testimonials and service reviews, Feedback or suggestions, Photographs (with consent), Health stories or experiences, Caregiver or nurse listings and profiles, Questions or comments on blogs or social media posts"
    },
    {
        "text":  "By submitting content, you agree to the following: "
    },
    {
        "text":  "1. Ownership and Rights:"
    },
    {
        "text":  "You retain ownership of your content but grant Narpavi Homehealth \u0026 Life Care Pvt Ltd a non-exclusive, royalty-free, worldwide, perpetual license to use, reproduce, publish, display, and distribute the content across our platforms and marketing materials, unless you explicitly revoke such permission in writing.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "2. Responsibility:"
    },
    {
        "text":  "You are solely responsible for the content you post or submit.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "You must ensure that your content is truthful, respectful, and does not violate any privacy, copyright, or legal rights of others.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "You must not impersonate any person or misrepresent your affiliation with any individual or entity.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "3. Moderation and Removal:"
    },
    {
        "text":  "We reserve the right (but are not obligated) to monitor, review, edit, or remove any user-generated content at our discretion without prior notice.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "We may remove or refuse to post content that is offensive, misleading, promotional, unlawful, or harmful to our patients or brand.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "4. Consent for Identifiable Media:"
    },
    {
        "text":  "If you submit a story or image that includes any other person (such as a patient or caregiver), you must have obtained their explicit written consent before submission.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "27. Permissions Required to Use Our Mobile Application"
    },
    {
        "text":  "When you download and use the Narpavi Homehealth \u0026 Life Care Pvt Ltd mobile application, we may request access to certain features or data on your device in order to provide a seamless and personalized user experience. These may include:"
    },
    {
        "text":  "Permissions We May Request:"
    },
    {
        "text":  "User Control:"
    },
    {
        "text":  "You will be prompted to grant or deny each permission at the time it is needed.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "You can modify these permissions anytime through your device settings.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Denying some permissions may limit certain features or functionality of the app.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Data Usage:"
    },
    {
        "text":  "All data accessed through these permissions will be handled in accordance with our Privacy Policy and applicable Indian laws.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "No permissions will be used for surveillance, unauthorized data collection, or third-party marketing.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "28. How to Opt Out of Our Email Promotions"
    },
    {
        "text":  "We may occasionally send you emails, SMS, or WhatsApp messages about:"
    },
    {
        "text":  "Health tips and wellness resources",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "New services or offers",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Appointment or care reminders",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Satisfaction surveys or feedback forms",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "You have full control over your communication preferences."
    },
    {
        "text":  "How to Unsubscribe or Opt-Out:"
    },
    {
        "text":  "Every marketing email we send will include an \"Unsubscribe\" link at the bottom.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "You can also opt out anytime by emailing us at [your email ID] with the subject line: “Unsubscribe Me.”",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "For SMS/WhatsApp communications, you may reply with the word \"STOP\" to be removed from promotional lists.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Please note:"
    },
    {
        "text":  "Even if you opt out of promotional communications, we may still send important service-related messages, such as appointment confirmations, medical updates, or legal notices.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "29. How to Withdraw Your Consent and Permissions"
    },
    {
        "text":  "You have the right to withdraw your consent for the collection, use, or disclosure of your personal information at any time, subject to legal or contractual obligations."
    },
    {
        "text":  "Ways to Withdraw Consent:"
    },
    {
        "text":  "Email Request: You may email us at [your official support email] with a clear request to withdraw consent.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Account Settings (if applicable): If you have a registered account with us (via mobile app or website), you may access your privacy settings to change or revoke permissions.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "App Permissions: You can revoke app-level permissions (e.g., location, camera, contacts) anytime via your device settings under the Narpavi Homehealthapp.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "What Happens After Consent Withdrawal:"
    },
    {
        "text":  "We will cease processing your personal data for the purpose you withdrew consent for, within a reasonable time.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "In some cases, this may mean we can no longer provide certain services (e.g., location-based care, appointment reminders).",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "We may retain your data only if required by law (e.g., for medical record retention or financial audits).",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "30. Eligibility to Transact with Us"
    },
    {
        "text":  "By accessing or using the services of Narpavi Homehealth \u0026 Life Care Pvt Ltd, you represent and warrant that you meet the following eligibility criteria:"
    },
    {
        "text":  "Who Can Use Our Services:"
    },
    {
        "text":  "Individuals aged 18 years or older with the legal capacity to enter into binding agreements under Indian law.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Parents or legal guardians may transact on behalf of minors or individuals with disabilities, as permitted by law.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Authorized representatives such as family members, caretakers, or legal nominees may access services for another individual, with proper consent and documentation.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Healthcare professionals and caregivers registered with us must meet all eligibility and qualification requirements as per internal verification.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Who Cannot Use Our Services Without Prior Approval:"
    },
    {
        "text":  "Individuals under 18 years without a guardian.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Anyone acting fraudulently, misrepresenting identity, or attempting to bypass our safety protocols.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Any user restricted under applicable laws, medical regulatory standards, or by a prior suspension/termination from our platform.",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "31. Contact Us"
    },
    {
        "text":  "If you have questions, concerns, or complaints regarding this Privacy Policy or your data, please contact:",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Narpavi Homehealth \u0026 Life Care Pvt Ltd\nEmail: care@nhlcare.com\nPhone: 9600002303\nAddress: Innova8Millenia, 2nd Floor, East Wing, RNZ, Millenia Tech Park, Campus 1A, OMR, Perunkudi, Chennai 600096",
        "listStyle":  "disc",
        "level":  0
    },
    {
        "text":  "Bottom of Form"
    }
];

export const metadata: Metadata = {
  title: 'Privacy Policy - Narpavi Homecare',
  description: 'Privacy Policy for Narpavi Homehealth & Life Care Pvt Ltd.',
  alternates: { canonical: 'https://www.narpavihomecare.com/privacy' },
};

const paragraphStyle = {
  color: 'var(--text-secondary)',
  fontSize: '1rem',
  lineHeight: 1.8,
  marginBottom: '1rem',
  whiteSpace: 'pre-wrap',
} as const;

function renderText(text: string): ReactNode {
  return text.split('\n').map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 ? <br /> : null}
      {line}
    </Fragment>
  ));
}

function renderPolicyBlocks(blocks: readonly PolicyBlock[]): ReactElement[] {
  const rendered: ReactElement[] = [];
  let listRun: PolicyBlock[] = [];
  let listStyle: PolicyBlock['listStyle'];
  let expectedSection = 1;

  const flushList = () => {
    if (!listRun.length || !listStyle) {
      return;
    }

    const ListTag = (listStyle === 'decimal' || listStyle === 'lower-alpha' ? 'ol' : 'ul') as 'ol' | 'ul';

    rendered.push(
      <ListTag
        key={'list-' + rendered.length}
        style={{
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
          listStyleType: listStyle,
          margin: '0 0 1rem 1.25rem',
          paddingLeft: '1rem',
        }}
      >
        {listRun.map((item, index) => (
          <li
            key={item.text + '-' + index}
            style={{
              marginBottom: '0.5rem',
              marginLeft: `${(item.level ?? 0) * 1.25}rem`,
              whiteSpace: 'pre-wrap',
            }}
          >
            {renderText(item.text)}
          </li>
        ))}
      </ListTag>,
    );

    listRun = [];
    listStyle = undefined;
  };

  blocks.forEach((block) => {
    if (block.listStyle) {
      if (listStyle && block.listStyle !== listStyle) {
        flushList();
      }

      listStyle = block.listStyle;
      listRun.push(block);
      return;
    }

    flushList();

    const sectionMatch = block.text.match(/^(\d+)\.\s/);
    if (sectionMatch && Number(sectionMatch[1]) === expectedSection) {
      expectedSection += 1;
      rendered.push(
        <h2 key={'section-' + rendered.length} style={{ fontSize: '1.35rem', margin: '2rem 0 0.75rem' }}>
          {renderText(block.text)}
        </h2>,
      );
      return;
    }

    const trimmed = block.text.trim();
    const isShortSubheading =
      trimmed.length <= 110 &&
      !trimmed.endsWith('.') &&
      (trimmed.endsWith(':') || /^[A-Z][A-Za-z0-9 &,/().-]+$/.test(trimmed));

    if (isShortSubheading) {
      rendered.push(
        <h3 key={'subheading-' + rendered.length} style={{ fontSize: '1.05rem', margin: '1.35rem 0 0.5rem' }}>
          {renderText(block.text)}
        </h3>,
      );
      return;
    }

    rendered.push(
      <p key={'paragraph-' + rendered.length} style={paragraphStyle}>
        {renderText(block.text)}
      </p>,
    );
  });

  flushList();
  return rendered;
}

export default function PrivacyPage() {
  const [titleBlock, ...contentBlocks] = privacyPolicyBlocks;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      <section className="section" style={{ marginTop: 0 }}>
        <article className="container" style={{ maxWidth: '900px' }}>
          <h1 style={{ marginBottom: '1.5rem' }}>{titleBlock.text}</h1>
          {renderPolicyBlocks(contentBlocks)}
        </article>
      </section>
    </>
  );
}
