import * as cdk from '@aws-cdk/core';
import * as identity from '../constructs/UserManagement';

export class Identity extends cdk.Stack {
   constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      /**
       *
       * Identity construct
       *
       */
      const _identity = new identity.UserManagement(this, id);

      /**
       *
       * Add User to group
       *
       */
      _identity.adminGroup.addUser(_identity.adminUser);
   }
}
