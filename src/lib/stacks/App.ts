import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';

import * as api from '../constructs/Api';
import * as database from '../constructs/Database';

interface IProps extends cdk.StackProps {
   env: {
      region: string;
   };
}

export class App extends cdk.Stack {
   constructor(scope: cdk.App, id: string, props: IProps) {
      super(scope, id, props);

      /**
       *
       * Resources
       *
       */
      const _db = new database.Dynamodb(this, 'Dynamo-DB');
      const _gwt = new apigw.RestApi(this, 'RestApi-Main');
      const _api = new api.Functions(this, 'Api-Functions');

      /**
       *
       * Api Getway connection
       *
       */
      _gwt.root
         .resourceForPath('dosomething-2')
         .addMethod('GET', new apigw.LambdaIntegration(_api.testfunk));

      _gwt.root
         .resourceForPath('dosomething')
         .addMethod('GET', new apigw.LambdaIntegration(_api.preSignUp));

      /**
       *
       * Api Environmental Variables
       *
       */
      _api.preSignUp.addEnvironment('DEFAULT_REGION', props.env.region);
      _api.preSignUp.addEnvironment('DYNAMO_TABLE', _db.dynamodb.tableName);

      /**
       *
       * Api Permissions
       *
       */
      _db.dynamodb.grantReadWriteData(_api.preSignUp);

      /**
       *
       * Exports
       *
       */
      new cdk.CfnOutput(this, 'HTTP API URL', {
         value: _gwt.url ?? 'Something went wrong with the deploy',
      });
   }
}
