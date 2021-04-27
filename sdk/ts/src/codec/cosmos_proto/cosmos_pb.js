// source: cosmos_proto/cosmos.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_descriptor_pb = require('google-protobuf/google/protobuf/descriptor_pb.js');
goog.object.extend(proto, google_protobuf_descriptor_pb);
goog.exportSymbol('proto.cosmos_proto.acceptsInterface', null, global);
goog.exportSymbol('proto.cosmos_proto.implementsInterface', null, global);
goog.exportSymbol('proto.cosmos_proto.interfaceType', null, global);

/**
 * A tuple of {field number, class constructor} for the extension
 * field named `interfaceType`.
 * @type {!jspb.ExtensionFieldInfo<string>}
 */
proto.cosmos_proto.interfaceType = new jspb.ExtensionFieldInfo(
    93001,
    {interfaceType: 0},
    null,
     /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
         null),
    0);

google_protobuf_descriptor_pb.MessageOptions.extensionsBinary[93001] = new jspb.ExtensionFieldBinaryInfo(
    proto.cosmos_proto.interfaceType,
    jspb.BinaryReader.prototype.readString,
    jspb.BinaryWriter.prototype.writeString,
    undefined,
    undefined,
    false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
google_protobuf_descriptor_pb.MessageOptions.extensions[93001] = proto.cosmos_proto.interfaceType;


/**
 * A tuple of {field number, class constructor} for the extension
 * field named `implementsInterface`.
 * @type {!jspb.ExtensionFieldInfo<string>}
 */
proto.cosmos_proto.implementsInterface = new jspb.ExtensionFieldInfo(
    93002,
    {implementsInterface: 0},
    null,
     /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
         null),
    0);

google_protobuf_descriptor_pb.MessageOptions.extensionsBinary[93002] = new jspb.ExtensionFieldBinaryInfo(
    proto.cosmos_proto.implementsInterface,
    jspb.BinaryReader.prototype.readString,
    jspb.BinaryWriter.prototype.writeString,
    undefined,
    undefined,
    false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
google_protobuf_descriptor_pb.MessageOptions.extensions[93002] = proto.cosmos_proto.implementsInterface;


/**
 * A tuple of {field number, class constructor} for the extension
 * field named `acceptsInterface`.
 * @type {!jspb.ExtensionFieldInfo<string>}
 */
proto.cosmos_proto.acceptsInterface = new jspb.ExtensionFieldInfo(
    93001,
    {acceptsInterface: 0},
    null,
     /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
         null),
    0);

google_protobuf_descriptor_pb.FieldOptions.extensionsBinary[93001] = new jspb.ExtensionFieldBinaryInfo(
    proto.cosmos_proto.acceptsInterface,
    jspb.BinaryReader.prototype.readString,
    jspb.BinaryWriter.prototype.writeString,
    undefined,
    undefined,
    false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
google_protobuf_descriptor_pb.FieldOptions.extensions[93001] = proto.cosmos_proto.acceptsInterface;

goog.object.extend(exports, proto.cosmos_proto);
