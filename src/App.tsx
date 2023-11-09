import { useEffect, useState } from "react";
import hausLogo from "./assets/icon-512x512.png";
import "./App.css";

// import WebApp from "@twa-dev/sdk";
import { useDaoProposals } from "@daohaus/moloch-v3-hooks";
import { MolochV3Proposal } from "@daohaus/moloch-v3-data";
import { BeatLoader } from "react-spinners";

function App() {
  const [count, setCount] = useState(0);
  const [proposal, setProposal] = useState<MolochV3Proposal | undefined>();
  const { proposals, isLoading } = useDaoProposals({
    daoChain: "0xa",
    daoId: "0xf5d6b637a9185707f52d40d452956ca49018247a",
    paging: {
      pageSize: 1,
      offset: count,
    },
  });

  useEffect(() => {
    console.log("proposals", proposals);

    setProposal(proposals[0]);
  }, [proposals]);

  const displayProposal = () => {
    setCount((count) => count + 1);
    setProposal(proposals[0]);
  };

  return (
    <>
      <div>
        <a href="https://daohaus.club/" target="_blank">
          <img src={hausLogo} className="logo" alt="Haus logo" />
        </a>
      </div>
      <h1>PublicHAUS DAO</h1>
      <h6>Latest Proposal</h6>
      {isLoading && <BeatLoader color="#646cff" />}
      {proposal && (
        <div className="proposal">
          <a
            href={`https://admin.daohaus.club/#/molochV3/0xa/0xf5d6b637a9185707f52d40d452956ca49018247a/proposal/${proposal.proposalId}`}
            target="_blank"
          >
            <h3>{proposal.title}</h3>
            <p className="status">Status: {proposal.status}</p>
            <div className="votes">
              <p>{`Yes: ${(
                Number(proposal.yesBalance) /
                10 ** 18
              ).toFixed()}`}</p>
              <p>{`No: ${(
                Number(proposal.noBalance) /
                10 ** 18
              ).toFixed()}`}</p>
            </div>
          </a>
        </div>
      )}
      <div className="card">
        <button onClick={displayProposal}>Show me the next proposal</button>
      </div>
      {/* <div className="card">
        <button onClick={() => WebApp.showAlert(`I can open alerts!`)}>
          YO!
        </button>
      </div> */}
    </>
  );
}

export default App;
