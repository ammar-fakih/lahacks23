import Card from '@/components/Card';
import Layout from '@/components/layout';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function ListPage() {
  const [textbooks, setTextBooks] = useState([
    {
      name: 'OpenIntro Statistics',
      subject: 'Math',
      image: '/stats.png',
    },
    {
      name: 'OpenIntro Statistics',
      subject: 'Math',
      image: '/stats.png',
    },
    {
      name: 'OpenIntro Statistics',
      subject: 'Math',
      image: '/stats.png',
    },
    {
      name: 'OpenIntro Statistics',
      subject: 'Math',
      image: '/stats.png',
    },
    {
      name: 'OpenIntro Statistics',
      subject: 'Math',
      image: '/stats.png',
    },
    {
      name: 'OpenIntro Statistics',
      subject: 'Math',
      image: '/stats.png',
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
              url: '',
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

        <div className="fullwidth">
          <h1 style={{ textAlign: 'center' }}>TextBooks</h1>
        </div>
        <div
          className="flex flex-wrap space-x-2"
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            paddingRight: 50,
            paddingLeft: 50,
          }}
        >
          {renderListings()}
        </div>
      </Layout>
    </div>
  );
}
