const mongoose = require('mongoose');

const connectDB = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGOOSE);
    }
};

// Model wyniku z dodanym polem timestamp
const Result = mongoose.model('Result', {
    nickname: String,
    score: Number,
    timestamp: { type: Number, required: true }, // Pole timestamp
});

exports.handler = async (event) => {
    try {
        await connectDB();
        const { nickname, score, timestamp } = JSON.parse(event.body); // Odbieramy timestamp
        const newResult = new Result({ nickname, score, timestamp }); // Zapisujemy wynik z timestampem
        await newResult.save();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Wynik zapisany!' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
