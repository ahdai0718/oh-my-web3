import { fromEvent } from "rxjs";

import { Web3Client } from "./Web3Client";
import { ZooFrenzToken } from "./ZooFrenzToken";
import { AwakenedZoofrenz } from "./AwakenedZoofrenz";
import { ZoofrenzFirstClassPass } from "./ZoofrenzFirstClassPass";

if (window) {
  window.onload = async () => {
    window.console.log("Hello Web3 !!");

    Web3Client.init();
    await Web3Client.getAccounts();
    // await Web3Client.getBalance();

    binButtons();

    // ZooFrenzToken.init(Web3Client.web3);
    // const nfts = await ZooFrenzToken.listNFTs(Web3Client.defaultAccount() as string);
    // window.console.log("nfts:", nfts)

    // AwakenedZoofrenz.init(Web3Client.web3);
    ZoofrenzFirstClassPass.init(Web3Client.web3);
  };
}

const binButtons = (): void => {
  bindSetUnrevealURI();
  bindSetBaseURI();
  bindSetRarities();
  bindDevMintToken();
  bindListAwakenOwners();
  bindListZVIPOwners();
};

const bindSetUnrevealURI = (): void => {
  const btn = document.getElementById("btn-set-unreveal-uri") as HTMLElement;

  fromEvent(btn, "click").subscribe((x) => {
    const inputUnrevealURI = document.getElementById(
      "input-unreveal-uri"
    ) as HTMLInputElement;
    ZooFrenzToken.setUnrevealURI(inputUnrevealURI.value);
  });
};

const bindSetBaseURI = (): void => {
  const btn = document.getElementById("btn-set-base-uri") as HTMLElement;

  fromEvent(btn, "click").subscribe((x) => {
    const inputBaseURI = document.getElementById(
      "input-base-uri"
    ) as HTMLInputElement;
    ZooFrenzToken.setBaseURI(inputBaseURI.value);
  });
};

const bindSetRarities = (): void => {
  const btn = document.getElementById("btn-set-rarities") as HTMLElement;

  fromEvent(btn, "click").subscribe((x) => {
    const inputTokenIds = document.getElementById(
      "input-token-ids"
    ) as HTMLInputElement;
    const inputTokenRarities = document.getElementById(
      "input-token-rarities"
    ) as HTMLInputElement;

    const ids = inputTokenIds.value.split(",").map(Number);
    const rarities = inputTokenRarities.value.split(",").map(Number);

    ZooFrenzToken.setRarities(ids, rarities);
  });
};

const bindDevMintToken = (): void => {
  const btn = document.getElementById("btn-dev-mint-token") as HTMLElement;

  fromEvent(btn, "click").subscribe((x) => {
    const amountText = document.getElementById(
      "mint-token-amount"
    ) as HTMLInputElement;
    const allowAmountText = document.getElementById(
      "mint-token-allow-amount"
    ) as HTMLInputElement;
    const ticketText = document.getElementById(
      "mint-token-ticket"
    ) as HTMLInputElement;
    const signatureText = document.getElementById(
      "mint-token-signature"
    ) as HTMLInputElement;

    const amount = Number.parseInt(amountText.value);
    const allowAmount = Number.parseInt(allowAmountText.value);
    const ticket = ticketText.value;
    const signature = Web3Client.web3.utils.hexToBytes(signatureText.value);

    ZooFrenzToken.devMintZooFrenzToken(amount, allowAmount, ticket, signature);
  });
};

const bindListAwakenOwners = (): void => {
  const btn = document.getElementById("btn-list-awaken-owners") as HTMLElement;

  let inProcess = false;

  fromEvent(btn, "click").subscribe(async (x) => {
    if (inProcess) return;

    inProcess = true;

    const textareaListAwakenOwners = document.getElementById(
      "textarea-list-awaken-owners"
    ) as HTMLInputElement;

    const ownerMapByTokenId = await AwakenedZoofrenz.listOwners(
      6666,
      6666 * 2,
      100
    );

    let text = "";

    ownerMapByTokenId.forEach((owner, index) => {
      text += `${index},${owner}\r\n`;
    });

    textareaListAwakenOwners.value = text;

    inProcess = false;
  });
};

// btn-list-zvip-owners
const bindListZVIPOwners = (): void => {
  const btn = document.getElementById("btn-list-zvip-owners") as HTMLElement;

  let inProcess = false;

  fromEvent(btn, "click").subscribe(async (x) => {
    if (inProcess) return;

    inProcess = true;

    const textareaListZVIPOwners = document.getElementById(
      "textarea-list-zvip-owners"
    ) as HTMLInputElement;

    const ownerMapByTokenId = await ZoofrenzFirstClassPass.listOwners(
      0,
      666,
      100
    );

    let text = "";

    // const countMapByOwner: Map<string, number> = new Map();

    ownerMapByTokenId.forEach((owner, index) => {
      text += `${index},${owner}\r\n`;
    });

    textareaListZVIPOwners.value = text;

    inProcess = false;
  });
};
