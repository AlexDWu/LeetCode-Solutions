// find a gene sequence in a genome in linear time
// aka find a substring in a string in linear time
// uses a state machine

var geneMatch = function(genome, sequence){
    if(sequence === ''){
        return true;
    }
    // make state graph
    var states =[];
    var state = 0;
    var shadowState = 0;
    for(var i = 0; i < sequence.length; i++){
        states[state] = Object.assign({},states[shadowState]);
        shadowState = states[shadowState][sequence[i]] || 0;
        states[state][sequence[i]] = ++state;
    }
    var currentState=0
    for(var i = 0; i < genome.length; i++){
        currentState = states[currentState][genome[i]] || 0;
        if (currentState === sequence.length){
            return true;
        }
    }
    return false;
}

console.assert(geneMatch('TCAT', 'CAT') === true, 'expect TCAT to match CAT') // expect true
console.assert(geneMatch('TCAT', 'TA') === false, 'expect TCAT to not match TA') // expect false
console.assert(geneMatch('TCACAT', 'CAT') === true,'expect TCACAT to match CAT') // expect true
console.assert(geneMatch('TATAG', 'TAG') === true, 'expect TATAG to match TAG') // expect true
console.assert(geneMatch('TATATATAG', 'TATAG') === true, 'expect TATATATAG to match TATAG') // expect true
console.assert(geneMatch('TATATATATAT', 'TATAG') === false, 'expect TATATATATAT to not match TATAG') // expect false
console.assert(geneMatch('T', 'TA') === false,'expect T to not match TA')
console.assert(geneMatch('TA', '') === true, 'expect TA to match empty string');
console.assert(geneMatch('TATAGTATAGTATAGC', 'TATAGTATAGC') === true, 'expect TATAGTATAGTATAGC to match TATAGTATAGC')
console.assert(geneMatch('TATAGTATAGTATAGT', 'TATAGTATAGC') === false, 'expect TATAGTATAGTATAGT to not match TATAGTATAGC')
