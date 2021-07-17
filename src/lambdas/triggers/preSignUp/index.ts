import * as AWS from 'aws-sdk';

export const handler = (event: any, _: any, callback: any) => {
   const cridentials = {
      region: process.env.DEFAULT_REGION,
   };

   const dynamo = new AWS.DynamoDB(cridentials);

   const params = {
      TableName: process.env.DYNAMO_TABLE,
      Item: {
         PK: {
            S: ' Util.createUuid(),',
         },
         SK: {
            S: 'attrs.name,',
         },
         FullName: {
            S: 'attrs.name,',
         },
         Email: {
            S: 'attrs.email,',
         },
         Created_At: {
            S: ' Util.timestamp(),',
         },
      },
   };

   dynamo.putItem(params, (err, data) => {
      if (err) {
         console.log(err, err.stack);
      } else {
         console.log(data);
      }
   });

   callback(null, {
      statusCode: 201,
      body: 'hello',
   });

   return {
      statusCode: 201,
   };
};
