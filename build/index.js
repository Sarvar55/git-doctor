import { translateCommit } from './utils/translate-commit.js';
async function de() {
    const commit = await translateCommit('yeni bir dosya eklendi');
    console.log(commit);
}
function greet(de) {
    console.log(de);
    console.log();
}
greet('d');
de();
