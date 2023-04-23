import BlurImage from './BlurImage';

import type { MdxCardData } from '@/types';
import Link from 'next/link';

interface CardProps {
  data: MdxCardData;
}

export default function Card({ data }: CardProps) {

  const scale = 100;
  return (
    <Link href={`${data.url}`} className='p-4'>
      <div style={{width: "20rem"}} className="hidden m-3 lg:block rounded-2xl border-2 border-gray-100 shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition-all ease duration-200">
        <div className="rounded-t-2xl overflow-hidden" 
          style={{display: 'flex', alignItems: 'flex-start'}}>
          <BlurImage
            alt={data.name ?? 'Card Thumbnail'}
            style={{height: '300px'}}
            width={8*scale}
            height={11*scale}
            className="w-full h-64 object-cover"
            src={data.image}
          />
        </div>
        <div className="py-6 px-5 h-36 w-500">
          <h3 className="font-cal text-2xl font-bold tracking-wide truncate">
            {data.name}
          </h3>
          <p className="mt-3 text-gray-800 italic text-base leading-snug">
            {data.description}
          </p>
        </div>
      </div>
      <div className="lg:hidden overflow-hidden rounded-xl m-2 flex items-center md:h-48 h-36 border-2 border-gray-100 focus:border-black active:border-black bg-white transition-all ease duration-200">
        <div className="w-2/5 relative h-full"
          style={{display: 'flex', alignItems: 'flex-start'}}
        >
          <BlurImage
            alt={data.name ?? 'Card thumbnail'}
            style={{height: '300px'}}
            width={8*scale}
            height={11*scale}
            className="h-full object-cover"
            src={data.image}
          />
        </div>
        <div className="py-6 px-5 w-3/5">
          <h3 className="font-cal my-0 text-xl font-bold tracking-wide truncate">
            {data.name}
          </h3>
          <p className="mt-3 text-gray-800 italic text-sm leading-snug font-normal">
            {data.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
