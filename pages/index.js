import {MongoClient} from 'mongodb';
import Head from 'next/head';
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a list of meetups"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const request = context.req;
//   const response = context.response;
//   // fetch data from an api//this function runs on every request
//   return {
//     props: {
//       meetups: DummyMeetups
//     }
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://gode429:b8nNdLzNtfH4pFij@learningmongo.fqq4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
