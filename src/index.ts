import Web3 from "web3";
import { fromEvent } from 'rxjs';
import { ZooFrenzToken } from './ZooFrenzToken';

let web3: Web3;



if (window) {
    window.onload = async () => {
        window.console.log('Hello Web3 !!');

        initWeb3();
        await getAccounts();
        await getBalance();
        binButtons();

        ZooFrenzToken.init(web3);
        await ZooFrenzToken.listNFTs(web3.defaultAccount as string);
    }
}

const binButtons = (): void => {
    bindSetUnrevealURI();
    bindSetBaseURI();
    bindSetRarities();
    bindDevMintToken();
};

const bindSetUnrevealURI = (): void => {
    const btn = document.getElementById(
        'btn-set-unreveal-uri'
    ) as HTMLElement;

    fromEvent(btn, 'click').subscribe(x => {
        const inputUnrevealURI = document.getElementById('input-unreveal-uri') as HTMLInputElement;
        ZooFrenzToken.setUnrevealURI(inputUnrevealURI.value);
    });
};

const bindSetBaseURI = (): void => {
    const btn = document.getElementById(
        'btn-set-base-uri'
    ) as HTMLElement;

    fromEvent(btn, 'click').subscribe(x => {
        const inputBaseURI = document.getElementById('input-base-uri') as HTMLInputElement;
        ZooFrenzToken.setBaseURI(inputBaseURI.value);
    });
};


const bindSetRarities = (): void => {
    const btn = document.getElementById(
        'btn-set-rarities'
    ) as HTMLElement;

    fromEvent(btn, 'click').subscribe(x => {
        const inputTokenIds = document.getElementById('input-token-ids') as HTMLInputElement;
        const inputTokenRarities = document.getElementById('input-token-rarities') as HTMLInputElement;

        const ids = inputTokenIds.value.split(',').map(Number);
        const rarities = inputTokenRarities.value.split(',').map(Number);

        ZooFrenzToken.setRarities(ids, rarities);
    });
};

const bindDevMintToken = (): void => {
    const btn = document.getElementById(
        'btn-dev-mint-token'
    ) as HTMLElement;


    fromEvent(btn, 'click').subscribe(x => {
        const amountText = document.getElementById('mint-token-amount') as HTMLInputElement;
        const allowAmountText = document.getElementById('mint-token-allow-amount') as HTMLInputElement;
        const ticketText = document.getElementById('mint-token-ticket') as HTMLInputElement;
        const signatureText = document.getElementById('mint-token-signature') as HTMLInputElement;

        const amount = Number.parseInt(amountText.value);
        const allowAmount = Number.parseInt(allowAmountText.value);
        const ticket = ticketText.value;
        const signature = web3.utils.hexToBytes(signatureText.value);

        ZooFrenzToken.devMintZooFrenzToken(amount, allowAmount, ticket, signature);
    });
};


const initWeb3 = (): void => {
    try {
        if (web3) return;

        window.console.log("Web3.givenProvider:", Web3.givenProvider);

        web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    }
    catch (e) {
        window.console.warn(e);
    }
};

const getAccounts = () => {
    return new Promise<string[]>((resolve, reject) => {

        if (!web3) reject("web3 not init");

        web3.eth.getAccounts((err, accounts) => {
            if (err) {
                window.console.error(err);
                reject(err);
            }

            if (accounts.length > 0) {
                web3.defaultAccount = accounts[0];

                const accountAddressText = document.getElementById('account-address') as HTMLInputElement;
                accountAddressText.value = web3.defaultAccount;
            }

            window.console.log("accounts:", accounts);
            window.console.log("web3.defaultAccount:", web3.defaultAccount);

            resolve(accounts);
        });
    });
};

const getBalance = () => {
    return new Promise<string>((resolve, reject) => {
        web3.eth.getBalance(web3.defaultAccount as string)
            .then(x => {
                window.console.log(x);

                const accountBalanceText = document.getElementById('account-balance') as HTMLInputElement;

                accountBalanceText.value = `${x.substring(0, 4)}.${x.substring(4)}`;

                resolve(x);
            })
            .catch(err => {
                reject(err);
            });
    });
};


