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

exports.handler = async (event) => {
    try {
        await connectDB();
        const { nickname, score } = JSON.parse(event.body);
        const newResult = new Result({ nickname, score });
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