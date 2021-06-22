/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bluzelle.curium.crud";

export interface Lease {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  years: number;
}

const baseLease: object = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0,
  years: 0,
};

export const Lease = {
  encode(message: Lease, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seconds !== 0) {
      writer.uint32(8).uint32(message.seconds);
    }
    if (message.minutes !== 0) {
      writer.uint32(16).uint32(message.minutes);
    }
    if (message.hours !== 0) {
      writer.uint32(24).uint32(message.hours);
    }
    if (message.days !== 0) {
      writer.uint32(32).uint32(message.days);
    }
    if (message.years !== 0) {
      writer.uint32(40).uint32(message.years);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Lease {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLease } as Lease;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seconds = reader.uint32();
          break;
        case 2:
          message.minutes = reader.uint32();
          break;
        case 3:
          message.hours = reader.uint32();
          break;
        case 4:
          message.days = reader.uint32();
          break;
        case 5:
          message.years = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Lease {
    const message = { ...baseLease } as Lease;
    if (object.seconds !== undefined && object.seconds !== null) {
      message.seconds = Number(object.seconds);
    } else {
      message.seconds = 0;
    }
    if (object.minutes !== undefined && object.minutes !== null) {
      message.minutes = Number(object.minutes);
    } else {
      message.minutes = 0;
    }
    if (object.hours !== undefined && object.hours !== null) {
      message.hours = Number(object.hours);
    } else {
      message.hours = 0;
    }
    if (object.days !== undefined && object.days !== null) {
      message.days = Number(object.days);
    } else {
      message.days = 0;
    }
    if (object.years !== undefined && object.years !== null) {
      message.years = Number(object.years);
    } else {
      message.years = 0;
    }
    return message;
  },

  toJSON(message: Lease): unknown {
    const obj: any = {};
    message.seconds !== undefined && (obj.seconds = message.seconds);
    message.minutes !== undefined && (obj.minutes = message.minutes);
    message.hours !== undefined && (obj.hours = message.hours);
    message.days !== undefined && (obj.days = message.days);
    message.years !== undefined && (obj.years = message.years);
    return obj;
  },

  fromPartial(object: DeepPartial<Lease>): Lease {
    const message = { ...baseLease } as Lease;
    if (object.seconds !== undefined && object.seconds !== null) {
      message.seconds = object.seconds;
    } else {
      message.seconds = 0;
    }
    if (object.minutes !== undefined && object.minutes !== null) {
      message.minutes = object.minutes;
    } else {
      message.minutes = 0;
    }
    if (object.hours !== undefined && object.hours !== null) {
      message.hours = object.hours;
    } else {
      message.hours = 0;
    }
    if (object.days !== undefined && object.days !== null) {
      message.days = object.days;
    } else {
      message.days = 0;
    }
    if (object.years !== undefined && object.years !== null) {
      message.years = object.years;
    } else {
      message.years = 0;
    }
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined
  | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
