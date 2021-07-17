/**
 *
 * @interface IPaths
 *
 */
interface IPaths {
   target(sf?: string): string;
   dist(sf?: string): string;
}

/**
 *
 * @class
 * @implements {IPaths}
 *
 */
export class Paths implements IPaths {
   public readonly file: string;
   private readonly targetPath: string;

   constructor(target: string, file: string) {
      this.file = file;
      this.targetPath = `${target}/${file}`;
   }

   /**
    *
    * @param selFile
    * @returns {string}
    * @description returns path to target(layser,triggers) file path
    *
    */
   public target(selFile?: string): string {
      if (selFile) {
         return `./${this.targetPath}/${selFile}`;
      }
      return this.targetPath;
   }

   /**
    *
    * @param selFile
    * @returns {string}
    * @description returns path to destination(dist) file path
    *
    */
   public dist(selFile?: string): string {
      const distPath = `./dist/${this.targetPath}`;
      if (selFile) {
         return `${distPath}/${selFile}`;
      }
      return distPath;
   }

   /**
    *
    * @param selFile
    * @returns {string}
    * @description returns path to destination(dist) with tempfile lable
    *
    */
   public tempDist(selFile?: string): string {
      const distPath = this.dist() + '-TempFile';

      if (selFile) {
         return `${distPath}/${selFile}`;
      }

      return distPath;
   }
}
