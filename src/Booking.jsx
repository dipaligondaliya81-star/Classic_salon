import { useState } from "react";

export default function Booking() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { name, phone, service };

        try {
            const response = await fetch(
                "https://classic-salon.vercel.app/api/booking", // ✅ Full URL
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Booking Successful ✅");
                setName("");
                setPhone("");
                setService("");
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Portal Sync Error. Please check internet.");
        }
    };

    return (
        <div style={{ padding: "40px" }}>
            <h2>Book Appointment</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br /><br />

                <input
                    type="tel"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                /><br /><br />

                <input
                    type="text"
                    placeholder="Service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                /><br /><br />

                <button type="submit">REQUEST RESERVATION</button>
            </form>
        </div>
    );
}