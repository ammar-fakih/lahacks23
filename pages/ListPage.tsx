import Card from '@/components/Card';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function ListPage() {
  const [isAtTop, setIsAtTop] = useState(true);
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

  useEffect(() => {
    window.onscroll = function () {
      setIsAtTop(window.pageYOffset === 0);
    };
  }, []);

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
      <div style={{ flex: 10, padding: 20  }}></div>
      <div
        className={
          isAtTop
            ? 'fixed w-full top-0 left-0 right-0 h-16 bg-white z-30 transition-all ease duration-150 flex'
            : 'fixed w-full drop-shadow-md  top-0 left-0 right-0 h-16 bg-white z-30 transition-all ease duration-150 flex'
        }
      >
        <div className="flex justify-center items-center space-x-5 h-full max-w-screen-xl mx-auto px-10 sm:px-20">
          <div className="h-8 w-8 inline-block rounded-full overflow-hidden align-middle">
            <Image
              alt="Platforms Starter Kit"
              loading="lazy"
              width="50"
              height="50"
              decoding="async"
              data-nimg="1"
              src="/logo.jpg"
              style={{ color: 'transparent' }}
            />
          </div>
          <span className="inline-block ml-3 font-medium truncate">
            MuddBot
          </span>
        </div>
      </div>
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
    </div>
  );
}
