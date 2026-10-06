const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Users ka mock database (Aap ise MongoDB se connect kar sakte hain)
const usersDB = {
    "216991": { depositBalance: 500, isRefRegistered: true } // Minimum ₹300 verified user
};

// API Route: Check User Lock Status (Min ₹300 Rule)
app.post('/api/verify-access', (req, res) => {
    const { gameUid } = req.body;
    const user = usersDB[gameUid];

    if (!user || !user.isRefRegistered) {
        return res.json({
            unlocked: false,
            message: "Aap hamare referral link se registered nahi hain!",
            refLink: "https://bdgwin23.com/#/register?invitationCode=4821314825537"
        });
    }

    if (user.depositBalance < 300) {
        return res.json({
            unlocked: false,
            message: "BALANCE LOW (MIN ₹300 REQUIRED)",
            refLink: "https://bdgwin23.com/#/register?invitationCode=4821314825537"
        });
    }

    return res.json({
        unlocked: true,
        balance: user.depositBalance,
        status: "ACTIVE"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
