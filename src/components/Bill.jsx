import "./Bill.css";
import logo from "/images/logo.JPG";

export default function Bill() {
  const bill = JSON.parse(localStorage.getItem("bill"));

  if (!bill) {
    return (
      <div className="bill-empty">
        <h2>No Transaction Record Found</h2>
        <p>Please complete a purchase in our boutique first.</p>
      </div>
    );
  }

  const invoiceNumber = bill.invoiceNo || `BL-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="bill-page-wrapper">
      <div className="invoice-container" id="print-area">

        {/* ===== INVOICE HEADER ===== */}
        <div className="invoice-header">
          <div className="header-left">
            <h1 className="brand-invoice-title">Classic <span>Salon</span></h1>
            <p className="brand-tagline">PREMIUM LADIES SALON & BOUTIQUE</p>
          </div>
          <div className="header-right">
            <img src={logo} alt="Classic Salon" className="invoice-logo" />
          </div>
        </div>

        <div className="invoice-meta">
          <div className="meta-column">
            <h3>SERVICE LOCATION</h3>
            <p>Golden Plaza, Shop No.01</p>
            <p>Nr. Netri Pani Puri, 150 ft Ring Road</p>
            <p>Indira Circle, Rajkot, Gujarat</p>
            <p><b>Contact:</b> +91 97376 71768</p>
          </div>
          <div className="meta-column text-right">
            <h2>INVOICE</h2>
            <p><b>Number:</b> {invoiceNumber}</p>
            <p><b>Date:</b> {bill.date || new Date().toLocaleString()}</p>
            <p><b>Payment:</b> {bill.paymentMethod || "Cash"}</p>
          </div>
        </div>

        <div className="customer-info-bar">
          <h3>BILLED TO</h3>
          <p className="cust-name">{bill.customer.name}</p>
          <p className="cust-phone">Mobile: {bill.customer.phone}</p>
        </div>

        {/* ===== ITEM TABLE ===== */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th>DESCRIPTION</th>
              <th>QTY</th>
              <th>UNIT PRICE</th>
              <th className="text-right">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {bill.items.map((item, idx) => {
              const price = Number(item.price) || 0;
              const discount = Number(item.discount) || 0;
              const finalUnitPrice = discount > 0 ? price - (price * discount / 100) : price;

              return (
                <tr key={idx}>
                  <td>
                    <span className="item-main-name">{item.name}</span>
                    <br />
                    <span className="item-sub-cat">{item.category || "Professional Series"}</span>
                  </td>
                  <td>{item.qty}</td>
                  <td>₹ {finalUnitPrice.toFixed(2)}</td>
                  <td className="text-right">₹ {(finalUnitPrice * item.qty).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* ===== CALCULATION BOX ===== */}
        <div className="invoice-summary">
          <div className="summary-left">
            <h4>Transaction Notes</h4>
            <p>Thank you for choosing Classic Salon. We appreciate your business and look forward to serving you again.</p>
            <div className="signature-box">
              <div className="sig-line"></div>
              <p>Authorized Signature</p>
            </div>
          </div>
          <div className="summary-right">
            <div className="summary-row total-row">
              <span>Grand Total</span>
              <span>₹ {Number(bill.total).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* ===== PRODUCT CARE GUIDE (NEW SECTION) ===== */}
        <div className="product-guides-section">
          <h3 className="guide-title">PROFESSIONAL CARE & USAGE GUIDE</h3>
          <div className="guide-grid">
            {bill.items.map((item, idx) => (
              <div className="guide-card" key={idx}>
                <img src={item.img ? (item.img.startsWith('http') || item.img.startsWith('/') ? item.img : `http://localhost:5000/uploads/${item.img}`) : ""} alt="" />
                <div className="guide-content">
                  <h4>{item.name}</h4>
                  <p className="guide-tip"><b>Expert Advice:</b> For best results, use sparingly. This professional-grade {item.category || "treatment"} works best on damp hair to lock in moisture and provide long-lasting shine.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="invoice-footer">
          <p>TERMS: Goods once sold will not be taken back. This is a computer generated invoice and does not require a physical signature.</p>
          <p>© 2024 Classic Premium Ladies Salon. All Rights Reserved.</p>
        </div>

      </div>

      <div className="invoice-actions no-print">
        <button className="back-btn" onClick={() => window.history.back()}>
          Back to Shop
        </button>
        <button className="print-trigger-btn" onClick={() => window.print()}>
          Print Professional Invoice
        </button>
      </div>
    </div>
  );
}
