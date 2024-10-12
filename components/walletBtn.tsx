import { Button } from "@/components/ui/button"
import { client } from "@/lib/client"
import { Wallet2 } from "lucide-react"
import { ConnectButton, lightTheme } from "thirdweb/react"

export default function WalletBtn() {
    return (
        <div>
            <ConnectButton client={client} theme={lightTheme()} connectButton={{label:"Connect Wallet"}} />
        </div>
    )
}