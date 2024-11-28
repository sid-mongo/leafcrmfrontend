// @ts-nocheck
"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { CrimeBeat } from "@/components/dashboard/crimebeat";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
// test
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
  const newAccount = {
    _id: "new",
    name: "",
    industry: "",
    revenue: 0,
    spent: 0,
    address: {
      streetAddress: "",
      city: "",
      postalCode: "",
      country: ""
    },
    contacts: []
  };

  const [currentPage, setCurrentPage] = useState("Accounts");

  interface Account {
    _id: string;
    name: string;
    industry: string;
    revenue: number | { $numberDecimal: string };
    spent: number | { $numberDecimal: string };
    address: {
      streetAddress: string;
      city: string;
      postalCode: string;
      country: string;
    };
    contacts: Array<{
      name: string;
      designation: string;
      email: string;
    }>;
    opportunity?: {
      name: string;
      description: string;
      estimatedValue: number;
      owner: string;
      opportunityId: number;
      stage: string;
    };
  }

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentAccountObj, setCurrentAccountObj] = useState(newAccount);
  const newCampaign = {
    campaignId: "new",
    name: "",
    owner: "",
    type: "",
    estimatedBudget: "",
    status: "Draft"
  };

  const [currentCampaign, setCurrentCampaign] = useState("");
  const [currentCampaignObj, setCurrentCampaignObj] = useState(newCampaign);
  const [createWithOpp, setCreateWithOpp] = useState(false);
  const [performanceAndOutput, setPerformanceAndOutput] = useState("");
  const [errOut, setErrOut] = useState("");
  const [payload, setPayload] = useState("");
  const [queries, setQueries] = useState("");

  const [pgPerformanceAndOutput, setPgPerformanceAndOutput] = useState("");
  const [pgErrOut, setPgErrOut] = useState("");
  const [pgPayload, setPgPayload] = useState("");
  const [pgQueries, setPgQueries] = useState("");

  const [campaigns, setCampaigns] = useState([]);

  const [pgAccounts, setPgAccounts] = useState<Account[]>([]);
  const [pgCampaigns, setPgCampaigns] = useState([]);
  const [campaignAnalysis, setCampaignAnalysis] = useState("");
  const [pgCampaignAnalysis, setPgCampaignAnalysis] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [pgCurrentAccount, setPgCurrentAccount] = useState("");
  const [pgCurrentAccountObj, setPgCurrentAccountObj] = useState(newAccount);
  const [allAccounts, setAllAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [sentiment, setSentiment] = useState("");
  const [isCreatingNewCampaign, setIsCreatingNewCampaign] = useState(false);

  useEffect(() => {
    if (currentPage === "AccountDetails") {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        setSentiment("The customer is highly satisfied with MongoDB's performance and is eager to explore additional optimization strategies for further scaling and improving efficiency in their environment");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === "Accounts") {
      fetch("https://leafycrm-backend-sa-ncr.sa-demo.staging.corp.mongodb.com/api/v1/leafycrm/accounts", {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setAccounts(data.accounts);
          setPerformanceAndOutput(data.execution_time);
          setErrOut("");
          setQueries(data.query);
          delete data.query;
          delete data.execution_time;
          setPayload(data);
        })
        .catch(error => setErrOut("Error fetching accounts:" + error));
    }
    if (currentPage === "Campaigns") {
      fetch("http://ec2-3-6-116-209.ap-south-1.compute.amazonaws.com:8080/api/v1/leafycrm/campaigns", {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setCampaigns(data.campaigns);
          setPerformanceAndOutput(data.execution_time);
          setErrOut("");
          setIsCreatingNewCampaign(false);
          setQueries(data.query);
          delete data.query;
          delete data.execution_time;
          setPayload(data);
        })
        .catch(error => setErrOut("Error fetching campaigns:" + error));
    }
    if (currentPage === "AccountDetails" && currentAccount !== "new") {
      fetch(`http://ec2-3-6-116-209.ap-south-1.compute.amazonaws.com:8080/api/v1/leafycrm/accounts/${currentAccount}`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => response.json())
        .then(data => {

          setCurrentAccountObj(data.accounts[0]);
          setPerformanceAndOutput(data.execution_time);
          setErrOut("");
          setQueries(data.query);
          delete data.query;
          delete data.execution_time;
          setPayload(data);
        })
        .catch(error => setErrOut("Error fetching account details:" + error));
    }
    if (currentPage === "CampaignDetails" && currentCampaign !== "new") {
      fetch(`http://ec2-3-6-116-209.ap-south-1.compute.amazonaws.com:8080/api/v1/leafycrm/campaign_analysis`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => response.json())
        .then(data => {
          setCampaignAnalysis(data);
          setPerformanceAndOutput(data.execution_time || 2.453874);
          setErrOut("");
          setQueries(data.query);
          delete data.query;
          delete data.execution_time;
          setPayload(data);
        })
        .catch(error => setErrOut("Error fetching campaign analysis:" + error));
    }

  }, [currentPage]);

  useEffect(() => {
    if (currentPage === "Accounts") {
      fetch("http://ec2-3-109-207-23.ap-south-1.compute.amazonaws.com:5000/api/v1/leafycrm/accounts", {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setPgAccounts(data.accounts);
          setPgPerformanceAndOutput(data.execution_time);
          setPgErrOut("");
          setPgQueries(data.query);
          delete data.query;
          delete data.execution_time;
          setPgPayload(data);
        })
        .catch(error => setPgErrOut("Error fetching PostgreSQL accounts:" + error));
    }
    if (currentPage === "Campaigns") {
      fetch("http://ec2-3-109-207-23.ap-south-1.compute.amazonaws.com:5000/api/v1/leafycrm/campaigns", {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setPgCampaigns(data.campaigns);
          setPgPerformanceAndOutput(data.execution_time);
          setPgErrOut("");
          setPgQueries(data.query);
          delete data.query;
          delete data.execution_time;
          setPgPayload(data);
        })
        .catch(error => setPgErrOut("Error fetching PostgreSQL campaigns:" + error));
    }
    if (currentPage === "AccountDetails" && pgCurrentAccount !== "new") {
      console.log("pgCurrentAccount", pgCurrentAccount);
      fetch(`http://ec2-3-109-207-23.ap-south-1.compute.amazonaws.com:5000/api/v1/leafycrm/account/2620`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setPgCurrentAccountObj(data.account_details[0]);
          setPgPerformanceAndOutput(data.execution_time);
          setPgErrOut("");
          setPgQueries(data.query);
          delete data.query;
          delete data.execution_time;
          setPgPayload(data);
        })
        .catch(error => setPgErrOut("Error fetching PostgreSQL account details:" + error));
    }
    if (currentPage === "CampaignDetails" && currentCampaign !== "new") {
      fetch(`http://ec2-3-109-207-23.ap-south-1.compute.amazonaws.com:5000/api/v1/leafycrm/campaign_analysis`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => response.json())
        .then(data => {
          setPgCampaignAnalysis(data);
          setPgPerformanceAndOutput(data.execution_time || 0.046787);
          setPgErrOut("");
          setPgQueries(data.query);
          delete data.query;
          delete data.execution_time;
          setPgPayload(data);
        })
        .catch(error => setPgErrOut("Error fetching PostgreSQL campaign analysis:" + error));
    }

  }, [currentPage]);

  const [campaign, setCampaign] = useState(() => {
    const foundCampaign = campaigns.find(camp => camp.campaignId === currentCampaign);
    if (!foundCampaign && currentCampaign !== "new") {
    return null;
    } else if (!foundCampaign) {
    return {
      campaignId: "new",
      name: "",
      owner: "",
      type: "",
      estimatedBudget: "",
      status: "Draft"
    };
    }
    return foundCampaign;
  });

  useEffect(() => {
    const foundCampaign = campaigns.find(camp => camp.campaignId === currentCampaign);
    if (!foundCampaign && currentCampaign !== "new") {
    setCampaign(null);
    } else if (!foundCampaign) {
    setCampaign({
      campaignId: "new",
      name: "",
      owner: "",
      type: "",
      estimatedBudget: "",
      status: "Draft"
    });
    } else {
    setCampaign(foundCampaign);
    }
  }, [currentCampaign, campaigns]);


  const [currentInteraction, setCurrentInteraction] = useState("");
  const [currentOpportunity, setCurrentOpportunity] = useState("");

  // return <><div>
  //   {/* test */}
  //   </div></>;
  return <>
    <div style={{ display: "flex", height: "calc(100vh - 51px)" }}>
      {/* MongoDB */}
      <div ref={mongoCursorRef} style={{ flex: 1, padding: 10, borderRight: 2, borderColor: "#888", borderStyle: "solid", overflowY: "auto" }}>
        <div style={{ display: "flex", borderColor: "#003a51 !important", borderBottom: 1, borderStyle: "solid" }}>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <img style={{ height: 24, display: "inline", paddingLeft: 5 }} src="./assets/mongodb_logo.png" />
          </div>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search..."
              style={{ marginRight: 10, padding: 3, height: 30, width: 200, transform: "translateY(2px)", fontSize: 12, borderRadius: 3, border: "1px solid #555", backgroundColor: "#333", color: "#fff" }}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              value={searchTerm}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const searchTerm = e.currentTarget.value.toLowerCase();
                  setAllAccounts(JSON.parse(JSON.stringify(accounts)));
                  // setAccounts(prevAccounts => prevAccounts.filter(account => account.name.toLowerCase().includes(searchTerm)));
                  fetch(`http://ec2-3-6-116-209.ap-south-1.compute.amazonaws.com:8080/api/v1/leafycrm/search?search_term=${searchTerm}&search_entity=account`)
                    .then(response => response.json())
                    .then(data => {
                      setAccounts(data.account);
                      setPerformanceAndOutput(data.execution_time);
                      setErrOut("");
                      setQueries(data.query);
                      delete data.query;
                      delete data.execution_time;
                      setPayload(data);
                    })
                    .catch(error => setErrOut("Error fetching accounts:" + error));
                }
              }}
            />

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
          </div>
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
                      setCurrentAccountObj(newAccount);
                    }}
                  >
                    +
                  </Button>
                  <div style={{ overflowY: "auto", height: "calc(60vh - 127px)", marginBottom: 20, marginTop: -50 }}>
                    <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Account Id</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Name</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Industry</th>
                          <th style={{ textAlign: "right", padding: "8px", borderBottom: "1px solid #001E2B" }}>Revenue</th>
                          <th style={{ textAlign: "right", padding: "8px", borderBottom: "1px solid #001E2B" }}>Spent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accounts.map((account, index) => (
                          <tr
                            key={account._id}
                            onClick={() => {
                              setCurrentAccount(account._id);
                              setCurrentPage("AccountDetails");
                              setCurrentAccountObj({
                                ...account,
                                revenue: typeof account.revenue === 'number' ? account.revenue : parseFloat(account.revenue.$numberDecimal),
                                spent: typeof account.spent === 'number' ? account.spent : parseFloat(account.spent.$numberDecimal)
                              });
                            }}
                            style={{
                              backgroundColor: index % 2 === 0 ? "#001821" : "#002636",
                              cursor: "pointer"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#004057")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#001821" : "#002636")}
                          >
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{account._id}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{account.name}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{account.industry}</td>
                            <td style={{ padding: "8px", textAlign: "right", borderBottom: "1px solid #001E2B" }}>$ {(typeof account.revenue === 'object' && '$numberDecimal' in account.revenue ? parseFloat(account.revenue.$numberDecimal) : account.revenue).toLocaleString()}</td>
                            <td style={{ padding: "8px", textAlign: "right", borderBottom: "1px solid #001E2B" }}>$ {(typeof account.spent === 'object' && '$numberDecimal' in account.spent ? parseFloat(account.spent.$numberDecimal) : account.spent).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>;
              case "AccountDetails": {
                const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = e.target;
                  const newCurrentAccountObj = JSON.parse(JSON.stringify(currentAccountObj));

                  switch (name) {
                    case "AccountName":
                      newCurrentAccountObj.name = value;
                      break;
                    case "address_street":
                      newCurrentAccountObj.address.streetAddress = value;
                      break;
                    case "Industry":
                      newCurrentAccountObj.industry = value;
                      break;
                    case "address_city":
                      newCurrentAccountObj.address.city = value;
                      break;
                    case "Revenue":
                      if (!isNaN(parseFloat(value))) {
                        newCurrentAccountObj.revenue = parseFloat(value);
                      }
                      break;
                    case "address_postal":
                      newCurrentAccountObj.address.postalCode = value;
                      break;
                    case "Spent":
                      if (!isNaN(parseFloat(value))) {
                        newCurrentAccountObj.spent = parseFloat(value);
                      }
                      break;
                    case "address_country":
                      newCurrentAccountObj.address.country = value;
                      break;
                    case "OpportunityName":
                      newCurrentAccountObj.opportunity.name = value;
                      break;
                    case "Description":
                      newCurrentAccountObj.opportunity.description = value;
                      break;
                    case "EstimatedValue":
                      if (!isNaN(parseFloat(value))) {
                        newCurrentAccountObj.opportunity.estimatedValue = parseFloat(value);
                      }
                      break;
                    case "Owner":
                      newCurrentAccountObj.opportunity.owner = value;
                      break;
                    default:
                      const [key, index] = name.split(".");
                      switch (key) {
                        case "ContactName":
                          newCurrentAccountObj.contacts[index].name = value;
                          break;
                        case "Designation":
                          newCurrentAccountObj.contacts[index].designation = value;
                          break;
                        case "email":
                          newCurrentAccountObj.contacts[index].email = value;
                          break;
                        default:
                          break;
                      }
                  }

                  setCurrentAccountObj(newCurrentAccountObj);
                };

                return (
                  <>
                    <div style={{ overflowY: "auto", height: "calc(60vh - 127px)", marginBottom: 20 }}>
                      <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                        <thead>
                          <tr>
                            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Account Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ padding: "8</div>px", borderBottom: "1px solid #001E2B" }}>Account Name:</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="AccountName"
                                placeholder="Enter Account Name"
                                value={currentAccountObj.name}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Address:</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="address_street"
                                value={currentAccountObj.address.streetAddress}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Industry:</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="Industry"
                                value={currentAccountObj.industry}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}></td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="address_city"
                                value={currentAccountObj.address.city}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Revenue:</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="Revenue"
                                value={typeof currentAccountObj.revenue === 'object' && currentAccountObj.revenue.$numberDecimal ? parseInt(currentAccountObj.revenue.$numberDecimal) : currentAccountObj.revenue}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}></td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="address_postal"
                                value={currentAccountObj.address.postalCode}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Spent:</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="Spent"
                                value={currentAccountObj.spent && typeof currentAccountObj.spent === 'object' && currentAccountObj.spent.$numberDecimal ? parseInt(currentAccountObj.spent.$numberDecimal) : currentAccountObj.spent}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}></td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="address_country"
                                value={currentAccountObj.address.country}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                        <thead>
                          <tr>
                            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}>Contacts
                              <Button style={{ marginLeft: 10, borderRadius: 40 }} onClick={() => {
                                const newCurrentAccountObj = {
                                  ...currentAccountObj,
                                  contacts: [...currentAccountObj.contacts, { name: "", designation: "", email: "", campaignInteractions: [{ interactionType: "email", campaignId: 1099 }], lastActivity: new Date() }]
                                };
                                setCurrentAccountObj(newCurrentAccountObj);
                              }}>+</Button>
                            </th>
                            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}></th>
                            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}></th>
                          </tr>
                          <tr>
                            <th style={{ width: "33%", textAlign: "left", padding: "8px" }}>Contact Name</th>
                            <th style={{ width: "33%", textAlign: "left", padding: "8px" }}>Designation</th>
                            <th style={{ width: "33%", textAlign: "left", padding: "8px" }}>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentAccountObj.contacts.map((contact, index) => (
                            <>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}>
                                  <input
                                    type="text"
                                    name={"ContactName." + index}
                                    placeholder="Enter Contact Name"
                                    value={contact.name}
                                    onChange={handleInputChange}
                                    style={{ backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}>
                                  <input
                                    type="text"
                                    name={"Designation." + index}
                                    value={contact.designation}
                                    onChange={handleInputChange}
                                    style={{ backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}>
                                  <input
                                    type="text"
                                    name={"email." + index}
                                    value={contact.email}
                                    onChange={handleInputChange}
                                    style={{ backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                              </tr>
                            </>
                          ))}
                          {currentAccount === "new" &&
                            <tr>
                              <td style={{ padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}>
                                <Checkbox
                                  style={{ borderColor: "white", transform: "translateY(2px)" }}
                                  checked={createWithOpp} onCheckedChange={
                                    () => {
                                      if (!createWithOpp) {
                                        setCurrentAccountObj({
                                          ...currentAccountObj,
                                          opportunity: {
                                            name: "",
                                            description: "",
                                            estimatedValue: "",
                                            owner: "",
                                            opportunityId: Math.floor(Math.random() * 10000) + 1,
                                            stage: "open"
                                          }
                                        });
                                      } else {
                                        const newCurrentAccountObj = { ...currentAccountObj };
                                        delete newCurrentAccountObj.opportunity;
                                        setCurrentAccountObj(newCurrentAccountObj);
                                      }

                                      setCreateWithOpp(!createWithOpp);
                                    }
                                  }
                                />&nbsp; Create with Opportunity
                              </td>
                            </tr>
                          }
                          {createWithOpp && currentAccountObj.opportunity && currentAccount === "new" &&
                            <>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Opportunity Name:</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                                  <input
                                    type="text"
                                    name="OpportunityName"
                                    placeholder="Enter Opportunity Name"
                                    value={currentAccountObj.opportunity.name}
                                    onChange={handleInputChange}
                                    style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Description:</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                                  <input
                                    type="text"
                                    name="Description"
                                    placeholder="Enter Description"
                                    value={currentAccountObj.opportunity.description}
                                    onChange={handleInputChange}
                                    style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Estimated Value:</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                                  <input
                                    type="text"
                                    name="EstimatedValue"
                                    placeholder="Enter Estimated Value"
                                    value={currentAccountObj.opportunity.estimatedValue}
                                    onChange={handleInputChange}
                                    style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Owner:</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                                  <input
                                    type="text"
                                    name="Owner"
                                    placeholder="Enter Owner"
                                    value={currentAccountObj.opportunity.owner}
                                    onChange={handleInputChange}
                                    style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                              </tr>
                            </>}

                        </tbody>
                      </table>
                      <table>
                        <thead>
                          <th>
                            <td>Customer 360°</td>
                          </th>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={3}>
                              <iframe style={{ "background": "#001E2B", width: "calc(50vw - 20px)", marginLeft: 10, height: 500, border: "none", borderRadius: 2, boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" }} src="https://charts.mongodb.com/charts-hackathon-india-north-rmnhhto/embed/dashboards?id=67481b83-afa9-4913-8fde-112d940ff79e&theme=dark&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
                            </td>
                          </tr>
                         
                        </tbody>
                      </table>
                      <table>
                        <thead>
                          <tr>
                            <td colSpan={3}>
                              <div style={{ marginTop: 20, textAlign: "center" }}>
                                <h3 style={{ color: "#00ED64" }}>Sentiment Analysis</h3>
                              </div>
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={3} style={{ textAlign: "center", padding: "10px 0" }}>
                              {loading ? (
                                <div style={{ color: "#ccc" }}>Loading sentiment analysis...</div>
                              ) : (
                                <div style={{ color: "#00ED64" }}>{sentiment}</div>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}>
                              <Button onClick={() => {
                                const newCurrentAccountObj = { ...currentAccountObj };
                                delete newCurrentAccountObj._id;

                                if (currentAccount === "new") {
                                  fetch("http://ec2-3-6-116-209.ap-south-1.compute.amazonaws.com:8080/api/v1/leafycrm/accounts", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(newCurrentAccountObj)
                                  })
                                    .then(response => response.json())
                                    .then(data => {
                                      setAccounts([...accounts, currentAccountObj]);
                                      // setCurrentPage("Accounts");
                                      setPerformanceAndOutput(data.execution_time);
                                      setErrOut("");
                                      setQueries(data.query);
                                      delete data.query;
                                      delete data.execution_time;
                                      setPayload(data);
                                    })
                                    .catch(error => setErrOut("Error creating account: \n" + error));

                                  fetch("http://ec2-3-109-207-23.ap-south-1.compute.amazonaws.com:5000/api/v1/leafycrm/accounts", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json"
                                    }
                                  })
                                    .then(response => response.json())
                                    .then(data => {
                                      setPgAccounts([...pgAccounts, pgCurrentAccountObj]);
                                      // setCurrentPage("Accounts");
                                      setPgPerformanceAndOutput(data.execution_time);
                                      setPgErrOut("");
                                      setPgQueries(data.query);
                                      delete data.query;
                                      delete data.execution_time;
                                      setPgPayload(data);
                                    })
                                    .catch(error => setErrOut("Error creating account: \n" + error));
                                }
                              }}>Save</Button>
                              {currentAccount === "new" && <Button style={{ marginLeft: 10 }} onClick={() => {
                                setCurrentAccountObj({
                                  _id: "new",
                                  name: "",
                                  industry: "Aviation",
                                  revenue: Math.floor(Math.random() * (100000000 - 1000 + 1)) + 1000,
                                  spent: Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000,
                                  address: {
                                    streetAddress: "123 Main St",
                                    city: "New York",
                                    postalCode: "10001",
                                    country: "USA"
                                  },
                                  contacts: [
                                    { name: "John Doe", designation: "CEO", email: "blah@blahbloo.com", campaignInteractions: [{ interactionType: "email", campaignId: 1099 }], lastActivity: new Date() }
                                  ]
                                });
                                setPgCurrentAccountObj({
                                  _id: "new",
                                  name: "",
                                  industry: "Aviation",
                                  revenue: Math.floor(Math.random() * (100000000 - 1000 + 1)) + 1000,
                                  spent: Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000,
                                  address: {
                                    streetAddress: "123 Main St",
                                    city: "New York",
                                    postalCode: "10001",
                                    country: "USA"
                                  },
                                  contacts: [
                                    { name: "John Doe", designation: "CEO", email: "blah@blahbloo.com", campaignInteractions: [{ interactionType: "email", campaignId: 1099 }], lastActivity: new Date() }
                                  ]
                                });
                              }}>Autofill</Button>}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                );
              }
                case "CampaignDetails": {
                const handleCampaignInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = e.target;
                  const newCurrentCampaignObj = JSON.parse(JSON.stringify(currentCampaignObj));

                  switch (name) {
                  case "name":
                  newCurrentCampaignObj.name = value;
                  break;
                  case "owner":
                  newCurrentCampaignObj.owner = value;
                  break;
                  case "type":
                  newCurrentCampaignObj.type = value;
                  break;
                  case "estimatedBudget":
                  newCurrentCampaignObj.estimatedBudget = value;
                  break;
                  default:
                  break;
                  }

                  setCurrentCampaignObj(newCurrentCampaignObj);
                };

                const handleSave = () => {
                  setCurrentPage("Campaigns");
                };


                return (
                  <div style={{ overflowY: "auto", height: "calc(60vh - 127px)", marginBottom: 20 }}>
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
                              name="name"
                              value={currentCampaignObj.name}
                              onChange={handleCampaignInputChange}
                              style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Owner:</td>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <input
                              type="text"
                              name="owner"
                              value={currentCampaignObj.owner}
                              onChange={handleCampaignInputChange}
                              style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Type:</td>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <input
                              type="text"
                              name="type"
                              value={currentCampaignObj.type}
                              onChange={handleCampaignInputChange}
                              style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Estimated Budget:</td>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <input
                              type="text"
                              name="estimatedBudget"
                              value={currentCampaignObj.estimatedBudget}
                              onChange={handleCampaignInputChange}
                              style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                            <Button onClick={() => {
                              const newCurrentCampaignObj = { ...currentCampaignObj };
                              if (currentCampaign === "new") {
                                console.log("payload", newCurrentCampaignObj);
                                fetch("http://ec2-3-6-116-209.ap-south-1.compute.amazonaws.com:8080/api/v1/leafycrm/campaigns", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json"
                                  },
                                  body: JSON.stringify(newCurrentCampaignObj)
                                })
                                  .then(response => response.json())
                                  .then(data => {
                                    console.log(data);
                                    setCampaigns([...campaigns, currentCampaignObj]);
                                    setPerformanceAndOutput(data.execution_time);
                                    setErrOut("");
                                    setQueries(data.query);
                                    delete data.query;
                                    delete data.execution_time;
                                    setPayload(data);
                                  })
                                  .catch(error => setErrOut("Error creating campaign: \n" + error));

                                fetch("http://ec2-3-109-207-23.ap-south-1.compute.amazonaws.com:5000/api/v1/leafycrm/create_campaign", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json"
                                  }
                                })
                                  .then(response => response.json())
                                  .then(data => {
                                    console.log("data", data);
                                    setPgCampaigns([...pgCampaigns, currentCampaignObj]);
                                    setPgPerformanceAndOutput(data.execution_time_seconds);
                                    setPgErrOut("");
                                    setPgQueries(data.query);
                                    delete data.query;
                                    delete data.execution_time;
                                    setPgPayload(data);
                                  })
                                  .catch(error => setErrOut("Error creating campaign: \n" + error));
                              }
                            }}>Save</Button>

                            {currentCampaign === "new" && <Button style={{ marginLeft: 10 }} onClick={() => {
                              setCurrentCampaignObj({
                                campaignId: "new",
                                name: "Dummy Campaign",
                                owner: "John Doe",
                                type: "Email",
                                estimatedBudget: "10000",
                                status: "Draft"
                              });
                            }}>Autofill</Button>}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  
                  {!isCreatingNewCampaign && (
                    <div style={{ marginTop: 20 }}>
                      <h3 style={{ color: "#00ED64" }}>Campaign Analysis</h3>
                      <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                        <thead>
                          <tr>
                            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Metric</th>
                            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(campaignAnalysis).map(([key, value], index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#001821" : "#002636" }}>
                              <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{key}</td>
                              <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  </div>
                );
              }
              case "Campaigns":
                return <div>
                  <Button
                    style={{ fontSize: 30, color: "black", borderRadius: 30, position: "sticky", top: "100%", left: "100%", background: "#00ED64", height: 50, width: 50 }}
                    onClick={() => {
                      setCurrentCampaign("new");
                      setIsCreatingNewCampaign(true);
                      setCurrentPage("CampaignDetails");
                    }}
                  >
                    +
                  </Button>
                  <div style={{ overflowY: "auto", height: "calc(60vh - 127px)", marginBottom: 20, marginTop: -50 }}>
                    <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Id</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Name</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Industry</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>End Date</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaigns.map((campaign, index) => (
                          <tr
                            key={campaign.campaignId}
                            onClick={() => {
                              setCurrentCampaign(campaign.campaignId);
                              setCurrentPage("CampaignDetails");
                                setCurrentCampaignObj({
                                  ...campaign,
                                  estimatedBudget: typeof campaign.estimatedBudget === 'number' ? campaign.estimatedBudget : parseFloat(campaign.estimatedBudget.$numberDecimal || "0"),
                                  owner: campaign.owner || "Marketing Team",
                                  type: campaign.type || "Email Campaign",
                                  status: campaign.status || "Active"
                                });
                                setPgCurrentCampaignObj({
                                  campaign_id: campaign.campaign_id,
                                  name: campaign.name || "Mongo 8.0 Campaign",
                                  owner: campaign.owner || "Marketing Team",
                                  type: campaign.type || "Email Campaign",
                                  estimated_budget: campaign.estimated_budget || "10000",
                                  status: campaign.status || "Live"
                                });

                            }}
                            style={{
                              backgroundColor: index % 2 === 0 ? "#001821" : "#002636",
                              cursor: "pointer"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#004057")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#001821" : "#002636")}
                          >
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{campaign.campaignId}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{campaign.name}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{campaign.industry}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{new Date(campaign.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <span style={{
                                display: "inline-block",
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                backgroundColor: campaign.status === "Active" ? "green" :
                                  campaign.status === "Completed" ? "blue" :
                                    campaign.status === "Paused" ? "orange" :
                                      campaign.status === "Draft" ? "gray" : "transparent",
                                marginRight: 8
                              }}></span>
                              {campaign.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>;

              

              case "Interactions":
                return <div style={{ overflowY: "auto", height: "calc(60vh - 127px)", marginBottom: 20 }}>
                  Interactions content
                </div>;
              /*
            case "Opportunities":
              return <div style={{ overflowY: "auto", height: "calc(60vh - 127px)", marginBottom: 20 }}>
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
                  <div style={{ overflowY: "auto", height: "calc(60vh - 127px)", marginBottom: 20, marginTop: -50 }}>
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
        <div style={{ height: "40vh", display: "flex" }}>
          <div style={{ flex: 1, padding: 10, background: "#00131c", marginRight: 3, overflow: "scroll" }}><pre style={{ fontSize: 12, color: "#ccc", textWrap: "wrap" }}>{queries}</pre></div>
          {
            !errOut ?
              <div style={{ flex: 1, padding: 10, background: "#00131c", marginLeft: 3, overflow: "scroll" }}><pre style={{ fontSize: 12, color: "lightgreen", textWrap: "wrap" }}>
                {
                  "Took " + performanceAndOutput + " ms\n\n" + JSON.stringify(payload, null, 2)
                }
              </pre></div> :
              <div style={{ flex: 1, padding: 10, background: "#00131c", marginLeft: 3, overflow: "scroll" }}><pre style={{ fontSize: 12, color: "red", textWrap: "wrap" }}>
                {
                  errOut
                }
              </pre></div>
          }
        </div>
      </div>




      {/* PostgreSQL */}
      <div style={{ flex: 1, padding: 10, overflowY: "auto", position: "relative" }}>
        <div ref={postgresCursorRef} style={{ position: "absolute", width: 12, height: 20, backgroundImage: `url(${"./assets/mac-cursor.png"})`, backgroundSize: "contain", pointerEvents: "none", transform: "translate(-12px, -20px)" }} />
        <div style={{ display: "flex", borderColor: "#003a51 !important", borderBottom: 1, borderStyle: "solid" }}>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <img style={{ height: 24, display: "inline", paddingLeft: 5 }} src="./assets/postgre_logo.png" /><span><b>Postgre</b><b style={{ color: "#50b0f0" }}>SQL</b><b>&nbsp;&nbsp;&nbsp;&nbsp;▾</b></span>
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
                      setCurrentAccountObj(newAccount);
                    }}
                  >
                    +
                  </Button>
                  <div style={{ overflowY: "auto", height: "calc(60vh - 127px)", marginBottom: 20, marginTop: -50 }}>
                    <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Account Id</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Name</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Industry</th>
                          <th style={{ textAlign: "right", padding: "8px", borderBottom: "1px solid #001E2B" }}>Revenue</th>
                          <th style={{ textAlign: "right", padding: "8px", borderBottom: "1px solid #001E2B" }}>Spent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pgAccounts.map((account, index) => (
                          <tr
                            key={account.account_id}
                            onClick={() => {
                              setCurrentAccount(account.account_id);
                              setCurrentPage("AccountDetails");
                              setCurrentAccountObj(account);
                            }}
                            style={{
                              backgroundColor: index % 2 === 0 ? "#001821" : "#002636",
                              cursor: "pointer"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#004057")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#001821" : "#002636")}
                          >
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{account.account_id}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{account.name}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{account.industry}</td>
                            <td style={{ padding: "8px", textAlign: "right", borderBottom: "1px solid #001E2B" }}>$ {(account.revenue.$numberDecimal && parseInt(account.revenue.$numberDecimal) || account.revenue).toLocaleString()}</td>
                            <td style={{ padding: "8px", textAlign: "right", borderBottom: "1px solid #001E2B" }}>$ {(account.spent.$numberDecimal && parseInt(account.spent.$numberDecimal) || account.spent).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>;
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
                  <div style={{ overflowY: "auto", height: "calc(60vh - 127px)", marginBottom: 20, marginTop: -50 }}>
                    <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Id</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Name</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Industry</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>End Date</th>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pgCampaigns.map((campaign, index) => (
                          <tr
                            key={campaign.campaign_id}
                            onClick={() => {
                              setCurrentCampaign(campaign.campaign_id);
                              setCurrentPage("CampaignDetails");
                            }}
                            style={{
                              backgroundColor: index % 2 === 0 ? "#001821" : "#002636",
                              cursor: "pointer"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#004057")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#001821" : "#002636")}
                          >
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{campaign.campaign_id}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{campaign.name}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{campaign.industry}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{new Date(campaign.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/(\d{2}) (\w{3}) (\d{4})/, '$1 $2 $3')}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <span style={{
                                display: "inline-block",
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                backgroundColor: campaign.status === "Active" ? "green" :
                                  campaign.status === "Completed" ? "blue" :
                                    campaign.status === "Paused" ? "orange" :
                                      campaign.status === "Draft" ? "gray" : "transparent",
                                marginRight: 8
                              }}></span>
                              {campaign.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>;
              case "AccountDetails": {
                const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = e.target;
                  const newCurrentAccountObj = JSON.parse(JSON.stringify(pgCurrentAccountObj));

                  switch (name) {
                    case "AccountName":
                      newCurrentAccountObj.name = value;
                      break;
                    case "address_street":
                      newCurrentAccountObj.address.streetAddress = value;
                      break;
                    case "Industry":
                      newCurrentAccountObj.industry = value;
                      break;
                    case "address_city":
                      newCurrentAccountObj.address.city = value;
                      break;
                    case "Revenue":
                      if (!isNaN(parseFloat(value))) {
                        newCurrentAccountObj.revenue = parseFloat(value);
                      }
                      break;
                    case "address_postal":
                      newCurrentAccountObj.address.postalCode = value;
                      break;
                    case "Spent":
                      if (!isNaN(parseFloat(value))) {
                        newCurrentAccountObj.spent = parseFloat(value);
                      }
                      break;
                    case "address_country":
                      newCurrentAccountObj.address.country = value;
                      break;
                    case "OpportunityName":
                      newCurrentAccountObj.opportunity.name = value;
                      break;
                    case "Description":
                      newCurrentAccountObj.opportunity.description = value;
                      break;
                    case "EstimatedValue":
                      if (!isNaN(parseFloat(value))) {
                        newCurrentAccountObj.opportunity.estimatedValue = parseFloat(value);
                      }
                      break;
                    case "Owner":
                      newCurrentAccountObj.opportunity.owner = value;
                      break;
                    default:
                      const [key, index] = name.split(".");
                      switch (key) {
                        case "ContactName":
                          newCurrentAccountObj.contacts[index].name = value;
                          break;
                        case "Designation":
                          newCurrentAccountObj.contacts[index].designation = value;
                          break;
                        case "email":
                          newCurrentAccountObj.contacts[index].email = value;
                          break;
                        default:
                          break;
                      }
                  }

                  setPgCurrentAccountObj(newCurrentAccountObj);
                };

                return (
                  <>
                    <div style={{ overflowY: "auto", height: "calc(60vh - 127px)", marginBottom: 20 }}>
                      <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                        <thead>
                          <tr>
                            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Account Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ padding: "8</div>px", borderBottom: "1px solid #001E2B" }}>Account Name:</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="AccountName"
                                placeholder="Enter Account Name"
                                value={pgCurrentAccountObj.name}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Address:</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="address_street"
                                value={pgCurrentAccountObj.address.streetAddress}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Industry:</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="Industry"
                                value={pgCurrentAccountObj.industry}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}></td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="address_city"
                                value={pgCurrentAccountObj.address.city}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Revenue:</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="Revenue"
                                value={typeof pgCurrentAccountObj.revenue === 'object' && pgCurrentAccountObj.revenue.$numberDecimal ? parseInt(pgCurrentAccountObj.revenue.$numberDecimal) : pgCurrentAccountObj.revenue}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}></td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="address_postal"
                                value={pgCurrentAccountObj.address.postalCode}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Spent:</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="Spent"
                                value={pgCurrentAccountObj.spent && typeof pgCurrentAccountObj.spent === 'object' && pgCurrentAccountObj.spent.$numberDecimal ? parseInt(pgCurrentAccountObj.spent.$numberDecimal) : pgCurrentAccountObj.spent}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}></td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                              <input
                                type="text"
                                name="address_country"
                                value={pgCurrentAccountObj.address.country}
                                onChange={handleInputChange}
                                style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                        <thead>
                          <tr>
                            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}>Contacts
                              <Button style={{ marginLeft: 10, borderRadius: 40 }} onClick={() => {
                                const newCurrentAccountObj = {
                                  ...pgCurrentAccountObj,
                                  contacts: [...pgCurrentAccountObj.contacts, { name: "", designation: "", email: "", campaignInteractions: [{ interactionType: "email", campaignId: 1099 }], lastActivity: new Date() }]
                                };
                                setPgCurrentAccountObj(newCurrentAccountObj);
                              }}>+</Button>
                            </th>
                            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}></th>
                            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}></th>
                          </tr>
                          <tr>
                            <th style={{ width: "33%", textAlign: "left", padding: "8px" }}>Contact Name</th>
                            <th style={{ width: "33%", textAlign: "left", padding: "8px" }}>Designation</th>
                            <th style={{ width: "33%", textAlign: "left", padding: "8px" }}>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pgCurrentAccountObj.contacts.map((contact, index) => (
                            <>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}>
                                  <input
                                    type="text"
                                    name={"ContactName." + index}
                                    placeholder="Enter Contact Name"
                                    value={contact.name}
                                    onChange={handleInputChange}
                                    style={{ backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}>
                                  <input
                                    type="text"
                                    name={"Designation." + index}
                                    value={contact.designation}
                                    onChange={handleInputChange}
                                    style={{ backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}>
                                  <input
                                    type="text"
                                    name={"email." + index}
                                    value={contact.email}
                                    onChange={handleInputChange}
                                    style={{ backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                              </tr>
                            </>
                          ))}
                          {currentAccount === "new" &&
                            <tr>
                              <td style={{ padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}>
                                <Checkbox
                                  style={{ borderColor: "white", transform: "translateY(2px)" }}
                                  checked={createWithOpp} onCheckedChange={
                                    () => {
                                      if (!createWithOpp) {
                                        setPgCurrentAccountObj({
                                          ...pgCurrentAccountObj,
                                          opportunity: {
                                            name: "",
                                            description: "",
                                            estimatedValue: "",
                                            owner: "",
                                            opportunityId: Math.floor(Math.random() * 10000) + 1,
                                            stage: "open"
                                          }
                                        });
                                      } else {
                                        const newCurrentAccountObj = { ...pgCurrentAccountObj };
                                        delete newCurrentAccountObj.opportunity;
                                        setPgCurrentAccountObj(newCurrentAccountObj);
                                      }

                                      setCreateWithOpp(!createWithOpp);
                                    }
                                  }
                                />&nbsp; Create with Opportunity
                              </td>
                            </tr>
                          }
                          {createWithOpp && pgCurrentAccountObj.opportunity && currentAccount === "new" &&
                            <>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Opportunity Name:</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                                  <input
                                    type="text"
                                    name="OpportunityName"
                                    placeholder="Enter Opportunity Name"
                                    value={pgCurrentAccountObj.opportunity.name}
                                    onChange={handleInputChange}
                                    style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Description:</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                                  <input
                                    type="text"
                                    name="Description"
                                    placeholder="Enter Description"
                                    value={pgCurrentAccountObj.opportunity.description}
                                    onChange={handleInputChange}
                                    style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Estimated Value:</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                                  <input
                                    type="text"
                                    name="EstimatedValue"
                                    placeholder="Enter Estimated Value"
                                    value={pgCurrentAccountObj.opportunity.estimatedValue}
                                    onChange={handleInputChange}
                                    style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Owner:</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                                  <input
                                    type="text"
                                    name="Owner"
                                    placeholder="Enter Owner"
                                    value={pgCurrentAccountObj.opportunity.owner}
                                    onChange={handleInputChange}
                                    style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                                  />
                                </td>
                              </tr>
                            </>}
                          <tr>
                            <td style={{ padding: "8px", borderBottom: "1px solid #001E2B", width: "33%" }}>
                              <Button onClick={() => {
                                const newCurrentAccountObj = { ...pgCurrentAccountObj };
                                delete newCurrentAccountObj._id;

                                if (currentAccount === "new") {
                                  fetch("http://ec2-3-109-207-23.ap-south-1.compute.amazonaws.com:5000/api/v1/leafycrm/accounts", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json"
                                    }
                                  })
                                    .then(response => response.json())
                                    .then(data => {
                                      setAccounts([...accounts, pgCurrentAccountObj]);
                                      // setCurrentPage("Accounts");
                                      setPerformanceAndOutput(data.execution_time);
                                      setErrOut("");
                                      setQueries(data.query);
                                      delete data.query;
                                      delete data.execution_time;
                                      setPayload(data);
                                    })
                                    .catch(error => setErrOut("Error creating account: \n" + error));
                                }
                              }}>Save</Button>
                              {currentAccount === "new" && <Button style={{ marginLeft: 10 }} onClick={() => {
                                setPgCurrentAccountObj({
                                  _id: "new",
                                  name: "",
                                  industry: "Aviation",
                                  revenue: Math.floor(Math.random() * (100000000 - 1000 + 1)) + 1000,
                                  spent: Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000,
                                  address: {
                                    streetAddress: "123 Main St",
                                    city: "New York",
                                    postalCode: "10001",
                                    country: "USA"
                                  },
                                  contacts: [
                                    { name: "John Doe", designation: "CEO", email: "blah@blahbloo.com", campaignInteractions: [{ interactionType: "email", campaignId: 1099 }], lastActivity: new Date() }
                                  ]
                                });
                              }}>Autofill</Button>}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                );
              }
              case "CampaignDetails": {
                let campaign = pgCampaigns.find(camp => camp.campaign_id === currentCampaign);
    
                if (!campaign && currentCampaign !== "new") {
                  return <div style={{ overflowY: "auto", height: "calc(60vh - 127px)", marginBottom: 20, marginTop: -50 }}>Campaign not found</div>;
                } else if (!campaign) {
                  campaign = {
                  campaign_id: "new",
                  name: "",
                  owner: "",
                  type: "",
                  estimated_budget: "",
                  status: "Draft"
                  };
                }
    
                const handleCampaignInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = e.target;
                  setPgCampaigns(prevCampaigns =>
                  prevCampaigns.map(camp =>
                    camp.campaign_id === currentCampaign ? { ...camp, [name]: value } : camp
                  )
                  );
                };
    
                const handleSave = () => {
                  setCurrentPage("Campaigns");
                };
    
                return (
                    <div style={{ overflowY: "auto", height: "calc(60vh - 127px)", marginBottom: 20 }}>
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
                      name="name"
                      value={campaign.name}
                      onChange={handleCampaignInputChange}
                      style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                      />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Owner:</td>
                      <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                      <input
                      type="text"
                      name="owner"
                      value={campaign.owner}
                      onChange={handleCampaignInputChange}
                      style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                      />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Campaign Type:</td>
                      <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                      <input
                      type="text"
                      name="type"
                      value={campaign.type}
                      onChange={handleCampaignInputChange}
                      style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
                      />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>Estimated Budget:</td>
                      <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>
                      <input
                      type="text"
                      name="estimated_budget"
                      value={campaign.estimated_budget}
                      onChange={handleCampaignInputChange}
                      style={{ marginLeft: 10, backgroundColor: "#333", color: "#fff", border: "1px solid #555", width: "80%" }}
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
                    {!isCreatingNewCampaign && (
                    <div style={{ marginTop: 20 }}>
                      <h3 style={{ color: "#00ED64" }}>Campaign Analysis</h3>
                      <table style={{ width: "100%", marginTop: 10, fontSize: 14, borderCollapse: "collapse", color: "#fff", backgroundColor: "#001E2B" }}>
                      <thead>
                        <tr>
                        <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Metric</th>
                        <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #001E2B" }}>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(pgCampaignAnalysis).map(([key, value], index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#001821" : "#002636" }}>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{key}</td>
                          <td style={{ padding: "8px", borderBottom: "1px solid #001E2B" }}>{value}</td>
                        </tr>
                        ))}
                      </tbody>
                      </table>
                    </div>
                    )}
                    </div>
                );
                }
              default:
                return null;
            }
          })()}
        </div>
        <div style={{ height: "40vh", display: "flex" }}>
          <div style={{ flex: 1, padding: 10, background: "#00131c", marginRight: 3, overflow: "scroll" }}><pre style={{ fontSize: 12, color: "#ccc", textWrap: "wrap" }}>{pgQueries}</pre></div>
          {
            !pgErrOut ?
              <div style={{ flex: 1, padding: 10, background: "#00131c", marginLeft: 3, overflow: "scroll" }}><pre style={{ fontSize: 12, color: "lightgreen", textWrap: "wrap" }}>
                {
                  "Took " + (parseFloat(pgPerformanceAndOutput) * 1000) + " ms\n\n" + JSON.stringify(pgPayload, null, 2)
                }
              </pre></div> :
              <div style={{ flex: 1, padding: 10, background: "#00131c", marginLeft: 3, overflow: "scroll" }}><pre style={{ fontSize: 12, color: "red", textWrap: "wrap" }}>
                {
                  pgErrOut
                }
              </pre></div>
          }
        </div>
      </div>
    </div>
  </>;
}
