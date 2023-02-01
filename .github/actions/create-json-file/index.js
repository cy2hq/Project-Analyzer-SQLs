const core = require('@actions/core');
const glob = require('@actions/glob');
const { readFile } = require('fs/promises')

const create = async () => {
    try {
        const version = core.getInput('json-version');
        core.debug("Version: " + version);
        const patterns = ['**/*.json', '!**/node_modules/*', '!**/*.git*']
        const globber = await glob.create(patterns.join('\n'));
        const files = await globber.glob();

        const json = {
            meta: {
                version
            }, data: []
        }
        for (let i = 0; i < files.length; i++) {
            core.debug(`processing file: ${files[i]}`);
            const content = await readFile(files[i], 'utf8');
            json.data.push(JSON.parse(content));
        }
        core.setOutput("data", JSON.stringify(json, null, 2));
    } catch (error) {
        core.setFailed(error.message);
    }
}

create();
