/* eslint-disable @typescript-eslint/no-explicit-any */
//https://github.com/typestack/class-validator/issues/169#issuecomment-899058764

import {
  ValidationArguments,
  IsNotEmpty as _IsNotEmpty,
  MaxLength as _MaxLength,
  MinLength as _MinLength,
  Min as _Min,
  Max as _Max,
  IsOptional as _IsOptional,
  IsIn as _IsIn,
  IsDate as _IsDate,
  IsBoolean as _IsBoolean,
  IsString as _IsString,
  IsNumber as _IsNumber,
  IsInt as _IsInt,
  IsObject as _IsObject,
  IsPositive as _IsPositive,
  IsNegative as _IsNegative,
  IsEmail as _IsEmail,
  IsArray as _IsArray,
  IsEnum as _IsEnum,
  MaxDate as _MaxDate,
  Length as _Length,
  IsNotEmptyObject as _IsNotEmptyObject,
  IsInstance as _IsInstance,
  Contains as _Contains,
  IsPhoneNumber as _IsPhoneNumber,
  NotContains as _NotContains,
  IsPostalCode as _IsPostalCode,
  IsAlpha as _IsAlpha,
  Validate as _Validate,
  ValidationOptions
} from 'class-validator';
import ValidatorJS from 'validator';
import { CountryCode } from 'libphonenumber-js';
import { FieldError } from './field-error.model';

export const IsOptional = _IsOptional;

export const Validate = _Validate;

function toJson(key: string, args: ValidationArguments, data?: unknown): string {
  return JSON.stringify(new FieldError({ key, field: args.property, data }));
}

export function intlMsg(key: string, data?: unknown) {
  return (args: ValidationArguments) => toJson(key, args, data);
}

export const Min = (min: number, opts?: ValidationOptions): PropertyDecorator =>
  _Min(min, { ...opts, message: intlMsg('validation.min', { min }) });
export const Max = (max: number, opts?: ValidationOptions): PropertyDecorator =>
  _Max(max, { ...opts, message: intlMsg('validation.max', { max }) });

export const IsNotEmpty = (opts?: ValidationOptions): PropertyDecorator =>
  _IsNotEmpty({ ...opts, message: intlMsg('validation.isNotEmpty') });

export const IsDate = (opts?: ValidationOptions): PropertyDecorator =>
  _IsDate({ ...opts, message: intlMsg('validation.isDate') });

export const IsIn = (values: readonly any[], opts?: ValidationOptions): PropertyDecorator =>
  _IsIn(values, { ...opts, message: intlMsg('validation.isIn', { values }) });

export const IsEmail = (
  eOpts?: ValidatorJS.IsEmailOptions,
  opts?: ValidationOptions
): PropertyDecorator => _IsEmail(eOpts, { ...opts, message: intlMsg('validation.isEmail') });

export const Length = (min: number, max: number, opts?: ValidationOptions): PropertyDecorator =>
  _Length(min, max, { ...opts, message: intlMsg('validation.length', { min, max }) });

export const MinLength = (min: number, opts?: ValidationOptions): PropertyDecorator =>
  _MinLength(min, { ...opts, message: intlMsg('validation.minLength', { min }) });

export const MaxLength = (max: number, opts?: ValidationOptions): PropertyDecorator =>
  _MaxLength(max, { ...opts, message: intlMsg('validation.maxLength', { max }) });

export const IsBoolean = (opts?: ValidationOptions): PropertyDecorator =>
  _IsBoolean({ ...opts, message: intlMsg('validation.isBoolean') });

export const MaxDate = (date: Date, opts?: ValidationOptions): PropertyDecorator =>
  _MaxDate(date, { ...opts, message: intlMsg('validation.maxDate', { date }) });

export const IsPastDate = (opts?: ValidationOptions): PropertyDecorator =>
  _MaxDate(new Date(), { ...opts, message: intlMsg('validation.isPastDate') });

export const IsPositive = (opts?: ValidationOptions): PropertyDecorator =>
  _IsPositive({ ...opts, message: intlMsg('validation.isPositive') });

export const IsNegative = (opts?: ValidationOptions): PropertyDecorator =>
  _IsNegative({ ...opts, message: intlMsg('validation.isNegative') });

export const IsString = (opts?: ValidationOptions): PropertyDecorator =>
  _IsString({ ...opts, message: intlMsg('validation.isString') });

export const IsNumber = (value: unknown, opts?: ValidationOptions): PropertyDecorator =>
  _IsNumber(value, { ...opts, message: intlMsg('validation.isNumber') });

export const IsInt = (opts?: ValidationOptions): PropertyDecorator =>
  _IsInt({ ...opts, message: intlMsg('validation.isInt') });

export const IsObject = (opts?: ValidationOptions): PropertyDecorator =>
  _IsObject({ ...opts, message: intlMsg('validation.isObject') });

export const IsArray = (opts?: ValidationOptions): PropertyDecorator =>
  _IsArray({ ...opts, message: intlMsg('validation.isArray') });

// eslint-disable-next-line @typescript-eslint/ban-types
export const IsEnum = (entity: object, opts?: ValidationOptions): PropertyDecorator =>
  _IsEnum(entity, { ...opts, message: intlMsg('validation.isEnum') });

export const IsNotEmptyObject = (
  options?: { nullable?: boolean },
  opts?: ValidationOptions
): PropertyDecorator =>
  _IsNotEmptyObject(options, { ...opts, message: intlMsg('validation.isNotEmptyObject') });

export const IsInstance = (
  targetType: new (...args: any[]) => any,
  opts?: ValidationOptions
): PropertyDecorator =>
  _IsInstance(targetType, { ...opts, message: intlMsg('validation.isInstance') });

export const Contains = (seed: string, opts?: ValidationOptions): PropertyDecorator =>
  _Contains(seed, { ...opts, message: intlMsg('validation.contains') });

export const IsAlpha = (locale?: string, opts?: ValidationOptions): PropertyDecorator =>
  _IsAlpha(locale, { ...opts, message: intlMsg('validation.isAlpha') });

export const IsPhoneNumber = (region?: CountryCode, opts?: ValidationOptions): PropertyDecorator =>
  _IsPhoneNumber(region, { ...opts, message: intlMsg('validation.isPhoneNumber') });

export const NotContains = (seed: string, opts?: ValidationOptions): PropertyDecorator =>
  _NotContains(seed, { ...opts, message: intlMsg('validation.notContains') });

export const IsPostalCode = (
  locale?: 'any' | ValidatorJS.PostalCodeLocale,
  opts?: ValidationOptions
): PropertyDecorator =>
  _IsPostalCode(locale, { ...opts, message: intlMsg('validation.isPostalCode') });
