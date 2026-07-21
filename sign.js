const { Wallet } = require("ethers");

// استبدل هذا بالمفتاح الخاص بمحفظتك (Private Key) - لا تشاركه مع أحد مطلق
const PRIVATE_KEY = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";


const wallet = new Wallet(PRIVATE_KEY);

async function signFarcasterENS() {
    // تعريف نطاق EIP-712 (Domain)
    const domain = {
        name: "Farcaster",
        version: "1",
        chainId: 1, // شبكة Ethereum Mainnet
        verifyingContract: "0x00000000fc5110de311d17466426d829428d5a32" // عقد Farcaster IdRegistry كمثال
    };

    // تعريف أنواع البيانات (Types)
    const types = {
        UserNameClaim: [
            { name: "username", type: "string" },
            { name: "timestamp", type: "uint256" }
        ]
    };

    // البيانات المراد توقيعها (Message)
    const message = {
        username: "yourname.eth", // اسم الـ ENS الخاص بك
        timestamp: 1693872000 // تحويل التاريخ 2023-09-05 إلى Unix Timestamp
    };

    const signature = await wallet.signTypedData(domain, types, message);
    console.log("✅ EIP-712 Signature:", signature);
}

signFarcasterENS();
