const core = require('@actions/core');
const { writeFile } = require('fs/promises')

const write = async () => {
    try {
        writeFile('sqls.json', core.getInput('data'));
    } catch (error) {
        core.setFailed(error);
        core.setFailed(error.message);
    }
}

write();