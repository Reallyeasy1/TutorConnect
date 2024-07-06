'use client';
import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Accordion from '@radix-ui/react-accordion';
import styles from './faq.module.css';
import NavBar from '@/components/nav-bar/navBar';
import Footer from '@/components/footer/footer';
import '../globals.css'; // Import global styles

type FAQProps = {
  faqs: { question: string; answer: string }[];
};

const ClientFAQ: React.FC<FAQProps> = ({ faqs }) => (
  <div className={styles.accordionContainer}>
    <h2 className="text-2xl font-bold mb-2">Client FAQ</h2>
    <Accordion.Root type="single" collapsible>
      {faqs.map((faq, index) => (
        <Accordion.Item value={`item-${index}`} key={index}>
          <Accordion.Header>
            <Accordion.Trigger className={styles.accordionTrigger}>
              {faq.question}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className={styles.accordionContent}>
            {faq.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  </div>
);

const TutorFAQ: React.FC<FAQProps> = ({ faqs }) => (
  <div className={styles.accordionContainer}>
    <h2 className="text-2xl font-bold mb-2">Tutor FAQ</h2>
    <Accordion.Root type="single" collapsible>
      {faqs.map((faq, index) => (
        <Accordion.Item value={`item-${index}`} key={index}>
          <Accordion.Header>
            <Accordion.Trigger className={styles.accordionTrigger}>
              {faq.question}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className={styles.accordionContent}>
            {faq.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  </div>
);

const FAQPage: React.FC = () => {
  const clientFAQs = [
    {
      question: 'How Do I Register For A Tuition Teacher?',
      answer: 'You may register for a tuition teacher by taking 1-2 minutes to fill up our simple form here. Or alternatively, you may contact us at +65 84829619 or skibidiToilet@gmail.com.'
    },
    {
      question: 'Do I Have To Pay Any Extra Fees?',
      answer: 'No, there are no extra fees.'
    },
    {
      question: 'What Are The Types of Tutors Available?',
      answer: 'We offer a wide range of tutors, including those who specialize in different subjects, levels, and student needs. Contact us to find the right tutor for you.'
    },
    {
      question: 'Do You Provide Trial Lessons?',
      answer: 'Yes, we do provide trial lessons. Please contact us to schedule a trial lesson with your selected tutor.'
    },
    {
      question: 'What If The Tutor Is Not Suitable?',
      answer: 'If the tutor is not suitable, you can request a change of tutor. We will work with you to find a better match for your needs.'
    },
    {
      question: 'How Is Payment Made?',
      answer: 'Payment can be made via bank transfer, credit card, or PayPal. Details will be provided upon confirmation of the tutoring arrangement.'
    },
    // Add more FAQs as needed
  ];

  const tutorFAQs = [
    {
      question: 'How Do I Sign Up As A Tutor?',
      answer: 'Sign up by filling our registration form here.'
    },
    {
      question: 'What Are The Requirements To Be A Tutor?',
      answer: 'The requirements are listed in our guidelines here.'
    },
    {
      question: 'How Do I Get Matched With Students?',
      answer: 'Once you have registered as a tutor, we will match you with students based on your qualifications, experience, and the subjects you teach.'
    },
    {
      question: 'How Do I Schedule Lessons With Students?',
      answer: 'You can schedule lessons with students through our platform. Both tutors and students have the flexibility to arrange lesson times that are convenient for both parties.'
    },
    {
      question: 'How Is Payment Processed?',
      answer: 'Payment is processed through our platform. Tutors will receive payment directly into their bank accounts after each lesson or on a monthly basis, depending on the arrangement.'
    },
    {
      question: 'What If I Have A Problem With A Student?',
      answer: 'If you encounter any problems with a student, please contact our support team immediately. We are here to help resolve any issues you may have.'
    },
    // Add more FAQs as needed
  ];

  return (
    <div>
      <NavBar />
      <div className={`${styles.container} mx-auto p-4`}>
        <Tabs.Root defaultValue="client">
          <Tabs.List className={styles.tabsList}>
            <Tabs.Trigger value="client" className={styles.tabsTrigger}>Client</Tabs.Trigger>
            <Tabs.Trigger value="tutor" className={styles.tabsTrigger}>Tutor</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="client">
            <ClientFAQ faqs={clientFAQs} />
          </Tabs.Content>
          <Tabs.Content value="tutor">
            <TutorFAQ faqs={tutorFAQs} />
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <Footer/>
    </div>
  );
};

export default FAQPage;
