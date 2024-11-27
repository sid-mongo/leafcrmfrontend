"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { CrimeBeat } from "@/components/dashboard/crimebeat";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";

export default function Home() {

  // Mirror Cursor start
  const mongoCursorRef = useRef<HTMLDivElement>(null);
  const postgresCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (mongoCursorRef.current && postgresCursorRef.current) {
        const rect = mongoCursorRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        postgresCursorRef.current.style.transform = `translate(${x - 12}px, ${y - 14}px)`;
      }
    };

    if (mongoCursorRef.current) {
      mongoCursorRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (mongoCursorRef.current) {
        mongoCursorRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);
  // Mirror Cursor end

  // Global state
  const [currentPage, setCurrentPage] = useState("Accounts");
  const [accounts, setAccounts] = useState([{
    AccountId: "fgrigjeid",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "dfhbfdhb",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "ifsjidsj",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "ewubfudb",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "fgrigjeid",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "dfhbfdhb",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "ifsjidsj",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "ewubfudb",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "fgrigjeid",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "dfhbfdhb",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "ifsjidsj",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "ewubfudb",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "fgrigjeid",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "dfhbfdhb",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "ifsjidsj",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }, {
    AccountId: "ewubfudb",
    AccountName: "Test Account",
    AccountOwner: "Blah Blah",
    AccountType: "Customer",
    EstimatedARR: "$100,000"
  }]);
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentContact, setCurrentContact] = useState("");

  const [campaigns, setCampaigns] = useState([{
    CampaignId: "campaign1",
    CampaignName: "Campaign One",
    CampaignOwner: "Owner One",
    CampaignType: "Type One",
    EstimatedBudget: "$10,000",
    Status: "Active"
  }, {
    CampaignId: "campaign2",
    CampaignName: "Campaign Two",
    CampaignOwner: "Owner Two",
    CampaignType: "Type Two",
    EstimatedBudget: "$20,000",
    Status: "Paused"
  }]);

  const [currentCampaign, setCurrentCampaign] = useState("");
  const [currentInteraction, setCurrentInteraction] = useState("");
  const [currentOpportunity, setCurrentOpportunity] = useState("");

  return (
    <div style={{ display: "flex", height: "calc(100vh - 51px)" }}>
      {/* MongoDB */}
      <div ref={mongoCursorRef} style={{ flex: 1, padding: 10, borderRight: 2, borderColor: "#888", borderStyle: "solid", overflowY: "auto" }}>
        <div style={{ display: "flex", borderColor: "#003a51 !important", borderBottom: 1, borderStyle: "solid" }}>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <img style={{ height: 24, display: "inline", paddingLeft: 5 }} src="./assets/mongodb_logo.png" />
          </div>
          <Button
            style={{
              background: currentPage.startsWith("Account") ? "#0090c9" : "#003a51",
              color: currentPage.startsWith("Account") ? "black" : "white",
              fontWeight: currentPage.startsWith("Account") ? "bold" : "normal",
              borderRadius: "3px 3px 0px 0px",
              marginLeft: 3
            }}
            onClick={() => setCurrentPage("Accounts")}
          >
            Accounts
          </Button>
          <Button
            style={{
              background: currentPage === "Campaigns" ? "#0090c9" : "#003a51",
              color: currentPage === "Campaigns" ? "black" : "white",
              fontWeight: currentPage === "Campaigns" ? "bold" : "normal",
              borderRadius: "3px 3px 0px 0px",
              marginLeft: 3
            }}
            onClick={() => setCurrentPage("Campaigns")}
          >
            Campaigns
          </Button>
          <Button
            style={{
              background: currentPage === "Interactions" ? "#0090c9" : "#003a51",
              color: currentPage === "Interactions" ? "black" : "white",
              fontWeight: currentPage === "Interactions" ? "bold" : "normal",
              borderRadius: "3px 3px 0px 0px",
              marginLeft: 3
            }}
            onClick={() => setCurrentPage("Interactions")}
          >
            Interactions
          </Button>
          <Button
            style={{
              background: currentPage === "Opportunities" ? "#0090c9" : "#003a51",
              color: currentPage === "Opportunities" ? "black" : "white",
              fontWeight: currentPage === "Opportunities" ? "bold" : "normal",
              borderRadius: "3px 3px 0px 0px",
              marginLeft: 3
            }}
            onClick={() => setCurrentPage("Opportunities")}
          >
            Opportunities
          </Button>
        </div>
        <div style={{}}>
          {(() => {
            switch (currentPage) {
              case "Accounts":
                return <>
                  <Button
                    style={{ fontSize: 30, color: "black", borderRadius: 30, position: "sticky", top: "100%", left: "100%", background: "#00ED64", height: 50, width: 50 }}
                    onClick={() => {
                      setCurrentAccount("new");
                      setCurrentPage("AccountDetails");
                    }}
                  >
                    +
                  </Button>
                  <div style={{ overflowY: "auto", height: "calc(75vh - 127px)", marginBottom: 20, marginTop: -50 }}>
                    <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Account Id</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Account Name</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Account Owner</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Account Type</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Estimated ARR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accounts.map((account, index) => (
                          <tr
                            key={account.AccountId}
                            onClick={() => {
                              setCurrentAccount(account.AccountId);
                              setCurrentPage("AccountDetails");
                            }}
                            style={{
                              backgroundColor: index % 2 === 0 ? "#001821" : "#002636",
                              cursor: "pointer"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#004057")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#001821" : "#002636")}
                          >
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{account.AccountId}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{account.AccountName}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{account.AccountOwner}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{account.AccountType}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{account.EstimatedARR}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>;
              case "AccountDetails": {
                let account = accounts.find(acc => acc.AccountId === currentAccount);

                if (!account && currentAccount !== "new") {
                  return <div style={{ overflowY: "auto", height: "calc(75vh - 127px)", marginBottom: 20, marginTop: -50 }}>Account not found</div>;
                } else if (!account) {
                  account = {
                    AccountId: "new",
                    AccountName: "",
                    AccountOwner: "",
                    AccountType: "",
                    EstimatedARR: ""
                  };
                }

                const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = e.target;
                  if (currentAccount === "new") {
                    setAccounts(prevAccounts => {
                      const newAccount = { ...account, [name]: value, AccountId: "new" };
                      const existingNewAccountIndex = prevAccounts.findIndex(acc => acc.AccountId === "new");
                      if (existingNewAccountIndex !== -1) {
                        const updatedAccounts = [...prevAccounts];
                        updatedAccounts[existingNewAccountIndex] = newAccount;
                        return updatedAccounts;
                      } else {
                        return [...prevAccounts, newAccount];
                      }
                    });
                  } else {
                    setAccounts(prevAccounts =>
                      prevAccounts.map(acc =>
                        acc.AccountId === currentAccount ? { ...acc, [name]: value } : acc
                      )
                    );
                  }
                };

                const handleSave = () => {
                  setCurrentPage("Accounts");
                };

                return (
                  <div style={{ overflowY: "auto", height: "calc(75vh - 127px)", marginBottom: 20 }}>
                    <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Account Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Account Name:</td>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <input
                              type="text"
                              name="AccountName"
                              placeholder="Enter Account Name"
                              value={account.AccountName}
                              onChange={handleInputChange}
                              style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Account Owner:</td>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <input
                              type="text"
                              name="AccountOwner"
                              value={account.AccountOwner}
                              onChange={handleInputChange}
                              style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Account Type:</td>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <input
                              type="text"
                              name="AccountType"
                              value={account.AccountType}
                              onChange={handleInputChange}
                              style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Estimated ARR:</td>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <input
                              type="text"
                              name="EstimatedARR"
                              value={account.EstimatedARR}
                              onChange={handleInputChange}
                              style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <Button onClick={handleSave}>Save</Button>
                            <Button style={{ marginLeft: 10 }} onClick={() => {
                              // Merge logic here
                            }}>Merge</Button>
                          <Button style={{ marginLeft: 10 }} onClick={() => {
                            setAccounts(prevAccounts =>
                              prevAccounts.map(acc =>
                              acc.AccountId === currentAccount ? {
                                ...acc,
                                //AccountName: "Mock Account",
                                AccountOwner: "Mock Owner",
                                AccountType: "Mock Type",
                                EstimatedARR: "$999,999"
                              } : acc
                              )
                            );
                          }}>Fill Mock Data</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              }
              case "ContactDetails":
                return <div style={{ overflowY: "auto", height: "calc(75vh - 127px)", marginBottom: 20 }}>
                  ContactDetails content
                </div>;
              case "Campaigns":
                return <div>
                  <Button
                    style={{ fontSize: 30, color: "black", borderRadius: 30, position: "sticky", top: "100%", left: "100%", background: "#00ED64", height: 50, width: 50 }}
                    onClick={() => {
                      setCurrentCampaign("new");
                      setCurrentPage("CampaignDetails");
                    }}
                  >
                    +
                  </Button>
                  <div style={{ overflowY: "auto", height: "calc(75vh - 127px)", marginBottom: 20, marginTop: -50 }}>
                    <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Id</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Name</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Owner</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Type</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Estimated Budget</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaigns.map((campaign, index) => (
                          <tr
                            key={campaign.CampaignId}
                            onClick={() => {
                              setCurrentCampaign(campaign.CampaignId);
                              setCurrentPage("CampaignDetails");
                            }}
                            style={{
                              backgroundColor: index % 2 === 0 ? "#001821" : "#002636",
                              cursor: "pointer"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#004057")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#001821" : "#002636")}
                          >
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{campaign.CampaignId}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{campaign.CampaignName}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{campaign.CampaignOwner}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{campaign.CampaignType}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{campaign.EstimatedBudget}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <span style={{
                                display: "inline-block",
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                backgroundColor: campaign.Status === "Active" ? "green" :
                                  campaign.Status === "Paused" ? "orange" :
                                    campaign.Status === "Done" ? "blue" :
                                      campaign.Status === "Draft" ? "gray" : "transparent",
                                marginRight: 8
                              }}></span>
                              {campaign.Status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>;

              case "CampaignDetails": {
                let campaign = campaigns.find(camp => camp.CampaignId === currentCampaign);

                if (!campaign && currentCampaign !== "new") {
                  return <div style={{ overflowY: "auto", height: "calc(75vh - 127px)", marginBottom: 20, marginTop: -50 }}>Campaign not found</div>;
                } else if (!campaign) {
                  campaign = {
                    CampaignId: "new",
                    CampaignName: "",
                    CampaignOwner: "",
                    CampaignType: "",
                    EstimatedBudget: "",
                    Status: "Draft"
                  };
                }

                const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = e.target;
                  setCampaigns(prevCampaigns =>
                    prevCampaigns.map(camp =>
                      camp.CampaignId === currentCampaign ? { ...camp, [name]: value } : camp
                    )
                  );
                };

                const handleSave = () => {
                  setCurrentPage("Campaigns");
                };

                return (
                  <div style={{ overflowY: "auto", height: "calc(75vh - 127px)", marginBottom: 20 }}>
                    <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Name:</td>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <input
                              type="text"
                              name="CampaignName"
                              value={campaign.CampaignName}
                              onChange={handleInputChange}
                              style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Owner:</td>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <input
                              type="text"
                              name="CampaignOwner"
                              value={campaign.CampaignOwner}
                              onChange={handleInputChange}
                              style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Type:</td>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <input
                              type="text"
                              name="CampaignType"
                              value={campaign.CampaignType}
                              onChange={handleInputChange}
                              style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Estimated Budget:</td>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <input
                              type="text"
                              name="EstimatedBudget"
                              value={campaign.EstimatedBudget}
                              onChange={handleInputChange}
                              style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <Button onClick={handleSave}>Save</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              }

              case "Interactions":
                return <div style={{ overflowY: "auto", height: "calc(75vh - 127px)", marginBottom: 20 }}>
                  Interactions content
                </div>;
                /*
              case "Opportunities":
                return <div style={{ overflowY: "auto", height: "calc(75vh - 127px)", marginBottom: 20 }}>
                  Opportunities content
                </div>;
                */
              case "Opportunities":
                return <>
                  <Button
                    style={{ fontSize: 30, color: "black", borderRadius: 30, position: "sticky", top: "100%", left: "100%", background: "#00ED64", height: 50, width: 50 }}
                    onClick={() => {
                      setCurrentOpportunity("new");
                      setCurrentPage("OpportunityDetails");
                    }}
                  >
                    +
                  </Button>
                  <div style={{ overflowY: "auto", height: "calc(75vh - 127px)", marginBottom: 20, marginTop: -50 }}>
                    <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Opportunity Id</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Opportunity Name</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Opportunity Owner</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Opportunity Type</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Estimated Value</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </>;
              default:
                return null;
            }
          })()}
        </div>
        <div style={{ height: "25vh", background: "#00131c", display: "flex" }}>
          <div style={{ flex: 1, borderColor: "#666 !important", borderRight: 1, borderStyle: "solid" }}>query/queries</div>
          <div style={{ flex: 1 }}>performance and output</div>
        </div>
      </div>




      {/* PostgreSQL */}
      <div style={{ flex: 1, padding: 10, overflowY: "auto", position: "relative" }}>
      <div ref={postgresCursorRef} style={{ position: "absolute", width: 12, height: 20, backgroundImage: `url(${"./assets/mac-cursor.png"})`, backgroundSize: "contain", pointerEvents: "none", transform: "translate(-12px, -20px)" }} />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <img style={{ height: 24, display: "inline", paddingLeft: 5 }} src="./assets/postgre_logo.png" /><span><b>Postgre</b><b style={{ color: "#50b0f0" }}>SQL</b><b>&nbsp;&nbsp;&nbsp;&nbsp;▾</b></span>
          </div>
          <Button>Accounts</Button>
          <Button>Campaigns</Button>
          <Button>Interactions</Button>
          <Button>Opportunities</Button>
        </div>
        <div style={{ height: "calc(75vh - 107px)" }}>
          content area
        </div>
        <div style={{ height: "25vh", background: "#00131c", display: "flex" }}>
          <div style={{ flex: 1, borderColor: "#666 !important", borderRight: 1, borderStyle: "solid" }}>query/queries</div>
          <div style={{ flex: 1 }}>performance and output</div>
        </div>
      </div>
    </div>
  );
}
