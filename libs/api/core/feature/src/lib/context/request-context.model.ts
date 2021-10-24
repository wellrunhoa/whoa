import { AsyncLocalStorage } from "async_hooks";
import { Request, Response } from "express";

export class RequestContext {
  static cls = new AsyncLocalStorage<RequestContext>();

  static get currentContext() {
    return this.cls.getStore();
  }

  readonly requestId: number;

  constructor(public readonly req: Request, public readonly res: Response) {
    this.requestId = Date.now();
  }
}