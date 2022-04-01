/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ZKConspiracyInterface extends ethers.utils.Interface {
  functions: {
    "FIELD_SIZE()": FunctionFragment;
    "ROOT_HISTORY_SIZE()": FunctionFragment;
    "ZERO_VALUE()": FunctionFragment;
    "currentRootIndex()": FunctionFragment;
    "filledSubtrees(uint256)": FunctionFragment;
    "getLastRoot()": FunctionFragment;
    "hashLeftRight(bytes32,bytes32)": FunctionFragment;
    "hasher()": FunctionFragment;
    "isKnownRoot(bytes32)": FunctionFragment;
    "levels()": FunctionFragment;
    "nextIndex()": FunctionFragment;
    "nullifierHashes(bytes32)": FunctionFragment;
    "register(bytes32)": FunctionFragment;
    "roots(uint256)": FunctionFragment;
    "verifier()": FunctionFragment;
    "zeros(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "FIELD_SIZE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ROOT_HISTORY_SIZE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ZERO_VALUE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "currentRootIndex",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "filledSubtrees",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getLastRoot",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "hashLeftRight",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "hasher", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isKnownRoot",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "levels", values?: undefined): string;
  encodeFunctionData(functionFragment: "nextIndex", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nullifierHashes",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "register", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "roots", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "verifier", values?: undefined): string;
  encodeFunctionData(functionFragment: "zeros", values: [BigNumberish]): string;

  decodeFunctionResult(functionFragment: "FIELD_SIZE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ROOT_HISTORY_SIZE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ZERO_VALUE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "currentRootIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "filledSubtrees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLastRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hashLeftRight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hasher", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isKnownRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "levels", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nextIndex", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nullifierHashes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "roots", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "verifier", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "zeros", data: BytesLike): Result;

  events: {
    "Register(bytes32,uint32,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Register"): EventFragment;
}

export type RegisterEvent = TypedEvent<
  [string, number, BigNumber] & {
    commitment: string;
    leafIndex: number;
    timestamp: BigNumber;
  }
>;

export class ZKConspiracy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ZKConspiracyInterface;

  functions: {
    FIELD_SIZE(overrides?: CallOverrides): Promise<[BigNumber]>;

    ROOT_HISTORY_SIZE(overrides?: CallOverrides): Promise<[number]>;

    ZERO_VALUE(overrides?: CallOverrides): Promise<[BigNumber]>;

    currentRootIndex(overrides?: CallOverrides): Promise<[number]>;

    filledSubtrees(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getLastRoot(overrides?: CallOverrides): Promise<[string]>;

    hashLeftRight(
      _left: BytesLike,
      _right: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    hasher(overrides?: CallOverrides): Promise<[string]>;

    isKnownRoot(
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    levels(overrides?: CallOverrides): Promise<[number]>;

    nextIndex(overrides?: CallOverrides): Promise<[number]>;

    nullifierHashes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    register(
      _commitment: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    roots(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    verifier(overrides?: CallOverrides): Promise<[string]>;

    zeros(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
  };

  FIELD_SIZE(overrides?: CallOverrides): Promise<BigNumber>;

  ROOT_HISTORY_SIZE(overrides?: CallOverrides): Promise<number>;

  ZERO_VALUE(overrides?: CallOverrides): Promise<BigNumber>;

  currentRootIndex(overrides?: CallOverrides): Promise<number>;

  filledSubtrees(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getLastRoot(overrides?: CallOverrides): Promise<string>;

  hashLeftRight(
    _left: BytesLike,
    _right: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  hasher(overrides?: CallOverrides): Promise<string>;

  isKnownRoot(_root: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  levels(overrides?: CallOverrides): Promise<number>;

  nextIndex(overrides?: CallOverrides): Promise<number>;

  nullifierHashes(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  register(
    _commitment: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  roots(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  verifier(overrides?: CallOverrides): Promise<string>;

  zeros(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    FIELD_SIZE(overrides?: CallOverrides): Promise<BigNumber>;

    ROOT_HISTORY_SIZE(overrides?: CallOverrides): Promise<number>;

    ZERO_VALUE(overrides?: CallOverrides): Promise<BigNumber>;

    currentRootIndex(overrides?: CallOverrides): Promise<number>;

    filledSubtrees(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getLastRoot(overrides?: CallOverrides): Promise<string>;

    hashLeftRight(
      _left: BytesLike,
      _right: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    hasher(overrides?: CallOverrides): Promise<string>;

    isKnownRoot(_root: BytesLike, overrides?: CallOverrides): Promise<boolean>;

    levels(overrides?: CallOverrides): Promise<number>;

    nextIndex(overrides?: CallOverrides): Promise<number>;

    nullifierHashes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    register(_commitment: BytesLike, overrides?: CallOverrides): Promise<void>;

    roots(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    verifier(overrides?: CallOverrides): Promise<string>;

    zeros(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "Register(bytes32,uint32,uint256)"(
      commitment?: BytesLike | null,
      leafIndex?: null,
      timestamp?: null
    ): TypedEventFilter<
      [string, number, BigNumber],
      { commitment: string; leafIndex: number; timestamp: BigNumber }
    >;

    Register(
      commitment?: BytesLike | null,
      leafIndex?: null,
      timestamp?: null
    ): TypedEventFilter<
      [string, number, BigNumber],
      { commitment: string; leafIndex: number; timestamp: BigNumber }
    >;
  };

  estimateGas: {
    FIELD_SIZE(overrides?: CallOverrides): Promise<BigNumber>;

    ROOT_HISTORY_SIZE(overrides?: CallOverrides): Promise<BigNumber>;

    ZERO_VALUE(overrides?: CallOverrides): Promise<BigNumber>;

    currentRootIndex(overrides?: CallOverrides): Promise<BigNumber>;

    filledSubtrees(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLastRoot(overrides?: CallOverrides): Promise<BigNumber>;

    hashLeftRight(
      _left: BytesLike,
      _right: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasher(overrides?: CallOverrides): Promise<BigNumber>;

    isKnownRoot(
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    levels(overrides?: CallOverrides): Promise<BigNumber>;

    nextIndex(overrides?: CallOverrides): Promise<BigNumber>;

    nullifierHashes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    register(
      _commitment: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    roots(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    verifier(overrides?: CallOverrides): Promise<BigNumber>;

    zeros(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    FIELD_SIZE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ROOT_HISTORY_SIZE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ZERO_VALUE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    currentRootIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    filledSubtrees(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLastRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hashLeftRight(
      _left: BytesLike,
      _right: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasher(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isKnownRoot(
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    levels(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nextIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nullifierHashes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    register(
      _commitment: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    roots(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    verifier(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    zeros(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
