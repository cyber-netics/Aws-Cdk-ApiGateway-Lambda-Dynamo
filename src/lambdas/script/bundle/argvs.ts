export class ArgvOpts {
   public readonly wrap: boolean;
   public readonly target: string;
   private readonly _argv: string[];

   constructor(argv: string[]) {
      this._argv = argv;

      this.wrap = Boolean(!this._getOption('--wrap'));
      this.target = String(this._getOption('--target'));
   }

   private _getOption(opt: string): string | boolean {
      const argIndex = this._argv.indexOf(opt);
      if (argIndex === -1) return true;
      return process.argv[argIndex + 1];
   }
}
