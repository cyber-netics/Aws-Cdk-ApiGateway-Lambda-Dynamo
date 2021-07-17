import * as cdk from '@aws-cdk/core';
import * as dynamo from '@aws-cdk/aws-dynamodb';

export class Dynamodb extends cdk.Construct {
   public readonly dynamodb: dynamo.Table;

   constructor(scope: cdk.Construct, id: string) {
      super(scope, id);

      /**
       *
       * Table
       *
       */
      this.dynamodb = new dynamo.Table(this, `${id}-Table`, {
         tableName: id,
         partitionKey: {
            name: 'PK',
            type: dynamo.AttributeType.STRING,
         },
         sortKey: {
            name: 'SK',
            type: dynamo.AttributeType.STRING,
         },
      });

      /**
       *
       * GSI
       *
       */
      this.dynamodb.addGlobalSecondaryIndex({
         indexName: 'GSI1',
         partitionKey: {
            name: 'SK',
            type: dynamo.AttributeType.STRING,
         },
      });
   }
}
