import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head';

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
    <MeetupDetail {...props.meetupData}/>
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://gode429:b8nNdLzNtfH4pFij@learningmongo.fqq4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetupIds = await meetupCollection.find({}, {_id: 1}).toArray();
  client.close();
  return {
    fallback: false,
    paths : meetupIds.map(meetupId => ({
      params: {meetupId: meetupId._id.toString()}
    }))
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://gode429:b8nNdLzNtfH4pFij@learningmongo.fqq4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetup = await meetupCollection.findOne({_id: ObjectId(meetupId)});
  client.close();
    return {
        props : {
            meetupData: {
              id: meetup._id.toString(),
              image: meetup.image,
              title: meetup.title,
              address: meetup.address,
              description: meetup.description
            }
        },
    }
}

export default MeetupDetails;
