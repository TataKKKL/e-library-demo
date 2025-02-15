import { ImSad } from "react-icons/im";
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { Book } from '../../interfaces/bookInterface';
import { GetStaticProps, GetStaticPaths } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 
    (typeof window !== 'undefined' ? window.location.origin : '');

    const res = await fetch(`${baseUrl}/api/books/${encodeURIComponent(params.id as string)}`);
    if (!res.ok) {
      throw new Error('Failed to fetch book');
    }
    const book = await res.json();

    return {
      props: {
        initialBook: book,
      },
      revalidate: 60,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

const BookPage = ({ initialBook }: { initialBook: Book }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const rating = initialBook.rating === 0 ? 
    <ImSad className="w-7 h-7"/> : 
    <><span className="text-yellow-700 dark:text-yellow-600">{initialBook.rating}</span> out of 5</>;

  const places = initialBook.places === "N/A" ? 
    <ImSad className="w-7 h-7"/> : 
    <>Mentions <span className="text-blue-500 dark:text-blue-400">{initialBook.places}</span></>;

  return (
    <>
      <Head>
        <title>{initialBook.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center">
        <div className="flex justify-center items-center max-w-4xl md:h-full">
          <div className="object-contain h-auto w-4/5">
            <div className="md:mt-10 mt-0">
              <img
                src={initialBook.img_url}
                alt='Book Cover'
              />
            </div>
          </div>
          <div className="flex justify-center text-center">
            <div>
              <h2 className="text-sm font-semibold">{initialBook.author}</h2>
              <h1 className="mt-1 font-bold text-3xl">{initialBook.title}</h1>
              <h3 className="mt-3 text-sm">{initialBook.genre}</h3>
              <p className="mt-10 font-normal ml-9">{initialBook.overview}</p>
              <div className="flex flex-col justify-space-between items-center">
                <p className="mt-2 ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Published in: <span className='text-green-500'>{initialBook.publication_date}</span>
                </p>
                <p className="mt-2 ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{places}</p>
                <p className="mt-2 ml-2 text-sm font-medium text-yellow-500 dark:text-yellow-400">{rating}</p>
              </div>
              <h3 className="mt-5 font-semibold text-xl">{initialBook.free ? "Free" : "Paid"}</h3>
              <div className="mt-4 ml-9">
                <div className="flex justify-center">
                  <button
                    onClick={() => window.open(initialBook.source_url)}
                    className="w-38 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Visit Website
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookPage;