import { ImSad } from "react-icons/im";
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import data from '../../data/books.json';
import type { Book } from '../../interfaces/bookInterface';

export async function getStaticPaths() {
  return {
    paths: data.map((book: Book) => ({
      params: { id: book.title },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const bookData = data.find((book: Book) => book.title === params.id);
  
  if (!bookData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      initialBook: bookData,
    },
  };
}

const Book = ({ initialBook }: { initialBook: Book }) => {
  const router = useRouter();
  const { id } = router.query;
  
  const book = initialBook || data.find((elem: Book) => elem.title === id);

  if (!book) {
    return <div>Loading...</div>;
  }

  const rating = book.rating === 0 ? 
    <ImSad className="w-7 h-7"/> : 
    <><span className="text-yellow-700 dark:text-yellow-600">{book.rating}</span> out of 5</>;
    
  const places = book.places === "N/A" ? 
    <ImSad className="w-7 h-7"/> : 
    <>Mentions <span className="text-blue-500 dark:text-blue-400">{book.places}</span></>;

  return (
    <>
      <Head>
        <title>{book.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center">
        <div className="flex justify-center items-center max-w-4xl md:h-full">
          <div className="object-contain h-auto w-4/5">
            <div className="md:mt-10 mt-0">
              <img
                src={book.img}
                alt='Book Cover'
              />
            </div>
          </div>
          <div className="flex justify-center text-center">
            <div>
              <h2 className="text-sm font-semibold">{book.author}</h2>
              <h1 className="mt-1 font-bold text-3xl">{book.title}</h1>
              <h3 className="mt-3 text-sm">{book.genre}</h3>
              <p className="mt-10 font-normal ml-9">{book.overview}</p>
              <div className="flex flex-col justify-space-between items-center">
                <p className="mt-2 ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Published in: <span className='text-green-500'>{book.date}</span>
                </p>
                <p className="mt-2 ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{places}</p>
                <p className="mt-2 ml-2 text-sm font-medium text-yellow-500 dark:text-yellow-400">{rating}</p>
              </div>
              <h3 className="mt-5 font-semibold text-xl">{book.free ? "Free" : "Paid"}</h3>
              <div className="mt-4 ml-9">
                <div className="flex gap-5 items-center justify-center">
                  <div className='py-2 px-2 rounded font-bold border border-solid border-1 border-gray-500 bg-blue-600 hover:bg-blue-700 text-white'>
                    <Link href='/book'>Go Back</Link>
                  </div>
                  <button
                    onClick={() => window.open(book.url)}
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

export default Book;