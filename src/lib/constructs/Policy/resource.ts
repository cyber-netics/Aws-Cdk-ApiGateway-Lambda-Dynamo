import { PolicyStatement } from '@aws-cdk/aws-iam';

export class Dynamodb {
   public static read(resource = '*'): PolicyStatement {
      return new PolicyStatement({
         resources: [resource],
         actions: ['dynamodb:GetItem'],
      });
   }

   public static write(resource = '*'): PolicyStatement {
      return new PolicyStatement({
         resources: [resource],
         actions: ['dynamodb:PutItem'],
      });
   }

   public static readAndWrite(resource = '*', princials = []): PolicyStatement {
      return new PolicyStatement({
         principals: [...princials],
         resources: [resource],
         actions: ['dynamodb:PutItem', 'dynamodb:GetItem'],
      });
   }
}
