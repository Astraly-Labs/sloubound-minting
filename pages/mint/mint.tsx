import { useStarknetReact } from "@web3-starknet-react/core";
import { useAccount, useBalance, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import Chevron from "src/assets/icons/Chevron.svg?inline";
import { encodeCallArgs } from "./proof_generation";
import { useSpring, animated } from "react-spring";
import StarknetLogo from "../../src/assets/images/Starknet-logo-white.svg?inline";
import { motion } from "framer-motion";
import HomeView from "./homeView";
import styles from "./mint.module.scss";
import FaqBlock from "../../src/components/Block/FaqBlock/FaqBlock";
export default function Mint() {
  const { account: starknetAccount } = useStarknetReact();
  const { address: ethereumAddress, isConnected } = useAccount();
  const connector = new InjectedConnector();
  const { connectAsync } = useConnect({
    connector,
  });
  function Number({ n }: any) {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: { mass: 1, tension: 20, friction: 10 },
    });
    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
  }
  async function mintBadge() {
    try {
      if (!isConnected) await connectAsync();
      const ethProvider = await connector.getProvider();

      const signer = await connector.getSigner();
      //   const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI
      const tokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"; // LINK
      const blockNumber = 7826160;
      //   const storageSlot = await ERC20Proof.findMapSlot(
      //     tokenAddress,
      //     ethereumAddress as string,
      //     provider
      //   );
      const storageSlot = 1;
      const userBalance = "0x1";
      await encodeCallArgs(
        ethProvider,
        signer,
        ethereumAddress,
        starknetAccount?.address as string,
        tokenAddress,
        blockNumber,
        storageSlot,
        userBalance
      );
    } catch (error) {
      console.error(error);
    }
  }

  const Requirements = ["$SHESH token", "Minimum balance", "Snapshot date"];

  return (
    <div className={styles.container}>
      <div className={styles.section} style={{ backgroundColor: "gray" }}>
        <div className="flex font-Heading text-center text-[60px] text-primary ">
          Claim your Badge
        </div>
      </div>
      <div className={styles.section} style={{ backgroundColor: "purple" }}>
        <div className=" flex flex-wrap flex-row justify-start items-centerpt-8 pl-[100px] gap-x-[100px] z-100">
          <img
            src="https://astraly-bucket.fra1.digitaloceanspaces.com/cover.png"
            className="w-[500px] h-[500px] rounded-[50px] z-10"
          ></img>
          <div className="verticalSeparator h-[500px] border-6 border-gray border hidden lg:flex  "></div>
          <div className="flex-col flex gap-6">
            <div className="h-full justify-center items-start font-Heading  text-center text-[60px] text-primary pb-8">
              Required conditions
            </div>
            <div className="flex flex-row items-center text-[25px] gap-x-[25px] pt-[50px]">
              <StarknetLogo className="h-full" />
              <div className="text-primaryDark text-[35px]">
                {Requirements[0]}
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-[25px]">
              <StarknetLogo />
              <div className="text-primaryDark text-[35px]">
                {Requirements[1]}
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-[25px]">
              <StarknetLogo />
              <div className="text-primaryDark text-[35px]">
                {Requirements[2]}
              </div>
            </div>
            <div className="pt-8 justify-center items-center self-center ">
              <HomeView />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section} style={{ backgroundColor: "yellow" }}>
        <div className=" flex flex-col items-center justify-center ">
          <div className=" font-Black ui-t-primary text-[150px] font-black  justify-end text-end leading-none ">
            <Number n={100} />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className=" font-Black ui-t-dark text-[90px] font-black justify-center text-center leading-none"
          >
            Badges issued
          </motion.h1>
        </div>
      </div>
      <div className={styles.section} style={{ backgroundColor: "#1234" }}>
        <FaqBlock />
      </div>
    </div>
  );
}
