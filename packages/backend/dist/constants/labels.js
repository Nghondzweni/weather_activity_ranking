"use strict";
/**
 * Score bands and label strings for activity rankings.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCORE_POOR_MIN = exports.SCORE_FAIR_MIN = exports.SCORE_GOOD_MIN = exports.SCORE_EXCELLENT_MIN = exports.LABEL_VERY_POOR = exports.LABEL_POOR = exports.LABEL_FAIR = exports.LABEL_GOOD = exports.LABEL_EXCELLENT = void 0;
exports.getLabelForScore = getLabelForScore;
exports.LABEL_EXCELLENT = 'Excellent';
exports.LABEL_GOOD = 'Good';
exports.LABEL_FAIR = 'Fair';
exports.LABEL_POOR = 'Poor';
exports.LABEL_VERY_POOR = 'Very Poor';
exports.SCORE_EXCELLENT_MIN = 90;
exports.SCORE_GOOD_MIN = 70;
exports.SCORE_FAIR_MIN = 50;
exports.SCORE_POOR_MIN = 30;
// 0-29 = Very Poor
function getLabelForScore(score) {
    if (score >= exports.SCORE_EXCELLENT_MIN)
        return exports.LABEL_EXCELLENT;
    if (score >= exports.SCORE_GOOD_MIN)
        return exports.LABEL_GOOD;
    if (score >= exports.SCORE_FAIR_MIN)
        return exports.LABEL_FAIR;
    if (score >= exports.SCORE_POOR_MIN)
        return exports.LABEL_POOR;
    return exports.LABEL_VERY_POOR;
}
