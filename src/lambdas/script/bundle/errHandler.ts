export class ErrorHandler {
   public static emptyTarget(): Error {
      return new Error('Target path is not specified');
   }

   public static filesFormat(): Error {
      return new Error('Files must be array of paths/strings');
   }
}
