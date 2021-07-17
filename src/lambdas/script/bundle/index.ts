import * as fs from 'fs';
import * as path from 'path';

import { Bundler } from './bundler';
import { ArgvOpts } from './argvs';
import { ErrorHandler } from './errHandler';

/**
 *
 * @class Bundle
 * @extends Bundler
 * @description Provides input validation and target files to Bundler
 *
 */
class Bundle extends Bundler {
   /**
    *
    * @param opts ArgvOpts
    * @description pass files and opts to Bundler, validate and run bundle.
    *
    */
   constructor(opts: ArgvOpts) {
      const files = fs.readdirSync(path.resolve(opts.target));
      super(files, opts);

      this._validateInputs(opts, files);
      this.bundle();
   }

   /**
    *
    * @param opts ArgvOpts
    * @param files paths[]
    * @description Validate manual inputs
    *
    */
   private _validateInputs(opts: ArgvOpts, files: string[]) {
      if (!opts.target || !opts.target.length) {
         throw ErrorHandler.emptyTarget();
      }

      if (typeof files !== 'object') {
         throw ErrorHandler.filesFormat();
      }
   }
}

new Bundle(new ArgvOpts(process.argv));
