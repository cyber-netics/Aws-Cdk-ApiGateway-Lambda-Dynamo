import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { Assets } from './assets';

export class Functions extends cdk.Construct {
   public readonly testfunk: lambda.Function;
   public readonly preSignUp: lambda.Function;

   constructor(scope: cdk.Construct, id: string) {
      super(scope, id);

      this.preSignUp = new lambda.Function(this, `DoSomething-One`, {
         code: Assets.getAsset('preSignUp'),
         handler: 'index.handler',
         functionName: 'Api-Function',
         runtime: lambda.Runtime.NODEJS_14_X,
      });

      this.testfunk = new lambda.Function(this, `DoSomething-Two`, {
         code: Assets.getAsset('postAuth'),
         handler: 'index.handler',
         functionName: 'Api-Function2',
         runtime: lambda.Runtime.NODEJS_14_X,
      });
   }
}
