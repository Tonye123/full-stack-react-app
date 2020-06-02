require('dotenv').config();
const Airtable = require('airtable');
const { getAccessTokenFromHeaders } = require('./utils/auth')

Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY
})
const base = Airtable.base(process.env.AIRTABLE_BASE);
const table = base.table(process.env.AIRTABLE_TABLE)


exports.handler = async (event, context, callback) => {
    const token = getAccessTokenFromHeaders(event.headers);
    if(!token){
        return {
            statusCode: 401,
            body: JSON.stringify({ err: "User is not logged in"})
        }
    }
    
    if(event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({err: 'This method is not allowed!'})
        }
    }
    const {score,name} = JSON.parse(event.body);

    if(typeof score === 'undefined' || !name) {
        return {
            statusCode: 400,
            body:JSON.stringify({ err: 'Bad Request'}),
        }
    }

    

    try {
    const records = await table.select({
        sort: [{field: "score", direction: "desc"}],
    }).firstPage();
    const formattedRecords = records.map((record) => ({
        id: record.id,
        fields: record.fields,
    }))
    let lowestRecord = formattedRecords[9]
    console.log(lowestRecord);
    if(
        typeof lowestRecord.fields.score === 'undefined' ||
        score > lowestRecord.fields.score ) {
        //update this record with the incoming score
        const updateRecord = {
        id: lowestRecord.id,
        fields: { name, score },
        };   
       await table.update([updateRecord]);
       return {
           statusCode: 200,
           body: JSON.stringify(updateRecord),
       } 

    }else {
        return {
            statusCode: 200,
            body: JSON.stringify({})
        }
           
       }
    return {
        statusCode: 200,
        body: JSON.stringify(
            formattedRecords
        ),
    };
    } catch(err) {
        return {
            statusCode: 500,
            body: JSON.stringify({err:'Failed to save Data to Airtable'
            
            }),

        }

    }
    
};