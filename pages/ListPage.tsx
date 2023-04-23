import Card from '@/components/Card';
import Layout from '@/components/layout';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const collegeList = [
  'Cal Tech University',
  'Harvey Mudd College',
  'Pitzer College',
  'Scripps College',
  'Claremont McKenna College',
  'Pomona College',
];

export default function ListPage() {
  const [college, setCollege] = useState('Harvey Mudd College');

  const [textbooks, setTextBooks] = useState([
    {
      name: 'OpenIntro Statistics',
      subject: 'Fourth Edition',
      folder: '/Chat?filePath=stats&title=OpenIntro Statistics',
      image: '/stats.png',
      pdf: 'public-docs/stats/Intro Stats.pdf',
      colleges: ['Harvey Mudd College'],
    },
    {
      name: 'Elementary Principles of Chemical Processes',
      subject: 'Fourth Edition',
      folder:
        '/Chat?filePath=chemistry&title=Elementary Principles of Chemical Processes',
      image: '/chemistry.png',
      pdf: '/public-docs/stats/ElementaryChemical.pdf',
      colleges: ['Harvey Mudd College'],
    },
    {
      name: 'Style: Lessons in Clarity and Grace',
      subject: 'Eleventh Edition',
      folder:
        '/Chat?filePath=english&title=Style: Lessons in Clarity and Grace',
      image: '/english.png',
      pdf: '/public-docs/english/Williams Style 11th edition.pdf',
      colleges: ['Harvey Mudd College'],
    },
  ]);

  const [courses, setCourses] = useState([
    {
      name: 'MATH062',
      subject: 'Probability and Statistics',
      folder: '/Chat?filePath=stats&title=OpenIntro Statistics',
      image: '/math62.jpeg',
      pdf: ['public-docs/stats/Intro Stats.pdf'],
      colleges: ['Harvey Mudd College'],
    },
    {
      name: 'WRIT001',
      subject: 'Introduction to Academic Writing',
      folder:
        '/Chat?filePath=english&title=Style: Lessons in Clarity and Grace',
      image: '/writ1.png',
      pdf: ['/public-docs/english/Williams Style 11th edition.pdf'],
      colleges: ['Harvey Mudd College'],
    },
    {
      name: 'CHEM024',
      subject: 'Chemistry in the Modern World',
      folder:
        '/Chat?filePath=chemistry&title=Elementary Principles of Chemical Processes',
      image: '/chem24.png',
      pdf: ['/public-docs/stats/ElementaryChemical.pdf'],
      colleges: ['Harvey Mudd College'],
    },
  ]);

  const renderListings = (
    data: {
      name: string;
      subject: string;
      folder: string;
      image: string;
      pdf: string | string[];
      colleges: string[];
    }[],
  ) => {
    return data
      .filter((textbook) => textbook.colleges.includes(college))
      .map((textbook, index) => {
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
        <h1 style={{ fontSize: '2.5rem' }}>My Textbooks</h1>
        <br />
        <h2 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center' }}>
          <span>My College:</span>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              style={{ marginLeft: 10, color: 'black' }}
              labelId="demo-select-small-label"
              id="demo-simple-select"
              value={college}
              label="College"
              onChange={(updatedCollege) =>
                setCollege(updatedCollege.target.value)
              }
            >
              {collegeList.map((c) => {
                return (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </h2>

        <div style={{ flex: 10, padding: 30 }}></div>
        <div
          className="flex flex-wrap space-x-2"
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            paddingRight: 50,
            paddingLeft: 50,
            paddingBottom: 50,
          }}
        >
          {renderListings(textbooks)}
        </div>

        <h1 style={{ fontSize: '2.5rem' }}>My Courses</h1>

        <div
          className="flex flex-wrap space-x-2"
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            paddingRight: 50,
            paddingLeft: 50,
            paddingBottom: 50,
          }}
        >
          {renderListings(courses)}
        </div>
      </Layout>
    </div>
  );
}
