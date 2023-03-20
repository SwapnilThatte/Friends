const threshold = 0.9;

export const predictions = async (text) => {
    const ans = toxicity.load(threshold).then((model) => {
        const sentences = [text];

        const res = model.classify(sentences).then((predictions) => {
            return predictions;
        });
        return res
    });
    return ans
}





