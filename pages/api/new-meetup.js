import {MongoClient} from 'mongodb';

async function handler (req, res) {
    if(req.method === 'POST') {
        console.log('hi');
        const data = req.body;
        //const {title, image, address, description} = data;
        const client = await MongoClient.connect('mongodb+srv://gode429:b8nNdLzNtfH4pFij@learningmongo.fqq4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        
        const db = client.db();
        
        const meetupCollection = db.collection('meetups');
        
        const result = await meetupCollection.insertOne(data);
        console.log(result);

        client.close();

        res.status(201).json({message:'Meetup inserted!'});

    }
}

export default handler;
