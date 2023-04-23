import Card from '@/components/Card';
import Layout from '@/components/layout';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function ListPage() {
  const [textbooks, setTextBooks] = useState([
    {
      name: 'OpenIntro Statistics',
      subject: 'Fourth Edition',
      folder: "/Chat?filePath=stats&title=OpenIntro Statistics",
      image: '/stats.png',
      pdf: "public-docs/stats/Intro Stats.pdf"
    },
    {
      name: 'Elementary Principles of Chemical Processes',
      subject: 'Fourth Edition',
      folder: "/Chat?filePath=chemistry&title=Elementary Principles of Chemical Processes",
      image: '/chem.jpg',
      pdf: "/public-docs/stats/ElementaryChemical.pdf"

    },
    {
      name: 'Style: Lessons in Clarity and Grace',
      subject: 'Eleventh Edition',
      folder: "/Chat?filePath=english&title=Style: Lessons in Clarity and Grace",
      image: '/eng.jpg',
      pdf: "/public-docs/english/Williams Style 11th edition.pdf"
    },
  ]);

  const renderListings = () => {
    // render 10 of the first element in textbooks state

    return textbooks.map((textbook, index) => {
      return (
        <div key={index} className="">
          <Card
            data={{
              name: textbook.name,
              url: textbook.folder,
              image: textbook.image,
              description: textbook.subject,
              imageBlurhash: '',
            }}
          />
        </div>
      );
    });
  };

  return (
    <div className="flex h-screen flex-col">
      <Layout title="MuddBot">
        <div style={{ flex: 10, padding: 30 }}></div>
        
        <div
          className="flex flex-wrap space-x-2"
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            paddingRight: 50,
            paddingLeft: 50,
            paddingBottom: 50
          }}
        >
          {renderListings()}
        </div>
      </Layout>
    </div>
  );
}
