// Middleware for input validation

// Validate drug input data
const validateDrugInput = (req, res, next) => {
    const { name, dosage, card, pack, perDay } = req.body;
    const errors = [];

    // Validate name - must be more than 5 characters
    if (!name || name.length <= 5) {
        errors.push('Name must be more than 5 characters');
    }

    // Validate dosage - format: XX-morning,XX-afternoon,XX-night (X is digit)
    const dosagePattern = /^\d+-morning,\d+-afternoon,\d+-night$/;
    if (!dosage || !dosagePattern.test(dosage)) {
        errors.push('Dosage must follow format: XX-morning,XX-afternoon,XX-night (where X is digit)');
    }

    // Validate card - must be more than 1000
    if (!card || isNaN(card) || parseInt(card) <= 1000) {
        errors.push('Card must be more than 1000');
    }

    // Validate pack - must be more than 0
    if (!pack || isNaN(pack) || parseInt(pack) <= 0) {
        errors.push('Pack must be more than 0');
    }

    // Validate perDay - must be more than 0 and less than 90
    if (!perDay || isNaN(perDay) || parseInt(perDay) <= 0 || parseInt(perDay) >= 90) {
        errors.push('PerDay must be more than 0 and less than 90');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    next();
};

module.exports = {
    validateDrugInput
};
