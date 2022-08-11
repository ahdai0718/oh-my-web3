import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { ZoofrenzFirstClassPass as ZoofrenzFirstClassPassABI } from "./abi/ZoofrenzFirstClassPass";

const contractZoofrenzFirstClassPass =
  "0x6E334adF384D29bc1464dcf7ccCD382dA3d834bb";

class ZoofrenzFirstClassPass {
  private web3!: Web3;
  private contract!: Contract;

  public constructor() {}

  public init(web3: Web3): void {
    this.web3 = web3;
  }

  private contractZoofrenzFirstClassPass() {
    if (!this.contract) {
      this.contract = new this.web3.eth.Contract(
        ZoofrenzFirstClassPassABI.abi as any,
        contractZoofrenzFirstClassPass
      );
    }
    return this.contract;
  }

  private defaultAccount() {
    return this.web3.defaultAccount;
  }

  public setUnrevealURI(uri: string): void {
    const contract = this.contractZoofrenzFirstClassPass();

    contract.methods
      .setUnrevealURI(uri)
      .call()
      .then((x: any) => {
        window.console.log("setUnrevealURI:", x);
        contract.methods
          .setUnrevealURI(uri)
          .send({ from: this.defaultAccount() })
          .then((x: any) => {
            window.console.log("setUnrevealURI:", x);
          })
          .catch((err: any) => {
            window.console.error("setUnrevealURI:", err);
          });
      })
      .catch((err: any) => {
        window.console.error("setUnrevealURI:", err);
      });
  }

  public setBaseURI(uri: string): void {
    const contract = this.contractZoofrenzFirstClassPass();

    contract.methods
      .setBaseURI(uri)
      .call()
      .then((x: any) => {
        window.console.log("setBaseURI:", x);
        contract.methods
          .setBaseURI(uri)
          .send({ from: this.defaultAccount() })
          .then((x: any) => {
            window.console.log("setBaseURI:", x);
          })
          .catch((err: any) => {
            window.console.error("setBaseURI:", err);
          });
      })
      .catch((err: any) => {
        window.console.error("setBaseURI:", err);
      });
  }

  public setRarities(ids: number[], rarities: number[]): void {
    const contract = this.contractZoofrenzFirstClassPass();

    contract.methods
      .setRarities(ids, rarities)
      .call()
      .then((x: any) => {
        window.console.log("setRarities:", x);
        contract.methods
          .setRarities(ids, rarities)
          .send({ from: this.defaultAccount() })
          .then((x: any) => {
            window.console.log("setRarities:", x);
          })
          .catch((err: any) => {
            window.console.error("setRarities:", err);
          });
      })
      .catch((err: any) => {
        window.console.error("setRarities:", err);
      });
  }

  public devMintZoofrenzFirstClassPass(
    amount: number,
    allowAmount: number,
    ticket: string,
    signature: number[]
  ): void {
    const contract = this.contractZoofrenzFirstClassPass();

    window.console.log("contract:", contract);

    const d = new Date();
    const exipreTime = d.valueOf();

    window.console.log("amount:", amount);
    window.console.log("allowAmount:", allowAmount);
    window.console.log("ticket:", ticket);
    window.console.log("exipreTime:", exipreTime);
    window.console.log("signature:", signature);

    contract.methods
      .devMint(amount, ticket, this.defaultAccount())
      .send({ from: this.defaultAccount() })
      .then((x: any) => {
        window.console.log("devMint:", x);
      })
      .catch((err: any) => {
        window.console.error("devMint:", err);
      });
  }

  public mintZoofrenzFirstClassPass(
    amount: number,
    allowAmount: number,
    ticket: string,
    signature: number[]
  ) {
    const contract = this.contractZoofrenzFirstClassPass();

    window.console.log("contract:", contract);

    const d = new Date();
    const exipreTime = d.valueOf();

    window.console.log("amount:", amount);
    window.console.log("allowAmount:", allowAmount);
    window.console.log("ticket:", ticket);
    window.console.log("exipreTime:", exipreTime);
    window.console.log("signature:", signature);

    contract.methods
      .mint(amount, allowAmount, ticket, exipreTime, signature)
      .send({ from: this.defaultAccount() })
      .then((x: any) => {
        window.console.log(x);
      })
      .catch((err: any) => {
        window.console.error(err);
      });
  }

  // tokenOfOwnerByIndex
  public async listNFTs(address: string): Promise<string[]> {
    const contract = this.contractZoofrenzFirstClassPass();

    const balance = await this.balanceOf(this.defaultAccount() as string);

    window.console.log("balance:", balance);

    const promises: Promise<string>[] = [];

    for (let index = 0; index < Number.parseInt(balance); index++) {
      contract.methods
        .tokenOfOwnerByIndex(address, index)
        .call()
        .then((x: any) => {
          window.console.log("tokenOfOwnerByIndex:", x);

          promises.push(contract.methods.tokenURI(x).call());

          // contract.methods.tokenURI(x).call()
          //     .then((uri: any) => {
          //         window.console.log("tokenURI:", uri);

          //         const headers: HeadersInit = new Headers();

          //         fetch(uri, {
          //             method: "get",
          //             mode: "no-cors",
          //             headers
          //         })
          //             .then(response => {
          //                 window.console.log("response:", response);

          //                 if (response.ok) {
          //                     response.json()
          //                 }
          //             })
          //             .catch(err => {
          //                 window.console.error("fetch token uri:", err);
          //             })
          //     })
          //     .catch((err: any) => {
          //         window.console.error("tokenURI:", err);
          //     });
        })
        .catch((err: any) => {
          window.console.error(err);
        });
    }

    window.console.log("promises:", promises);

    return Promise.all(promises);
  }

  public balanceOf(address: string) {
    return new Promise<string>((resolve, reject) => {
      const contract = this.contractZoofrenzFirstClassPass();
      contract.methods
        .balanceOf(address)
        .call()
        .then((x: any) => {
          window.console.log("balanceOf:", x);
          resolve(x);
        })
        .catch((err: any) => {
          window.console.error("balanceOf:", err);
          reject(err);
        });
    });
  }

  public ownerOf(index: number) {
    return new Promise<string>((resolve, reject) => {
      const contract = this.contractZoofrenzFirstClassPass();
      contract.methods
        .ownerOf(index)
        .call()
        .then((x: any) => {
          window.console.log("ownerOf:", x);
          resolve(x);
        })
        .catch((err: any) => {
          window.console.error("ownerOf:", err);
          reject(err);
        });
    });
  }

  private async batchOwnerOf(
    start: number,
    end: number
  ): Promise<Map<number, string>> {
    console.log("batchOwnerOf:", start, end);

    const ownerMapByTokenId: Map<number, string> = new Map();

    const promises: Promise<string>[] = [];

    for (let index = start; index <= end; index++) {
      promises.push(
        new Promise((resolve, reject) => {
          this.ownerOf(index)
            .then((owner) => {
              ownerMapByTokenId.set(index, owner);
              resolve(`${index},${owner}`);
            })
            .catch((e) => {
              ownerMapByTokenId.set(index, "error");
              resolve(`${index},error`);
            });
        })
      );
    }

    await Promise.all(promises);

    return new Promise((resolve) => {
      resolve(ownerMapByTokenId);
    });
  }

  public async listOwners(start: number, end: number, batchSize: number = 1) {
    // const end = 6666 * 2;
    const ownerMapByTokenId: Map<number, string> = new Map();

    for (let index = start; index <= end; index += batchSize) {
      const batchOwnerMapByTokenId = await this.batchOwnerOf(
        index,
        index + batchSize
      );
      batchOwnerMapByTokenId.forEach((owner, index) => {
        ownerMapByTokenId.set(index, owner);
      });
    }

    return ownerMapByTokenId;
  }
}

const zoofrenzFirstClassPass = new ZoofrenzFirstClassPass();

export { zoofrenzFirstClassPass as ZoofrenzFirstClassPass };
