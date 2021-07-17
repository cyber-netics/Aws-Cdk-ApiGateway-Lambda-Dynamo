import * as fs from 'fs';
import * as path from 'path';
import * as fse from 'fs-extra';
import * as cp from 'child_process';
import { Paths } from './paths';

interface IBundler {
   bundle(): void;
}

interface IOpts {
   wrap: boolean;
   target: string;
}

/**
 *
 * @class Bundler
 * @implements {IBundler}
 * @description Bundles lambda Triggers, Functions, Layers
 *
 */
export class Bundler implements IBundler {
   private readonly _dir: string;
   private readonly _wrap: boolean;
   private readonly _files: string[];

   constructor(files: string[], opts: IOpts) {
      this._files = files;
      this._wrap = opts.wrap;
      this._dir = opts.target;
   }

   /**
    *
    * @param file File Path
    * @description Copy package.json corr. dir. in dist
    *
    */
   private async _package(_paths: Paths): Promise<void> {
      await fs.copyFileSync(
         path.resolve(_paths.target('package.json')),
         path.resolve(_paths.dist('package.json'))
      );
   }

   /**
    *
    * @param file File Path
    * @description Install npm packages
    *
    */
   private async _install(_paths: Paths): Promise<void> {
      const _cmd = `npm install --only=prod --prefix`;
      await cp.execSync(`${_cmd} ${_paths.dist()}`);
   }

   /**
    *
    * @param paths Dir Paths
    * @description Remove package and lock files
    *
    */
   private async _cleanup(paths: Paths): Promise<void> {
      await fs.unlinkSync(paths.dist('package.json'));
      await fs.unlinkSync(paths.dist('package-lock.json'));
   }

   /**
    *
    * @param paths Dir Paths
    * @description Wrap each in directory
    *
    */
   private async _wrapper(paths: Paths): Promise<void> {
      if (!this._wrap) return;
      await fse.moveSync(paths.dist(), paths.tempDist(paths.file));
      await fs.renameSync(paths.tempDist(), paths.dist());
   }

   /**
    *
    * @param paths Dir Paths
    * @description Trigger all actions
    *
    */
   private async _bundler(paths: Paths): Promise<void> {
      await this._package(paths);
      await this._install(paths);
      await this._cleanup(paths);
      await this._wrapper(paths);
   }

   /**
    *
    * @description bundle -> main method
    *
    */
   public bundle(): void {
      this._files.map(async (file: string): Promise<void> => {
         this._bundler(new Paths(this._dir, file));
      });
   }
}
