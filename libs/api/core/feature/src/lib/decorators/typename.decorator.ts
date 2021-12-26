/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';

export const nameKey = Symbol('name');

/**
 * To perserve class name though mangling.
 * @example
 * @name('Customer')
 * class Customer {}
 * @param className
 */
export function name(className: string): ClassDecorator {
  return (Reflect as any).metadata(nameKey, className);
}

/**
 * @example
 * const type = Customer;
 * getName(type); // 'Customer'
 * @param type
 */
export function getName(type: any): string {
  return (Reflect as any).getMetadata(nameKey, type);
}

/**
 * @example
 * const instance = new Customer();
 * getInstanceName(instance); // 'Customer'
 * @param instance
 */
export function getInstanceName(instance: any): string {
  return (Reflect as any).getMetadata(nameKey, instance.constructor);
}
