const mongoose = require('mongoose');

const connectDB = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGOOSE);
    }
};

const Result = mongoose.model('Result', {
    nickname: String,
    score: Number,
});

exports.handler = async () => {
    try {
        await connectDB();
        const results = await Result.find().sort({ score: -1 });
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};