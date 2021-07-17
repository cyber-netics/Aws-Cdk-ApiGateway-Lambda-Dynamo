import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda';

export class Assets {
   static _path = 'lambdas/dist/triggers/';

   static getAsset(dir: string): lambda.Code {
      const pathDir = `${Assets._path}/${dir}`;
      return lambda.Code.fromAsset(path.resolve(pathDir));
   }
}
