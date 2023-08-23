const nacl = require('tweetnacl');

const INTERACTION_TYPE = {
    PING: 1,
    APPLICATION_COMMAND: 2,
    MESSAGE_COMPONENT: 3,
    APPLICATION_COMMAND_AUTOCOMPLETE: 4,
    MODAL_SUBMIT: 5,
};

const PUBLIC_KEY = '7f628716270978d40532d2866b650a5c2e038f4a6fe326be5740877ec2e67c1c';

async function interactionHandler(event) {
    const signature = event.headers['x-signature-ed25519'];
    const timestamp = event.headers['x-signature-timestamp'];
    const body = event.body;

    const isVerified = nacl.sign.detached.verify(
        Buffer.from(timestamp + body),
        Buffer.from(signature, 'hex'),
        Buffer.from(PUBLIC_KEY, 'hex')
    );

    if (!isVerified) {
        return res.status(401).end('invalid request signature');
    }

    const {
        id,
        application_id,
        type,
        data,
        guild_id,
        channel,
        channel_id,
        member,
        user,
        token,
        version,
        message,
        app_permissions,
        locale,
        guild_locale,
    } = JSON.parse(body);

    let result = {};
    switch (type) {
        case INTERACTION_TYPE.PING:
            result = { type: 1 }
            break;
        case INTERACTION_TYPE.APPLICATION_COMMAND:
            break;
        case INTERACTION_TYPE.MESSAGE_COMPONENT:
            break;
        case INTERACTION_TYPE.APPLICATION_COMMAND_AUTOCOMPLETE:
            break;
        case INTERACTION_TYPE.MODAL_SUBMIT:
            break;
    }

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    };
}

module.exports = { interactionHandler };