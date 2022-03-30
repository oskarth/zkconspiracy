/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Verifier, VerifierInterface } from "../Verifier";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "a",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "b",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "c",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[6]",
        name: "input",
        type: "uint256[6]",
      },
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "r",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061150e806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063f398789b14610030575b600080fd5b61018f60048036036101c081101561004757600080fd5b8101908080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505091929192908060800190600280602002604051908101604052809291906000905b828210156100fc578382604002016002806020026040519081016040528092919082600260200280828437600081840152601f19601f820116905080830192505050505050815260200190600101906100a8565b50505050919291929080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505091929192908060c001906006806020026040519081016040528092919082600660200280828437600081840152601f19601f82011690508083019250505050505091929192905050506101a9565b604051808215151515815260200191505060405180910390f35b60006101b3611396565b6040518060400160405280876000600281106101cb57fe5b60200201518152602001876001600281106101e257fe5b60200201518152508160000181905250604051806040016040528060405180604001604052808860006002811061021557fe5b602002015160006002811061022657fe5b602002015181526020018860006002811061023d57fe5b602002015160016002811061024e57fe5b6020020151815250815260200160405180604001604052808860016002811061027357fe5b602002015160006002811061028457fe5b602002015181526020018860016002811061029b57fe5b60200201516001600281106102ac57fe5b602002015181525081525081602001819052506040518060400160405280856000600281106102d757fe5b60200201518152602001856001600281106102ee57fe5b602002015181525081604001819052506060600667ffffffffffffffff8111801561031857600080fd5b506040519080825280602002602001820160405280156103475781602001602082028036833780820191505090505b50905060008090505b600681101561038f5784816006811061036557fe5b602002015182828151811061037657fe5b6020026020010181815250508080600101915050610350565b50600061039c82846103bc565b14156103ad576001925050506103b4565b6000925050505b949350505050565b6000807f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f000000190506103ea6113c9565b6103f26105f0565b9050806080015151600186510114610472576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f76657269666965722d6261642d696e707574000000000000000000000000000081525060200191505060405180910390fd5b61047a611410565b6040518060400160405280600081526020016000815250905060008090505b865181101561057957838782815181106104af57fe5b60200260200101511061052a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f76657269666965722d6774652d736e61726b2d7363616c61722d6669656c640081525060200191505060405180910390fd5b61056a826105658560800151600185018151811061054457fe5b60200260200101518a858151811061055857fe5b6020026020010151610c19565b610d14565b91508080600101915050610499565b5061059c81836080015160008151811061058f57fe5b6020026020010151610d14565b90506105d26105ae8660000151610e2e565b8660200151846000015185602001518587604001518b604001518960600151610ec8565b6105e257600193505050506105ea565b600093505050505b92915050565b6105f86113c9565b60405180604001604052807f2b6d4650a4a9984dd255a254717ce985d4a2625229fa63ba1268f0c8f97af9eb81526020017f22f3991d50b793a3660fa6ad8ce156ac3eb478b77e8b0b74ffdf4be654c5610d8152508160000181905250604051806040016040528060405180604001604052807f0e27d2438600b41133385b48fc242556e81b44ab4d0ee9a3376da7315876c2ba81526020017f074f8374c9ddae90032fb99308af80e087027dac3ec8f203bd7ee80d8b54bb44815250815260200160405180604001604052807f218374fdb8b41d2b36cdf8b50c9a925631381f50fa6b9ad5d281a172ad21293181526020017f0b04b6269c1b07424f6a6985dfab0cefd704a35cae92e15048f533f4c5da412b8152508152508160200181905250604051806040016040528060405180604001604052807f198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c281526020017f1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed815250815260200160405180604001604052807f090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b81526020017f12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa8152508152508160400181905250604051806040016040528060405180604001604052807f2ecfc70875cc3e16e661354a0c7b8d2016d1f4093cb6b30ef164c5d10f91ebfd81526020017f052757557db49bfeda9f535bc3ef8e5a51fd2fbcb97bef2fd74abcd4d3f94dcd815250815260200160405180604001604052807f043f4bb541e209469fdd87ced06abb9a842aabeb5162cdb47368d5e188afe82c81526020017f02206ab59a572fd82aa7c2ce27818d40c1bf15e65907386f6946934487eaf0e68152508152508160600181905250600767ffffffffffffffff811180156108bc57600080fd5b506040519080825280602002602001820160405280156108f657816020015b6108e3611410565b8152602001906001900390816108db5790505b50816080018190525060405180604001604052807f05314810a70dfb45fc831fc2885fbc73bb02cdae37a64e39d5f60bf687ba98bd81526020017f14d2b8bd3327ea249c28d74d7c261626c65fa81e8fe0aa942a302a0b25210043815250816080015160008151811061096557fe5b602002602001018190525060405180604001604052807f09ab2db42d66ee32037d32054271bcfa26bf020bb1c18ffb19df4f7b12bd4f4181526020017f2ec841b3956f8fbead5cba0f43a5a051314945b64265570686650be1d849843881525081608001516001815181106109d657fe5b602002602001018190525060405180604001604052807f1472cef8729b0871425259d04bda1efcdf71d40ec20f25405e77645175f7034981526020017f0fa825e02cc6f542877666e7295729e881889e357fd36a16d370ba93c0d0dae18152508160800151600281518110610a4757fe5b602002602001018190525060405180604001604052807f126fe5335db5c610325577af1a39a98eaa4c7572d23696516a13899eb7bd875f81526020017f2b47aed3ddcd604738afff9432713978e5bea24c6f2e0b3182f82f0fc79f3b8c8152508160800151600381518110610ab857fe5b602002602001018190525060405180604001604052807f2fb1310e1d9066748b268d595060d88b0421c9cd0f35f5ffc5fbe28c7c5cb5b581526020017f2c489b635c22252bfa01333c42336a7c00eea248d9af71fe135d6344b3e15acf8152508160800151600481518110610b2957fe5b602002602001018190525060405180604001604052807f2744925b759aea9d0bdf393e24392b4a8cdcf0281b532d1c9a0a35b691afcd5181526020017f26a2b82ef6f988f28f32c1ee8fb6ae1027c06bebaad839fe03bc6975f3e3fe8b8152508160800151600581518110610b9a57fe5b602002602001018190525060405180604001604052807f2e547918039ff4a2d3f1943ca23ff265457467aebff640c56514b5c2b230caff81526020017f0c2a1017b955b985b10fb44f0729f290b723b51ce50e716394db4af0be7db7d38152508160800151600681518110610c0b57fe5b602002602001018190525090565b610c21611410565b610c2961142a565b836000015181600060038110610c3b57fe5b602002018181525050836020015181600160038110610c5657fe5b6020020181815250508281600260038110610c6d57fe5b602002018181525050600060608360808460076107d05a03fa90508060008114610c9657610c98565bfe5b5080610d0c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f70616972696e672d6d756c2d6661696c6564000000000000000000000000000081525060200191505060405180910390fd5b505092915050565b610d1c611410565b610d2461144c565b836000015181600060048110610d3657fe5b602002018181525050836020015181600160048110610d5157fe5b602002018181525050826000015181600260048110610d6c57fe5b602002018181525050826020015181600360048110610d8757fe5b602002018181525050600060608360c08460066107d05a03fa90508060008114610db057610db2565bfe5b5080610e26576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f70616972696e672d6164642d6661696c6564000000000000000000000000000081525060200191505060405180910390fd5b505092915050565b610e36611410565b60007f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47905060008360000151148015610e73575060008360200151145b15610e97576040518060400160405280600081526020016000815250915050610ec3565b60405180604001604052808460000151815260200182856020015181610eb957fe5b0683038152509150505b919050565b60006060600467ffffffffffffffff81118015610ee457600080fd5b50604051908082528060200260200182016040528015610f1e57816020015b610f0b611410565b815260200190600190039081610f035790505b5090506060600467ffffffffffffffff81118015610f3b57600080fd5b50604051908082528060200260200182016040528015610f7557816020015b610f6261146e565b815260200190600190039081610f5a5790505b5090508a82600081518110610f8657fe5b60200260200101819052508882600181518110610f9f57fe5b60200260200101819052508682600281518110610fb857fe5b60200260200101819052508482600381518110610fd157fe5b60200260200101819052508981600081518110610fea57fe5b6020026020010181905250878160018151811061100357fe5b6020026020010181905250858160028151811061101c57fe5b6020026020010181905250838160038151811061103557fe5b602002602001018190525061104a828261105a565b9250505098975050505050505050565b600081518351146110d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f70616972696e672d6c656e677468732d6661696c65640000000000000000000081525060200191505060405180910390fd5b600083519050600060068202905060608167ffffffffffffffff811180156110fa57600080fd5b506040519080825280602002602001820160405280156111295781602001602082028036833780820191505090505b50905060008090505b838110156112cf5786818151811061114657fe5b60200260200101516000015182600060068402018151811061116457fe5b60200260200101818152505086818151811061117c57fe5b60200260200101516020015182600160068402018151811061119a57fe5b6020026020010181815250508581815181106111b257fe5b6020026020010151600001516000600281106111ca57fe5b60200201518260026006840201815181106111e157fe5b6020026020010181815250508581815181106111f957fe5b60200260200101516000015160016002811061121157fe5b602002015182600360068402018151811061122857fe5b60200260200101818152505085818151811061124057fe5b60200260200101516020015160006002811061125857fe5b602002015182600460068402018151811061126f57fe5b60200260200101818152505085818151811061128757fe5b60200260200101516020015160016002811061129f57fe5b60200201518260056006840201815181106112b657fe5b6020026020010181815250508080600101915050611132565b506112d8611494565b6000602082602086026020860160086107d05a03fa905080600081146112fd576112ff565bfe5b5080611373576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f70616972696e672d6f70636f64652d6661696c6564000000000000000000000081525060200191505060405180910390fd5b60008260006001811061138257fe5b602002015114159550505050505092915050565b60405180606001604052806113a9611410565b81526020016113b661146e565b81526020016113c3611410565b81525090565b6040518060a001604052806113dc611410565b81526020016113e961146e565b81526020016113f661146e565b815260200161140361146e565b8152602001606081525090565b604051806040016040528060008152602001600081525090565b6040518060600160405280600390602082028036833780820191505090505090565b6040518060800160405280600490602082028036833780820191505090505090565b60405180604001604052806114816114b6565b815260200161148e6114b6565b81525090565b6040518060200160405280600190602082028036833780820191505090505090565b604051806040016040528060029060208202803683378082019150509050509056fea26469706673582212203cd88e3b9b824c3190d20fcad630a4fa4739730a0006b02d9d69bef100309b8864736f6c634300060b0033";

export class Verifier__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Verifier> {
    return super.deploy(overrides || {}) as Promise<Verifier>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Verifier {
    return super.attach(address) as Verifier;
  }
  connect(signer: Signer): Verifier__factory {
    return super.connect(signer) as Verifier__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VerifierInterface {
    return new utils.Interface(_abi) as VerifierInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Verifier {
    return new Contract(address, _abi, signerOrProvider) as Verifier;
  }
}
