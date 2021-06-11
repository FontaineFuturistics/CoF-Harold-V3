module.exports = {

    // This is the first word that harold looks for to decide
    // whether a particular message warrents this response.
    // This trigger word should be the least common word of
    // all of the trigger words
    initTrig: "yes",

    // This is the array representing all other trigger words
    // Harold will first check if a message has the first trigger
    // word before then checking that it has all other trigger words
    // Only has one other trigger word besides the first trigger, set
    // This to be a single String value instead of an array
    // If this response is triggered by a single word, set the single
    // String value to be the same as the first trigger word
    trigs: ["yes"],

    // This is the chance that harold responds to the set of words for this response
    // This is represented as a 1 in x chance, where x is the number below.
    // If you want a response to trigger all the time, set this to 1,
    // If it should trigger 50% of the time, set it to 2, etc.
    chance: 5,

    // This is an array representing all response message for a particular response.
    // This does need to be an array, even if there is only one response it must be formatted
    // as an array, just with a singular value.
    responses: require('../resources/AgreeDisagree.json'),

}