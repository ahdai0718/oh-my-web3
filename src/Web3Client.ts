import Web3 from "web3";

class Web3Client {
  public web3!: Web3;

  constructor() {}

  public init(): void {
    this.initWeb3();
  }

  private initWeb3(): void {
    if (!this.web3) {
      this.web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    }
  }

  public defaultAccount() {
    return this.web3.defaultAccount;
  }

  public getAccounts() {
    return new Promise<string[]>((resolve, reject) => {
      if (!this.web3) reject("web3 not init");

      this.web3.eth.getAccounts((err, accounts) => {
        if (err) {
          window.console.error(err);
          reject(err);
        }

        if (accounts.length > 0) {
          this.web3.defaultAccount = accounts[0];

          const accountAddressText = document.getElementById(
            "account-address"
          ) as HTMLInputElement;
          accountAddressText.value = this.web3.defaultAccount;
        }

        window.console.log("accounts:", accounts);
        window.console.log("web3.defaultAccount:", this.web3.defaultAccount);

        resolve(accounts);
      });
    });
  }

  public getBalance() {
    return new Promise<string>((resolve, reject) => {
      this.web3.eth
        .getBalance(this.web3.defaultAccount as string)
        .then((x) => {
          window.console.log(x);

          const accountBalanceText = document.getElementById(
            "account-balance"
          ) as HTMLInputElement;

          if (x.length <= 19) {
            x = "000000000000000000000000000" + x;
            x = x.substring(x.length - 19);
          }

          accountBalanceText.value = `${x.substring(
            0,
            x.length - 18
          )}.${x.substring(x.length - 18)}`;

          resolve(x);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const web3client = new Web3Client();

export { web3client as Web3Client };
