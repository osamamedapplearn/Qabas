import React from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Helmet>
        <title>تواصل معنا | قبس</title>
        <meta name="description" content="تواصل مع قبس: واتساب، اتصال، بريد إلكتروني. اختر قطاعك واحجز استشارتك المجانية." />
      </Helmet>
      <Contact />
    </div>
  );
}
