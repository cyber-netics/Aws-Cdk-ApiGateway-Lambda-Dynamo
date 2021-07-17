import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';

export class UserManagement extends cdk.Construct {
   public readonly adminUser: iam.IUser;
   public readonly adminGroup: iam.Group;

   constructor(scope: cdk.Construct, id: string) {
      super(scope, id);

      /**
       *
       * Groups
       *
       */
      this.adminGroup = new iam.Group(scope, `Admin-Group`, {
         groupName: 'Admin-Group',
      });

      /**
       *
       * Users
       */
      // Existing user -> Admin
      this.adminUser = iam.User.fromUserName(scope, 'Admin-User', 'Admin');
   }
}
