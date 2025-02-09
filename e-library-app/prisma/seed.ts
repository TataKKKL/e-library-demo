import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const booksData = [
  {
    title: "The Last Olympian",
    author: "Rick Riordan and Robert Venditti",
    genre: "Fiction and Greek Mythology",
    overview: "The greatest monster of all, the storm giant Typhon, is on the loose, wreaking havoc and destruction across the U.S. - while Kronos's army lays siege to Manhattan. Soon Percy Jackson must make the hardest choice of his life - a choice that will save or destroy the world.",
    rating: 4.29,
    publicationDate: 2009,
    places: "United States of America",
    imgUrl: "https://covers.openlibrary.org/b/id/6624107-M.jpg",
    sourceUrl: "https://openlibrary.org/works/OL492642W/The_last_Olympian?edition=ia%3Alastolympianperc00rior_740"
  },
  {
    title: "Drought",
    author: "Graham Masterton",
    genre: "Fiction, Droughts and Social Workers",
    overview: "A nationwide drought causes the taps to run dry and ex-marine and social worker Martin Makepeace must take drastic action to protect his family, while corrupt politicians try to use the drought to their advantage.",
    rating: 0,
    publicationDate: 2014,
    places: "United States of America",
    imgUrl: "https://covers.openlibrary.org/b/id/8192803-M.jpg",
    sourceUrl: "https://openlibrary.org/works/OL17882522W/Drought?edition=ia%3Adrought0000mast"
  },
  {
    title: "The Infinite Sea",
    author: "Rick Yancey",
    genre: "Science fiction, Aliens and Survival skills",
    overview: "Cassie Sullivan, one of Earth's few remaining human survivors, attempts to put a stop to the Others' plan to destroy the remaining humans.",
    rating: 5.00,
    publicationDate: 2014,
    places: "N/A",
    imgUrl: "https://covers.openlibrary.org/b/id/7385181-M.jpg",
    sourceUrl: "https://openlibrary.org/works/OL17305107W/The_Infinite_Sea?edition=ia%3Ainfinitesea0000yanc"
  },
  {
    title: "The Mummy: A Junior Novelization",
    author: "David Levithan, Stephen Sommers, Pearson Education Staff, and Mike Dean",
    genre: "Fiction and Mummies",
    overview: "Some 3,700 years ago an Egyptian High Priest was mummified and entombed alive and cursed for all eternity. In the 1920s, dashing American Rick O'Connell, accidentally discovers the Lost City of the Dead. But the ancient curse of the Mummy is not dead. A heart-stopping adventure story based on the hugely successful 1999 film.",
    rating: 0,
    publicationDate: 1999,
    places: "Egypt",
    imgUrl: "https://covers.openlibrary.org/b/id/1227950-M.jpg",
    sourceUrl: "https://openlibrary.org/works/OL5736969W/The_Mummy?edition=ia%3Amummyjuniornovel00levi"
  },
  {
    title: "The adventures of Tom Sawyer",
    author: "Mark Twain, William Dufris, Samuel Langhorne, and Edibook",
    genre: "Fiction and Classic",
    overview: "The adventures and pranks of a mischievous boy growing up in a Mississippi River town in the early nineteenth century.",
    rating: 3.97,
    publicationDate: 1983,
    places: "United States of America",
    imgUrl: "https://covers.openlibrary.org/b/id/11462426-M.jpg",
    sourceUrl: "https://openlibrary.org/works/OL53919W/The_Adventures_of_Tom_Sawyer"
  },
  {
    title: "Croc-blanc",
    author: "Jack London",
    genre: "Classic literature and Juvenile fiction",
    overview: "The story of a wolf/dog cross, who is raised by Indians, and becomes a deadly fighter.",
    rating: 4.43,
    publicationDate: 2004,
    places: "Canada",
    imgUrl: "https://covers.openlibrary.org/b/id/11444380-M.jpg",
    sourceUrl: "https://openlibrary.org/works/OL74504W/White_Fang"
  },
  {
    title: "Around the world in eighty days",
    author: "Jules Verne",
    genre: "Viajes alrededor del mundo and Fiction",
    overview: "Phileas Fogg, a very punctual man had broken into an argument while conversing about the recent bank robbery. To keep his word of proving that he would travel around the world in 80 days and win the bet, he sets on a long trip, where he is joined by a few other people on the way. A wonderful adventure is about to begin!",
    rating: 3.87,
    publicationDate: 2007,
    places: "United Kingdon",
    imgUrl: "https://covers.openlibrary.org/b/id/10730548-M.jpg",
    sourceUrl: "https://openlibrary.org/works/OL1100007W/Le_tour_du_monde_en_quatre-vingts_jours"
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const book of booksData) {
    const createdBook = await prisma.book.create({
      data: book
    })
    console.log(`Created book with id: ${createdBook.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })