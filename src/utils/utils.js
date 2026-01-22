function verification(term, res, errorMessage) {
    if (!term) {
        return res.status(400).json({ error: errorMessage })
    }
}

module.exports = verification 