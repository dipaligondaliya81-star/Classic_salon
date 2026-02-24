import { useState } from "react";

export default function Booking() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("Bridal Signature Ritual");
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("10:00 AM - 12:00 PM");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !phone || !date) {
            alert("Please fill Name, Phone and Date.");
            return;
        }

        const message =
            `🌸 *NEW BOOKING — CLASSIC SALON* 🌸\n\n` +
            `👤 Name: ${name}\n` +
            `📞 Phone: ${phone}\n` +
            `📅 Date: ${date}\n` +
            `🕐 Time: ${timeSlot}\n` +
            `💄 Service: ${service}\n\n` +
            `Please confirm the appointment.`;

        const whatsappURL =
            `https://wa.me/919737671768?text=${encodeURIComponent(message)}`;

        window.location.href = whatsappURL;
    };

    return (
        <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>
            <h2>Book Appointment</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Enter Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <input
                    type="tel"
                    placeholder="Enter Phone *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                >
                    <option>10:00 AM - 12:00 PM</option>
                    <option>12:00 PM - 02:00 PM</option>
                    <option>02:00 PM - 04:00 PM</option>
                    <option>04:00 PM - 06:00 PM</option>
                    <option>06:00 PM - 08:30 PM</option>
                </select>

                <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
                >
                    <option>Bridal Signature Ritual</option>
                    <option>Keratin Precision Therapy</option>
                    <option>Hair Spa & Couture Cut</option>
                    <option>Luxury Nail Artistry</option>
                </select>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    REQUEST RESERVATION
                </button>

            </form>
        </div>
    );
}