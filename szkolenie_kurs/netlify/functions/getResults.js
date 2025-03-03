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

exports.handler = async () => {
    try {
        await connectDB();
        // Pobieranie wyników z posortowaniem po score
        const results = await Result.find().sort({ score: -1 });

        return {
            statusCode: 200,
            body: JSON.stringify(results), // Zwracanie wyników, które zawierają timestamp
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
