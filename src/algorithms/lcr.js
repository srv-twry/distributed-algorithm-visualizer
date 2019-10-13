/**
 * Runs the LCR algorithm to find the leader among the given nodes.
 * @param nodes the nodes with their uids. 
 */
function lcr(nodes) {
    let len = nodes.length, results = [], selectedLeader, uidValues = [];
    for (let index = 0; index < len; index++) {
        uidValues.push(nodes[index].uid);        
    }
    results.push(uidValues);

    let currentValues = uidValues;
    for (let cnt = 1; cnt < len; cnt++) {
        let resultValues = [], nextValues = [];
        for(let idx = 0; idx < len; idx++) {
            let prev = idx - 1;
            if (prev < 0) {
                prev = len - 1;
            }
            nextValues.push(Math.max(currentValues[idx], currentValues[prev]));
            if(nextValues[idx] > currentValues[idx]) {
                resultValues.push(nextValues[idx]);
            } else {
                resultValues.push(-1);
            }
        }
        currentValues = nextValues;
        results.push(resultValues);
    }

    // the element with maximum uid is the leader.
    let maxuid = uidValues[0]; selectedLeader = 0;
    for(let idx = 1; idx < len; idx++) {
        if(uidValues[idx] > maxuid) {
            maxuid = uidValues[idx];
            selectedLeader = idx;
        }
    }

    return {
        path: results,
        leader: selectedLeader
    }
}

export default lcr;