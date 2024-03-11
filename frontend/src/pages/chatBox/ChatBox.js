import React from 'react'
import ChatBot from "react-simple-chatbot";

const ChatBox = () => {

    function LowStockItemsList() {
        const listStyle = {
          listStyleType: "none", // Remove bullet points
          padding: "0", // Remove padding
          margin: "0", // Remove margin
        };
    
        const listItemStyle = {
          backgroundColor: "#FF4136", // Red background
          color: "#fff", // White text color
          padding: "8px 12px", // Padding around the text
          margin: "5px 0", // Margin between list items
          borderRadius: "5px", // Rounded corners
          fontWeight: "bold", // Bold text
          border: "1px solid #E90D00", // Add a border around the label
        };
    
        return (
          <div>
            Low Stock Items & Need Count Is:
            {stocks.length > 0 ? (
              <ul style={listStyle}>
                {stocks.map((stock, index) => (
                  <li key={stock._id} style={listItemStyle}>
                    {stock.productName} : {stock.reorderpoint - stock.stockQuantity}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items are currently low on stock.</p>
            )}
          </div>
        );
      }

    function ExitMessage() {
        return (
          <div
            style={{
              border: "3px solid #4CAF50",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              background: "linear-gradient(45deg, #e8f5e9, #b2dfdb)",
              boxShadow:
                "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
            }}
          >
            <span
              style={{
                fontSize: "1.7em",
                fontWeight: "bold",
                color: "#2E7D32",
                display: "block",
                marginBottom: "10px",
              }}
            >
              <i
                style={{
                  marginRight: "10px",
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "rotate(20deg)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "rotate(0deg)")
                }
              >
                👋
              </i>
              Goodbye!
            </span>
            <p
              style={{
                margin: "10px 0",
                color: "#555",
              }}
            >
              Thank you for using our chatbot. If you need assistance again, just
              start a new chat. <span style={{ color: "#4CAF50" }}>🌟</span>
            </p>
            <p
              style={{
                fontStyle: "italic",
                color: "#777",
              }}
            >
              Take care and see you soon!
            </p>
          </div>
        );
      }


    function WelcomeMessage() {
        return (
          <div
            style={{
              border: "2px solid #007BFF",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              backgroundColor: "#e6f7ff",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                backgroundColor: "#007BFF",
                color: "white",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                lineHeight: "50px",
                fontSize: "24px",
                marginBottom: "10px",
              }}
            >
              🚗
            </span>
    
            <h2 style={{ color: "#003366", marginTop: "10px" }}>
              Welcome to CM Spare Parts!
            </h2>
            <p style={{ fontSize: "1.1em", margin: "10px 0" }}>
              Where your vehicle's needs come first. We're thrilled to have you
              here.
            </p>
            <p style={{ fontWeight: "bold", color: "#007BFF" }}>
              How can we drive your queries today?
            </p>
          </div>
        );
      }
    
      const steps = [
        {
          id: "welcome",
          component: <WelcomeMessage />,
          trigger: "askName",
        },
        {
          id: "askName",
          message: "Enter Your Name : ",
          trigger: "Waiting1",
        },
        {
          id: "Waiting1",
          user: true,
          trigger: "name",
        },
        {
          id: "name",
          message: "Hi {previousValue} ,  How can I assist you today?",
          trigger: "main-questions",
        },
        {
          id: "main-questions",
          options: [
            {
              value: "get-started",
              label: "Getting Started",
              trigger: "get-started-answer",
            },
            {
              value: "contact-stock-menager",
              label: "Contact Stock Manager",
              trigger: "contact-stock-menager-answer",
            },
            {
              value: "view-Stock-Level",
              label: "Shop Stock Level",
              trigger: "View-Stock-Level-answer",
            },
            {
              value: "view-low-orders",
              label: "Viewing Low Orders",
              trigger: "view-low-orders-answer",
            },
            {
              value: "view-branch-detail",
              label: "Viewing Branch Details",
              trigger: "view-branch-detail-answer",
            },
            { value: "exit", label: "Exit Chat", trigger: "exit" },
          ],
        },
        {
          id: "get-started-answer",
          message:
            "Get Start to Analyze Stock And Set The Weekly Order List.Check Which Items are Low so Stock can be Filled...",
          trigger: "main-questions",
        },
        {
          id: "contact-stock-menager-answer",
          component: <EmailLink />,
          trigger: "main-questions",
        },
    
        {
          id: "View-Stock-Level-answer",
          component: <NavigateAnalyse />,
          end: true,
        },
        {
          id: "view-low-orders-answer",
          component: <LowStockItemsList />,
          trigger: "main-questions",
        },
        {
          id: "view-branch-detail-answer",
          component: <BranchDetailList />,
          trigger: "main-questions",
        },
        {
          id: "exit",
          component: <ExitMessage />,
          end: true,
        },
      ];

  return (
    <div>ChatBox</div>
  )
}



export default ChatBox