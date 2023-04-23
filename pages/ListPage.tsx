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
      image: '/chemistry.png',
      pdf: "/public-docs/stats/ElementaryChemical.pdf"

    },
    {
      name: 'Style: Lessons in Clarity and Grace',
      subject: 'Eleventh Edition',
      folder: "/Chat?filePath=english&title=Style: Lessons in Clarity and Grace",
      image: '/english.png',
      pdf: "/public-docs/english/Williams Style 11th edition.pdf"
    },
  ])
  
  const [courses, setCourses] = useState([
    {
      name: 'MATH062',
      subject: 'Probability and Statistics',
      folder: "/Chat?filePath=stats&title=OpenIntro Statistics",
      image: '/math62.jpeg',
      pdf: "public-docs/stats/Intro Stats.pdf"
    },
    {
      name: 'WRIT001',
      subject: 'Introduction to Academic Writing',
      folder: "/Chat?filePath=english&title=Style: Lessons in Clarity and Grace",
      image: '/writ1.png',
      pdf: "/public-docs/english/Williams Style 11th edition.pdf"
    },
    {
      name: 'CHEM024',
      subject: 'Chemistry in the Modern World',
      folder: "/Chat?filePath=chemistry&title=Elementary Principles of Chemical Processes",
      image: '/chem24.png',
      pdf: "/public-docs/stats/ElementaryChemical.pdf"

    },
    ])

  const renderListings = (data) => {

    return data.map((textbook, index) => {
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
        
        <h1 style={{ fontSize: "2.5rem" }}>My Textbooks</h1>
        <br/>
        <h2 style={{ fontSize: "1rem" }}>My College: Harvey Mudd</h2>
        
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
          {renderListings(textbooks)}
        </div>

        <h1 style={{ fontSize: "2.5rem" }}>My Courses</h1>
        
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
          {renderListings(courses)}
        </div>
        
      </Layout>
    </div>
  );
}
